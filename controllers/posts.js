const Post = require('../models/post')

module.exports = {
    async postIndex(req,res,next){
        const posts = await Post.find({})
        console.log(posts);
        res.render('posts/index', {posts})
    },
    postNew(req,res, next){
        res.render('posts/new')
      },
      async postCreate(req,res,next){
          // use req.body to create a new post 
          const post = await Post.create(req.body)
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
     }
}