const jwt = require("jsonwebtoken")

const authentication = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const payload = jwt.verify(token,"secret")
        req.body.userid=payload.userid
        next()
    }
    else{
        res.send({
            "msg":"error occured login again"
        })
    }
}


module.exports = {
    authentication
}