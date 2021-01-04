var express = require('express');

var router = express.Router();
const multer = require('multer');

const { cloudinary, storage } = require('../cloudinary')
const upload = multer({ storage })
 // uploads dir is temp 
const { AsyncErrorHandler, isLoggedIn } =require('../midddleware');

const {
    postIndex, 
    postNew, 
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDestroy
} = require('../controllers/posts')
// /posts/ 
router.get('/',AsyncErrorHandler(postIndex))

router.get('/new', isLoggedIn,postNew)



router.post('/', isLoggedIn,upload.array('images',4),AsyncErrorHandler(postCreate)) //   


router.get('/:id', AsyncErrorHandler(postShow))



router.get('/:id/edit',AsyncErrorHandler(postEdit))

router.put('/:id',upload.array('images',4),AsyncErrorHandler(postUpdate))


router.delete('/:id',AsyncErrorHandler(postDestroy))





module.exports = router