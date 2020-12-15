const Review = require('../models/review')
module.exports ={
        AsyncErrorHandler: (fn)=> (req,res,next)=>{ //return a callback function 
            Promise.resolve(fn(req,res,next)) // return a promise , the fn is an asyn function 
                    .catch(next)   /// catch the error
        },
        isReviewAuthor: async (req,res,next) => {
                const review = await Review.findById(req.params.review_id);
                if(review.author.equals(req.user._id)){
                       return next()
                }
                req.session.error = "Bye Bye";
                return res.redired('/')
        }

    
}