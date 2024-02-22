const express = require("express")
const {connection} = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { eventRouter } = require("./routes/event.route")
const { authentication } = require("./middlewares/authentication")
const app = express()
app.use(express.json())

app.use("/",userRouter)
app.use(authentication)
app.use("/",eventRouter)

app.listen(4500,async()=>{
    try{
        await connection
        console.log("db connected")
    }
    catch(err){
        console.log(err)
    }
    console.log("server connected")
})