const errHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode || 500;
    res.status(statusCode);
    res.json({
        message:err.message?err.message:"Internal Server Error"
    })
};

const notFound=(req,res,next)=>{
    const error=new Error('Page not found',req.originalUrl);
    res.status(404);
    next(error);
}

module.exports={
    errHandler,notFound
}