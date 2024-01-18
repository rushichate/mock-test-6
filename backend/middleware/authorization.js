const jwt = require("jsonwebtoken")

const verify = async (req,res,next) =>{
    const token = req.headers.authorization
    if(!token) return res.status(401).json("Please Login First")
    jwt.verify(token,"masai",function(err,decoded){
    if(decoded){
        req.body.user = decoded.userID
        next()
    }else{
        res.json("Please Login First")
    }
    })
}

module.exports ={
    verify
}