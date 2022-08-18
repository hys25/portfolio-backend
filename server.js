require('dotenv').config()
require('colors')

const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 3000
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/user', require('./routes/userRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/', require('./routes/projectRoutes'))

app.use(errorHandler)

app.listen(port)
