const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
const util = require('util')

const { cloudinary } = require('../cloudinary');
const { deleteProfileImage } = require('../midddleware');

module.exports = {
  // GET / 
    async landingPage(req,res,next){
      const posts = await Post.find({})
     
      res.render('index',{posts, title: 'Surf shop - Home',mapBoxToken: process.env.MAPBOX_TOKEN})
    },
    // get register 
    getRegister(req,res,next){
      res.render('register', {title: 'Register',username: '', email: ''});
    },
    async postRegister(req,res,next) {

       try{
         if(req.file){
           const  { path, filename } = req.file;
           req.body.image = {
             secure_url: path,
             public_id: filename
           }
         }
        const user = await User.register(new User(req.body), req.body.password);
        req.login(user,function(err){
          if(err){
            return next(err);
          } 
            req.session.success = 'Welcome to surf shop, '+user.username;
           // req.user = user;
            res.redirect('/')  
          
        }); 
       }catch(err){
         deleteProfileImage(req);
         const { username, email  } = req.body;
         let error = err.message;
         if(error.includes('duplicate') && error.includes('index: email_1 dup key')){
           error  = 'email already taken'
         }
         res.render('register', { title: 'Register', username, email, error })


       }

   
        
      
      

    },
    async postLogin(req,res, next){

      const {username, password }= req.body; 
      const {user, error} = await User.authenticate()(username, password)
      if(!user && error) return next(error);
      req.login(user, function(err){
        if (err) return next(err);
        req.session.success = 'welcome back '+username;
        const redirectUrl = req.session.redirectTo || '/';
        delete req.session.redirectTo;
        res.redirect(redirectUrl);
      })
    },
    getLogin(req,res,next){
      if(req.isAuthenticated()){
        return res.redirect('/')
      }
      if(req.query.returnTo) req.session.redirectTo = req.headers.referer; 
      
      res.render('login', {title: 'login'});
    },
    getLogout(req,res,next){
      //req.user = null
      req.logout()
      res.redirect('/')

    }, 
    async getProfile(req,res,next){
      const posts = await Post.find().where('author').equals(req.user._id).limit(10).exec();
      res.render('profile',{posts})
    },
    async updateProfile(req, res, next) {
      // destructure username and email from req.body
      const {
        username,
        email
      } = req.body;
      // destructure user object from res.locals
      const { user } = res.locals;
      // check if username or email need to be updated
      if (username) user.username = username;
      if (email) user.email = email;

      if(req.file) {
        if(user.image.public_id){
          await cloudinary.uploader.destroy(user.image.public_id);

        }
         const {path, filename }  = req.file;
        user.image = {secure_url: path, public_id: filename}
      }
      // save the updated user to the database
      await user.save();
      // promsify req.login
      const login = util.promisify(req.login.bind(req));
      // log the user back in with new info
      await login(user);
      // redirect to /profile with a success flash message
      req.session.success = 'Profile successfully updated!';
      res.redirect('/profile');
    }
}