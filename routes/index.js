var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf shop - Home' });
});


router.get('/register',(req,res,next)=>{
  res.send('GET /REGISTER')
})

router.post('/register',(req,res,next)=>{
  res.send('post /REGISTER')
})

router.get('/login',(req,res,next)=>{
  res.send('get /login')
})

router.post('/login',(req,res,next)=> {
  res.send('post /login')
})


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

module.exports = router;
