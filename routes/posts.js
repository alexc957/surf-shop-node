var express = require('express');
const { route } = require('.');
var router = express.Router();
const { AsyncErrorHandler } =require('../midddleware');
const {
    postIndex, 
    postNew, 
    postCreate,
    postShow,
    postEdit,
    postUpdate
} = require('../controllers/posts')
// /posts/ 
router.get('/',AsyncErrorHandler(postIndex))

router.get('/new', postNew)



router.post('/', AsyncErrorHandler(postCreate))

router.get('/:id', AsyncErrorHandler(postShow))

router.get('/:id/edit',AsyncErrorHandler(postEdit))

router.put('/:id',AsyncErrorHandler(postUpdate))


router.delete('/:id',(req,res,next)=>{
    res.send('delete /posts/:id')
})





module.exports = router