const router = require("express").Router()
const mongoose = require("mongoose");
const upload = require('../controllers/uploadController');
const Channel = require('../models/channel');
const Broadcast = require('../models/broadcast');
const Auth = require('../middleware/requireAuth')
const handleErrors=require('../controllers/handleErrorsController')
const fs=require('fs')

function test(){
    console.log("ok")
}

// get all channels
router.get('/all', Auth, async (req, res) => {
    try {
        let channels = await Channel.find()
        res.status(200).json(channels)
    } catch (error) {
        const errors = handleErrors(error)
        res.status(401).json({ errors })
    }
})

// get one channel
router.get('/single/:channelId', async (req, res) => {
    try {
        let channel = await Channel.findOne({ _id: req.params.channelId })
        res.status(200).json(channel)
    } catch (error) {
        // const errors= handleErrors(error)
        res.status(401).json({ error })
        // console.log(error)
    }
})

// upload channel logo
router.post('/new', upload.fields([{ name: 'image' }]), Auth, async (req, res) => {
    try {
        const newChannel = new Channel({
            name: req.body.name,
            logo: req.files.image[0].path
        })

        let channel = await Channel.create(newChannel)
        res.status(200).json(channel)
    } catch (error) {
        const errors = handleErrors(error)
        res.status(401).json({ errors })
    }
})

// delete channel
router.delete('/delete/:channelId', Auth, async (req, res) => {
    const user = req.user
    if (!user.isAdmin) {
        return res.status(404).json({ message: 'You are not an admin!' })
    }
    try {
        let result = await Channel.findOneAndDelete({ _id: req.params.channelId })
        fs.unlink(result.logo,test)
        let cascadeDelete = await Broadcast.deleteMany({ channel: result._id })
        if (!result) {
            return res.status(404).json({ message: 'Channel not found' })
        }
        res.status(200).json({ message: 'Channel deleted successfully' })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(401).json({ errors })
    }
})

// api search
router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        let channels = await Channel.find();
        res.json(search(channels, q).slice(0, 20));
    } catch (error) {
        const errors = handleErrors(error);
        res.status(401).json({ errors });
    }
});

const keys = ["name"];

const search = (data, q) => {
    return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
    );
};


module.exports = router;