const express = require('express');
const Item = require('../models/Item');
const itemsController = require('../controllers/itemsController');

const itemsRoute = express.Router();

itemsRoute.get('/items', itemsController.getItems)
itemsRoute.get('/categories', itemsController.getAllCategories)
itemsRoute.get('/items/filter', itemsController.getItemsWithFilter);

itemsRoute.delete('/item/:itemId', itemsController.deleteItem);
itemsRoute.get('/item/:itemId', itemsController.getItemById);
itemsRoute.put('/item/:itemId', itemsController.updateItem);

itemsRoute.post('/create-item', itemsController.createItem);

module.exports = itemsRoute;