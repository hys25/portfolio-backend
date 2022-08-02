const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/auth', require('./routes/authRoutes'))

app.listen(port)
