const express=require("express")
const { connection } = require("./db")
require("dotenv").config()
const cors=require("cors")
const { userRouter } = require("./routes/user.routes")
const { postsRouter } = require("./routes/post.routes")
const { auth } = require("./middlewares/auth.middleware")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postsRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (err) {
        console.log(err)
    }
    console.log(`server is running at port ${process.env.port}`)
})