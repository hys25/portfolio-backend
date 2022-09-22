require('dotenv').config()
require('colors')

const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 3000
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))

app.use('/user', require('./routes/userRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/project', require('./routes/projectRoutes'))
app.use('/skill', require('./routes/skillRoutes'))

app.use(errorHandler)

app.listen(port)
