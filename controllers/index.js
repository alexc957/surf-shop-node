const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');


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
      res.render('login', {title: 'login'});
    },
    getLogout(req,res,next){
      //req.user = null
      req.logout()
      res.redirect('/')

    }
}