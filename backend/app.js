const express = require('express')
const cors = require('cors')
const itemsRoute = require('./routes/itemsRoute')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/', itemsRoute)

app.listen(5050, console.log('server running on PORT:5050'))