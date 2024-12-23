const mongoose=require('mongoose')

const broadcastSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    channel:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

module.exports=mongoose.model('broadcast',broadcastSchema)