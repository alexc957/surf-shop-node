const Review = require('../models/review')
const User = require('../models/user')
const Post = require('../models/post')

const {cloudinary}  = require('../cloudinary')
const middleware ={
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
        },
        isAuthor: async (req,res,next) => {
                const post = await Post.findById(req.params.id);
                if(post.author.equals(req.user.id)){
                        res.locals.post = post;
                        return next();
                }
                req.session.error ='Access denied';
                res.redirect('back')
        },
        isValidPassword: async (req, res, next) => {
		const { user } = await User.authenticate()(req.user.username, req.body.currentPassword)
		if(user) { 
			// add user to res.locals
			res.locals.user = user;
			// go to next middleware
			next();
		} else {
			middleware.deleteProfileImage(req)
			// flash an error
			req.session.error = 'Incorrect Current Password!';
			// short circuit the route middleware and redirect to /profile
			return res.redirect('/profile');
		}
        },changePassword: async (req, res, next) => {
		// destructure new password values from req.body object
		const { 
			newPassword,
			passwordConfirmation
		} = req.body;
		if(newPassword && !passwordConfirmation) {
			middleware.deleteProfileImage(req);
			req.session.error = 'Missing password confirmation!'
			return res.redirect('/profile')
		}

		// check if new password values exist
		else if (newPassword && passwordConfirmation) {
			// destructure user from res.locals
			const { user } = res.locals;
				// check if new passwords match
				if (newPassword === passwordConfirmation) {
					// set new password on user object
					await user.setPassword(newPassword);
					// go to next middleware
					next();
				} else {
					// flash error
					req.session.error = 'New passwords must match!';
					// short circuit the route middleware and redirect to /profile
					return res.redirect('/profile');
				}
		} else {
			// go to next middleware
			next();
		}
	},
	 deleteProfileImage: async (req) => {
		 if(req.file){
			 await cloudinary.uploader.destroy(req.file.filename)
		 }
	 }
        

    
};

module.exports = middleware;