const express = require('express');
const Item = require('../models/Item');
const itemsController = require('../controllers/itemsController');

const itemsRoute = express.Router();

itemsRoute.get('/items', itemsController.getItems)
itemsRoute.get('/categories', itemsController.getAllCategories)
itemsRoute.get('/items/filter', itemsController.getItemsWithFilter);


module.exports = itemsRoute;