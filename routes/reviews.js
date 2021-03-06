const express = require('express');
const router = express.Router({
    mergeParams: true // access to the postiD 
});

const { AsyncErrorHandler, isReviewAuthor } =  require('../midddleware/index');
const {
    reviewCreate,
    reviewUpdate,
    reviewDestroy
}  = require('../controllers/reviews')

// /reviews/ 




router.post('/', AsyncErrorHandler(reviewCreate))




router.put('/:review_id',isReviewAuthor,AsyncErrorHandler(reviewUpdate));


router.delete('/:review_id',isReviewAuthor,AsyncErrorHandler(reviewDestroy))





module.exports = router