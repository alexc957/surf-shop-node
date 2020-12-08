var express = require('express');
const { route } = require('.');
var router = express.Router({
    mergeParams: true // access to the postiD 
});
// /reviews/ 
router.get('/',(req,res,next)=> {
    res.send('INDEX /posts/:id/reviews')

})



router.post('/', (req,res, next)=>{
    res.send('create /reviews')
  })



router.get('/:review_id',(req,res,next)=> {
    res.send('get /post/:id/reviews/:review_id')
})

router.get('/:review_id/edit',(req,res,next)=>{
    res.send('EDIT /reviews/:id/edit')
})

router.put('/:review_id',(req,res,next)=>{
    res.send('update /posts/:id/reviews/:review_id')

})


router.delete('/:reviews_id',(req,res,next)=>{
    res.send('delete /posts/:id/reviews/review_id')
})





module.exports = router