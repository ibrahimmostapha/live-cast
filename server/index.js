const express = require('express');
const authRoute = require('./routes/AuthRoute');
const userRoute = require('./routes/UserRoute');
const subRoute = require('./routes/subsRoute');
const connect = require('./config/db');
const packagesRoute = require('./routes/packagesRoute');
const channelsRoute=require('./routes/channelsRoute')
const broadcastsRoute=require('./routes/broadcastsRoute')
const cors = require('cors');

const app = express()//creates an express app

app.use('*/assets', express.static(__dirname + '/assets'))
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('*/assets', express.static(__dirname + '/assets'))

//routes
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/subscribe', subRoute)
app.use('/api/packages', packagesRoute)
app.use('/api/channels',channelsRoute)
app.use('/api/broadcasts',broadcastsRoute)

// connect to db
connect(app)
