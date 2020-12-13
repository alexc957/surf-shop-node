const Post = require('../models/post')
const cloudinary = require('cloudinary')

const mbxGeocoding =require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAPBOX_TOKEN
})

cloudinary.config({
    cloud_name: 'djul6ji5g',
    api_key: '372186682862111',
    api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
    async postIndex(req,res,next){
        const posts = await Post.find({})

        res.render('posts/index', {posts, title:"Posts"})
    },
    postNew(req,res, next){
        
        res.render('posts/new', {title: "new Post"})
      },
      async postCreate(req,res,next){
          // use req.body to create a new post 
          req.body.post.images = []
          for (const file of req.files){
             let image =  await cloudinary.v2.uploader.upload(file.path)
             req.body.post.images.push({
                 url: image.secure_url,
                 public_id: image.public_id
             })   
            }

          const response = await geocodingClient.forwardGeocode({
                query: req.body.post.location,
                limit: 1,
          }).send()
          req.body.post.coordinates = response.body.features[0].geometry.coordinates
          
          const post = await Post.create(req.body.post)
          req.session.success = 'Post created successfully'
         
          
          res.redirect(`/posts/${post.id}`)
      },
      async postShow(req,res,next){
          const post = await Post.findById(req.params.id);
          console.log(post);
          res.render('posts/show', {post})
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
                // delete images from cloudnary 
                await cloudinary.v2.uploader.destroy(public_id)
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
           for(const file of req.files){
               let image = await cloudinary.v2.uploader.upload(file.path);
               post.images.push({
                   url: image.secure_url,
                   public_id: image.public_id
               })
           } 
        }
        // update the location 
        if(req.body.post.location!==post.location){
           const response = await geocodingClient.forwardGeocode({
                query: req.body.post.location,
                limit: 1,
          }).send()
          post.coordinates = response.body.features[0].geometry.coordinates
          post.location = req.body.post.location;
        }
      
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
 
        post.save()
        // eliminar una iage seleccionada 
        // subir nuevas images
        res.redirect('/posts/'+post.id)    
     },
     async postDestroy(req,res,next){
         const post = await Post.findById(req.params.id)
         for(const image of post.images){
             await cloudinary.v2.uploader.destroy(image.public_id);
         }
         post.remove()
         res.redirect('/posts');
     }
}