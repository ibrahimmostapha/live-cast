const jwt=require('jsonwebtoken')
const User=require('../models/user')
require('dotenv').config()

async function requireAuth(req,res,next){
    const auth=req.headers.authorization
    if(!auth){
        return res.status(401).json({error:"Authorization failed"})
    }

    const token=auth.split(' ')[1]

    try{
        const {_id}=jwt.verify(token, process.env.SECRET)
        req.user=await User.findOne({_id})
        next()
    } catch(error){
        console.log(error)
        res.status(401).json({error:"Authorization failed"})
    }
}

module.exports =requireAuth