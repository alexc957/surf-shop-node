var express = require('express');
var router = express.Router();
const multer = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage})
const { 
  postRegister, 
  postLogin,
  getLogout, 
  landingPage,
  getRegister,
  getLogin,
  getProfile,
  updateProfile } = require('../controllers'); 
const {
  AsyncErrorHandler, 
  isLoggedIn,
  isValidPassword,
  changePassword} = require('../midddleware');


/* GET home page. */
router.get('/',AsyncErrorHandler(landingPage));


router.get('/register',getRegister)

router.post('/register',upload.single('image') ,AsyncErrorHandler(postRegister))


router.get('/login',getLogin)

router.post('/login',postLogin)


router.get('/profile', isLoggedIn, AsyncErrorHandler(getProfile))



router.put('/profile/',
            isLoggedIn,
            upload.single('image'),
            AsyncErrorHandler(isValidPassword),
            AsyncErrorHandler(changePassword),
            AsyncErrorHandler(updateProfile))

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
