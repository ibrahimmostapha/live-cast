const router=require("express").Router()
const mongoose=require("mongoose")
const upload=require('../controllers/uploadController')
const Broadcast=require('../models/broadcast')
const Auth=require('../middleware/requireAuth')
const user = require("../models/user")
const handleErrors=require('../controllers/handleErrorsController')

// get all broadcasts
router.get('/all',Auth,async (req, res)=>{
    try{
        let broadcasts=await Broadcast.find()
        res.status(200).json(broadcasts)
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

// get one broadcast
router.get('/single/:broadcastId',Auth,async (req,res)=>{
    try{
        if(req.user && req.user.plan){
            let broadcast=await Broadcast.findOne({path:req.params.broadcastId})
            res.status(200).json(broadcast)
        } else{
            res.status(203).json({message:"You need to be subscribed!!"})
        }
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

router.get('/channel/:channelId',Auth,async (req,res)=>{
    try{
        let broadcasts=await Broadcast.find({channel:req.params.channelId})
        res.status(200).json(broadcasts)
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

// add new broadcast
router.post('/new',Auth, async (req,res)=>{
    console.log(req.body);
    const newBroadcast=new Broadcast({
        title:req.body.title,
        category:req.body.category,
        path:req.body.path,
        channel: req.body.channel
    })
    
    try{
        let create=await Broadcast.create(newBroadcast)
        res.status(200).json(create)
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

// edit broadcast
router.patch('/edit/:broadcastId',Auth, async (req,res)=>{
    let broadcast={}

    if(req.body.title){
        broadcast['title']=req.body.title
    }
    if(req.body.category){
        broadcast['category']=req.body.category
    }
    try{
        const oldBroadcast=await Broadcast.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.broadcastId)},broadcast)
        res.status(200)
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

// search for broadcast
router.get('/search', async (req, res)=>{
    let match=new RegExp(req.query.value, 'i')

    const page=req.query.page || 0
    const broadcastsPerPage=12
    
    try{
        let results=await Broadcast.aggregate([{$match:{$or:[{title:match},{category:match}]}}]).skip(page*broadcastsPerPage).limit(broadcastsPerPage)
        res.status(200).json(results)
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

// delete broadcast
router.delete('/delete/:broadcastId', Auth,async (req,res)=>{
    if(!req.user.isAdmin){
        return res.status(404).json({ message: 'You are not an admin!' })
    }
    try{
        let result=await Broadcast.findOneAndDelete({_id:mongoose.Types.ObjectId(req.params.broadcastId)})
        if (!result) {
            return res.status(404).json({ message: 'Broadcast not found' })
        }
        res.status(200).json({ message: 'Broadcast deleted successfully' })
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
})

// api search
router.get('/searchBroadcast', async (req, res) => {
    const { q } = req.query;
    try {
        let broadcasts=await Broadcast.find()
        res.json(search(broadcasts, q).slice(0, 20));
    } catch (error) {
        const errors = handleErrors(error);
        res.status(401).json({ errors });
    }
});

const keys = ["title", "category", "path"];

const search = (data, q) => {
    return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
    );
};

module.exports=router;