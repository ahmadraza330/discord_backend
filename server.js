const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')

const PORT = process.env.API_PORT || 5002

const app = express()
app.use(express.json())
app.use(cors())

//routes
app.use('/api/auth', authRoutes)

const server = http.createServer(app)

mongoose.connect(process.env.DATABASE_URI).then(() => {
    server.listen(PORT, console.log(`Server is running on ${PORT}`))
}).catch((err) => {
    console.log('database connection faild', err)
})
