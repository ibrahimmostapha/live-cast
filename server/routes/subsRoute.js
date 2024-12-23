require('dotenv').config()
const express = require('express')
const router = express.Router()
const Package=require('../models/package')
const User=require('../models/user')
const Stripe=require('stripe').default
const stripe = new Stripe(process.env.STRIPE_KEY)
const mongoose=require('mongoose')
const Auth=require('../middleware/requireAuth')
const handleErrors=require('../controllers/handleErrorsController')

router.get('/income', Auth, async (req,res)=>{
    try{
        if(req.user.isAdmin){
            let subscribed=await User.find({ plan: { $ne: null } })
            let income=0
            subscribed.forEach((item)=>{
                income +=item.plan.cost
            })
            res.json({totalIncome:income/100})
        } else{
            res.status(301).json({message:"You must be an admin to access this endpoint"})
        }
    } catch(errors){
        let error = handleErrors(errors)
        res.status(401).json(error)
    }
})

router.get('/subscribe/:packageId', Auth, async (req, res)=>{
    try{
        let packageDetails=await Package.findOne({_id:mongoose.Types.ObjectId(req.params.packageId)})
        console.log(req.user._id)
        let session=await stripe.checkout.sessions.create({
            metadata:{
                userId:req.user._id.toHexString(),
                packageId:packageDetails._id.toHexString(),
                cost:packageDetails.cost,
                duration:packageDetails.duration
            },
            payment_method_types:['card'],
            mode:'payment',
            line_items:[{
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:packageDetails.name
                    },
                    unit_amount:packageDetails.cost,
                },
                quantity:1,
            }],
            success_url:"http://localhost:5173/subscribe",
            cancel_url:"http://localhost:5173/subscribe"
        })
        res.status(200).json(session.url)
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

router.post('/webhook', async (req,res)=>{
    try{
        let data=req.body.data.object.metadata
        let result=await User.findOneAndUpdate({_id:data.userId},{
                plan: { 
                    package:data.packageId, 
                    cost:data.cost,
                    expireAt:new Date(new Date().getTime()+parseInt(data.duration))
                } 
            })
        res.status(200).json(result)
    } catch (error){
        console.log(error)
        res.status(400).end()
        return;
    }
})

module.exports=router