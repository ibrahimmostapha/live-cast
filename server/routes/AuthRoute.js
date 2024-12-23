const express = require('express')
const jwt = require('jsonwebtoken')
const User=require('../models/user')

const router = express.Router()

//Create static method instead of the ones already present

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    if(user.plan){isSub=true;console.log(true)}

    res.status(200).json({firstName:user.firstName, lastName:user.lastName, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupUser = async (req, res) => {
  const {email,firstName,lastName, password} = req.body

  try {
    const user = await User.signup(email,firstName,lastName, password)
    
    const token = createToken(user._id)
    
    res.status(200).json({firstName,lastName, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// router.post('/googleLogin', async (req, res) => {
//   try{
//     const {email, firstName, lastName} = req.body
//     let userExist = await User.find({email})
    
//     if(!userExist){
//       const user = await User.signup(email,firstName,lastName, process.env.SECRET)
//       const token = createToken(user._id)
//       res.status(200).json({email,firstName,lastName, token})
//     } else{
//       const user = await User.login(email, process.env.SECRET)
//       const token = createToken(user._id)
//       res.status(200).json({email, token})
//     }
//   }
//   catch(err){
//       console.log(err.message)
//       res.status(400).json({error:err.message})
//   }
// })

router.post('/signup', signupUser)
router.post('/login', loginUser)

module.exports = router;

