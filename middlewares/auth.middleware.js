const jwt=require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        const decoded=jwt.verify(token,"saurabh")
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.status(400).send({"msg":"Login Required"})
        }
    }else{
        res.status(400).send({"msg":"Login Required"})
    }
}

module.exports={auth}