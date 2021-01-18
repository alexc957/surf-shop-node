var express = require('express');

var router = express.Router();
const multer = require('multer');

const { cloudinary, storage } = require('../cloudinary')
const upload = multer({ storage })
 // uploads dir is temp 
const { AsyncErrorHandler, 
        isLoggedIn, 
        isAuthor,
        searchAndFilterPosts } =require('../midddleware');

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
router.get('/',AsyncErrorHandler(searchAndFilterPosts),AsyncErrorHandler(postIndex))

router.get('/new', isLoggedIn,postNew)



router.post('/', isLoggedIn,upload.array('images',4),AsyncErrorHandler(postCreate)) //   


router.get('/:id', AsyncErrorHandler(postShow))



router.get('/:id/edit',isLoggedIn,AsyncErrorHandler(isAuthor) ,postEdit)

router.put('/:id',isLoggedIn,AsyncErrorHandler(isAuthor),upload.array('images',4),AsyncErrorHandler(postUpdate))


router.delete('/:id',isLoggedIn,AsyncErrorHandler(isAuthor),AsyncErrorHandler(postDestroy))





module.exports = router