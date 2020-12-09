var express = require('express');
const { route } = require('.');
var router = express.Router();
const { errorHandler } =require('../midddleware');
const {
    getPosts, 
    newPost, 
    createPost
} = require('../controllers/posts')
// /posts/ 
router.get('/',errorHandler(getPosts))

router.get('/new', newPost)



router.post('/', errorHandler(createPost))

router.get('/:id',(req,res,next)=> {
    res.send('show /post/:id')
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