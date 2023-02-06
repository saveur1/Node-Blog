const jwt = require('jsonwebtoken');

module.exports =(req,res,next) => {
    try{
    let token = req.headers.token;
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.userData = decoded;
    next();
    }
    catch(error) {
        return res.status(401).json({
            message:"Authorization failed"
        });
    }
}