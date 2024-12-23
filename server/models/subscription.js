const mongoose=require('mongoose')

const SubscriptionSchema=mongoose.Schema({
    package:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    expireAt: {
        type: Date,
        required:true,
        expires: 10
    }
})

module.exports=SubscriptionSchema;