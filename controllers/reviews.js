const Post = require('../models/post')
const Review = require('../models/review')

module.exports = {
  
    async reviewCreate(req,res,next){
      
      // find the post by id 
      console.log('llegue aqui? ');
      const post = await Post.findById(req.params.id);

      // create the review
      req.body.review.author = req.user._id;
      const review = await Review.create(req.body.review) 
      // assign review to post 
  
      post.reviews.push(review);

      
      post.save()
      
      req.session.success = 'Review  create successfully';
      res.redirect(`/posts/${post._id}`)
      },
    async reviewUpdate(req,res,next){

      await Review.findByIdAndUpdate(req.params.review_id,req.body.review)
      req.session.success = 'review updated'
      res.redirect(`/posts/${req.params.id}`)
        
    },

    
  
     
     async reviewDestroy(req,res,next){
         
     }
}