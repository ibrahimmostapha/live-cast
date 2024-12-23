const mongoose = require('mongoose')

const PackageSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    cost:{
        type:Number,
        default:0
    },
    description:{
        type:String
    },
    background:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model('packages',PackageSchema)