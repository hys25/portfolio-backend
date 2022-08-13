const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 3000
const { errorHandler } = require('./middleware/errorMiddleware')
const colors = require('colors')

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/user', require('./routes/userRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/', require('./routes/projectRoutes'))

app.use(errorHandler)

app.listen(port)
