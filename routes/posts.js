var express = require('express');
const { route } = require('.');
var router = express.Router();
// /posts/ 
router.get('/',(req,res,next)=> {
    res.send('/posts')

})

router.get('/new', (req,res, next)=>{
    res.send('/posts/new')
  })


router.post('/', (req,res, next)=>{
    res.send('create /posts')
  })

router.post('/', (req,res, next)=>{
    res.send('create /posts')
  })

router.get('/:id',(req,res,next)=> {
    res.send('get /post/:id')
})

router.get('/:id/edit',(req,res,next)=>{
    res.send('EDIT /posts/:id/edit')
})

router.put('/:id',(req,res,next)=>{
    res.send('update /post/:id')

})


router.delete('/:id',(req,res,next)=>{
    res.send('delete /posts/:id')
})





module.exports = router