const mongoose=require('mongoose')

const ChannelSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    logo:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('channel', ChannelSchema)