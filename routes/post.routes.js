const express=require("express")
const postsRouter=express.Router()
const {PostModel}=require("../models/posts.model")

postsRouter.post("/add",async (req,res)=>{
    const payload=req.body
    try {
        const post= new PostModel(payload)
        await post.save()
        res.status(200).send({"msg":"A new post is added "})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postsRouter.get("/",async (req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"saurabh")
    try {
        if(decoded){
            const posts= await PostModel.find({"userID":decoded.userID})
            res.status(200).send(posts)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

postsRouter.patch("/update/:postID",async (req,res)=>{
    const payload=req.body
    const postID=req.params.postID
    try {
        await PostModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).send({"msg":"A new post is updated "})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postsRouter.delete("/delete/:postID",async (req,res)=>{
    const postID=req.params.postID
    try {
        await PostModel.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"A new post is deleted "})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={postsRouter}