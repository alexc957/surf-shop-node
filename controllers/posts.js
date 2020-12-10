const Post = require('../models/post')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'djul6ji5g',
    api_key: '372186682862111',
    api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
    async postIndex(req,res,next){
        const posts = await Post.find({})
      
        res.render('posts/index', {posts})
    },
    postNew(req,res, next){
        res.render('posts/new')
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
          const post = await Post.create(req.body.post)
          console.log(post);
          res.redirect(`/posts/${post.id}`)
      },
      async postShow(req,res,next){
          const post = await Post.findById(req.params.id);
          res.render('posts/show', {post})
      },
     async postEdit(req,res,next) {
         let post = await Post.findById(req.params.id)
         res.render('posts/edit', {post});
     },
     // post update 
     async postUpdate(req,res,next){
        console.log(req.body);
        console.log('id? ', req.params.id);
        const post = await Post.findByIdAndUpdate(req.params.id, req.body.post)
        
        res.redirect('/posts/'+post.id)    
     },
     async postDestroy(req,res,next){
         await Post.findByIdAndRemove(req.params.id)
         res.redirect('/posts');
     }
}