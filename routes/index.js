var express = require('express');
var router = express.Router();
const { 
  postRegister, 
  postLogin,
  getLogout, 
  landingPage,
  getRegister,
  getLogin  } = require('../controllers'); 
const {AsyncErrorHandler} = require('../midddleware');


/* GET home page. */
router.get('/',AsyncErrorHandler(landingPage));


router.get('/register',getRegister)

router.post('/register', AsyncErrorHandler(postRegister))


router.get('/login',getLogin)

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
