var express = require('express');
var router = express.Router();
const { postRegister, postLogin,getLogout, landingPage } = require('../controllers'); 
const {AsyncErrorHandler} = require('../midddleware');


/* GET home page. */
router.get('/',AsyncErrorHandler(landingPage));


router.get('/register',(req,res,next)=>{
  res.send('GET /REGISTER')
})

router.post('/register', AsyncErrorHandler(postRegister))


router.get('/login',(req,res,next)=>{
  res.send('get /login')
})

router.post('/login',postLogin)


router.get('/profile',(req,res,next)=>{
  res.send('get /profile')
})



router.put('/profile/:user_id',(req,res,next)=>{
  res.send('PUT /profile/:user_id')
})

router.get('/forgot-pw',(req,res,next)=>{
  res.send('get /forgot-pw')
})

router.put('/forgot-pw',(req,res,next)=>{
  res.send('put /forgot-pw')
})

router.put('/reset-pw/:token',(req,res,next)=>{
  res.send('get /rest-pw/token')
})

router.get('/logout', getLogout)

module.exports = router;
