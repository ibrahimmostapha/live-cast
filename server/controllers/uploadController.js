const multer=require('multer')

const storage=multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "server/assets/Images")
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now()+"_"+file.originalname)
    }
})

module.exports = multer({storage:storage})