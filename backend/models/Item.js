const mongoose = require("../database/db");

const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    category: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;