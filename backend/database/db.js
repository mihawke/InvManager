const mongoose = require('mongoose')
require('dotenv').config();

const connectionString = `${process.env.DB_STR}`

mongoose.connect(connectionString)
.then(() => console.log('Mongodb connected'))
.catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose;