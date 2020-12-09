module.exports ={
        AsyncErrorHandler: (fn)=> (req,res,next)=>{ //return a callback function 
            Promise.resolve(fn(req,res,next)) // return a promise , the fn is an asyn function 
                    .catch(next)   /// catch the error
        }

    
}