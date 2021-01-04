const Review = require('../models/review')
const User = require('../models/user')
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
        },
        /* checkIfUserExist: async (req,res,next)=> {
                const userExists = await User.findOne({'email': req.body.email});
                if(userExists){
                        req.session.error = 'email already taken'
                        return res.redirect('back')
                }
                next();
        }*/
        isLoggedIn: (req,res,next) => {
                if (req.isAuthenticated()) return next();
                req.session.error = 'You need to be logged in to do that'
                req.session.redirectTo = req.originalUrl;

                res.redirect('/login')
        }

    
}