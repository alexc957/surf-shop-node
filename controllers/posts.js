const Post = require('../models/post')
const { cloudinary } = require('../cloudinary');

const mbxGeocoding =require('@mapbox/mapbox-sdk/services/geocoding')

const mapBoxToken = process.env.MAPBOX_TOKEN;
const { reviewCreate } = require('./reviews')
const geocodingClient = mbxGeocoding({
    accessToken: mapBoxToken
})




module.exports = {
    async postIndex(req,res,next){
        const posts = await Post.paginate({}, {
            page: req.query.page || 1,
            limit: 10,
        })

        res.render('posts/index', {posts, title:"Posts", mapBoxToken })
    },
    postNew(req,res, next){
        
        res.render('posts/new', {title: "new Post"})
      },
      async postCreate(req,res,next){
          // use req.body to create a new post 
          req.body.post.images = []
          for (const file of req.files){
              console.log('file? ', file);
              console.log("public id ? ", file.public_id)
            req.body.post.images.push({
                url: file.path,
                public_id: file.filename
            }); 
            }

          const response = await geocodingClient.forwardGeocode({
                query: req.body.post.location,
                limit: 1,
          }).send()
          req.body.post.geometry = response.body.features[0].geometry;
          
          let post = new Post(req.body.post);
		  post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
		  await post.save();
          req.session.success = 'Post created successfully'
         
          
          res.redirect(`/posts/${post.id}`)
      },
      async postShow(req,res,next){
        const post = await Post.findById(req.params.id).populate({
			path: 'reviews',
            options: { sort: { '_id': -1 } },
            populate: {
                path: 'author',
                model: 'User'
            }
        });
        const floorRating = post.calculateAvgRating()
        
		res.render('posts/show', { post, currentUser: req.user, floorRating, mapBoxToken });
 
      },
     async postEdit(req,res,next) {
         let post = await Post.findById(req.params.id)
         res.render('posts/edit', {post, title: "edit post"});
     },
     // post update 
     async postUpdate(req,res,next){
        // fin the post by id 
        let post = await Post.findById(req.params.id)
        // check if there is any image for deletion 
        if(req.body.deleteImages && req.body.deleteImages.length){
            let deleteImages = req.body.deleteImages;
            // loop over the deleteImages 
            for(const public_id of deleteImages){
                console.log('public i?',public_id);
                // delete images from cloudnary 
                await cloudinary.uploader.destroy(public_id)
                // delete image from post.images
                 for(const image of post.images){
                     if(image.public_id === public_id){
                         let index = post.images.indexOf(image);
                         post.images.splice(index,1)
                     }
                 }

            }

        }// upload images 
        if(req.files){
           console.log('req images? ',req.body.post.images) 
           for(const file of req.files){
            post.images.push({
                url: file.path,
                public_id: file.filename
            });
           } 
        }
        // update the location 
        if(req.body.post.location!==post.location){
           const response = await geocodingClient.forwardGeocode({
                query: req.body.post.location,
                limit: 1,
          }).send()
          post.geometry= response.body.features[0].geometry
          post.location = req.body.post.location;
        }
      
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;

 
        post.save()
        // eliminar una iage seleccionada 
        // subir nuevas images
        res.redirect('/posts/'+post.id)    
     },
     async postDestroy(req,res,next){
         const post = await Post.findById(req.params.id)
         for(const image of post.images){
             await cloudinary.uploader.destroy(image.public_id);
         }
         post.remove()
         req.session.success = 'Post deleted successfully '
         res.redirect('/posts');
     }
}