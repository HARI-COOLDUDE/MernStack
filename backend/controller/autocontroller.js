const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')

const forget =(req,res)=>{
    res.send("FORGOT Password")
}
const reset =(req,res)=>{
    res.send("Reset")
}
const signup =async(req,res)=>{
    
    try{
        
        const {name,email,password}= req.body;
        const user =await UserModel.findOne({email});
        
        if(user){
            return res.status(409)
            .json({message: 'User already exist, you can login',success:false});
        }
        const userModel = new UserModel({ name , email , password})
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save()
        res.status(201)
        .json({
            message : "Signup Successfully",
            success : true
        })
    }
    catch (err) {
        res.status(500)
        .json({
            message:"Signup unsuccesfully",
            success : false
    })
    }
}
const login =async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        const user =await UserModel.findOne({email});

        if (!user){
            return res.status(404)
            .json({message: 'User does not exist, Pls signup',success:false});
        }
        const userModel = new UserModel({  email , password})
        const pass = await bcrypt.compare(password,user.password);
        console.log('psw',pass)
        if(pass == false)
            {
                return res.status(403)
                .json({message: 'Invalid credantitals',success:false});
            }
        const token =jwt.sign({email:email,name:user.name},process.env.JWT_KEY,{expireIn:'24h'})
        
        res.status(200)
        .json({
            message : "Login Successfully",
            success : true,
            name : user.name,
            email : user.email,
            token : token
        })
    }
    catch (err) {
        res.status(500)
        .json({
            message:"Login unsuccesfully",
            success : false
    })
    }
}

module.exports={
    signup,login,forget,reset
}