const mongoose=require('mongoose')
require('dotenv').config()

const env=process.env

module.exports=(app)=>{
    mongoose.set('strictQuery', false)
    mongoose.connect(env.DB_URI,()=>{
        console.log("connected to mongodb")
        app.listen(env.PORT,()=>{
            console.log('now listening on port '+env.PORT)
        })
    }).catch((error)=>{
        console.log("An error occured!",error)
    })
}