const express = require('express');
const router = express.Router({
    mergeParams: true // access to the postiD 
});

const { AsyncErrorHandler } =  require('../midddleware/index');
const {
    reviewCreate,
    reviewUpdate,
    reviewDestroy
}  = require('../controllers/reviews')

// /reviews/ 




router.post('/', AsyncErrorHandler(reviewCreate))




router.put('/:review_id',(req,res,next)=>{
    res.send('update /posts/:id/reviews/:review_id')

})


router.delete('/:reviews_id',(req,res,next)=>{
    res.send('delete /posts/:id/reviews/review_id')
})





module.exports = router