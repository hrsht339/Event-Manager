const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { userModel } = require("../models/user.model")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password} = req.body
    if(email && password){
        try{
            bcrypt.hash(password,3,async(err,hashed)=>{
                const user = new userModel({
                    email,
                    password:hashed
                })
                await user.save()
                res.send({
                    "msg":"registration successful",
                    user
                })
            })
        }
        catch(err){
            res.send({
                "msg":err
            })
        }
    }
    else{
        res.send({
            "msg":"email or password isnt entered properly"
        })
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    let user = await userModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token = jwt.sign({userid:user._id},"secret")
                res.send({
                    "msg":"login successful",
                    token
                })
            }
            else{
                res.send({
                    "msg":"password incorrect"
                })
            }
        })
    }
    else{
        res.send({
            "msg":"email incorrect or account doesnt exist"
        })
    }
})

module.exports = {
    userRouter
}