const Item = require("../models/Item");

const itemsController = {
    getItems: async (req, res) => {
        try {
            const items = await Item.find();
            res.json(items)
        }
        catch (err) {
            console.log(err.message)
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const categories = await Item.distinct("category")
            res.json(categories)
        }
        catch (err) {
            console.log(err.message)
        }
    },
    getItemsWithFilter: async (req, res) => {
        const { category, maxPrice, query } = req.query
        // Initialize the filter object
        let filter = {};
        try {
            if (query) {
                filter.name = { $regex: new RegExp(query, 'i') };
            }

            // Apply filter for maxPrice if provided
            if (maxPrice) {
                const parsedPrice = parseFloat(maxPrice);
                if (isNaN(parsedPrice)) {
                    return res.status(400).json({ error: "Invalid maxPrice value" });
                }
                filter.price = { $lte: parsedPrice }; // Apply price filter
            }

            // Apply filter for category if provided
            if (category) {
                filter.category = { $regex: new RegExp(category, 'i') };
            }

            const items = await Item.find(filter)
            // If no items are found, return a specific message
            res.status(200).json(items);
        }
        catch (err) {
            console.log(err.message)
        }
    },
    createItem: async (req, res) => {
        const { name, category, price, quantity } = req.body;
        try {
            const existingItem = await Item.findOne({ name })
            if (existingItem) {
                return res.status(409).json({ message: "Item with same name already exist" });
            }
            const newItem = new Item({ name: name, category: category, price: price, quantity: quantity })
            newItem.save();
            res.status(201).json({
                message: 'Item created successfully',
                newItem
            });
        } catch (error) {
            console.log(error.message)
        }
    },
    deleteItem: async (req, res) => {
        const { itemId } = req.params;
        try {
            const existingItem = Item.findOne({ _id: itemId })
            if (existingItem) {
                await Item.deleteOne({ _id: itemId })
                res.status(200).json({
                    message: 'Item deleted successfully!'
                })
            }
            else {
                return res.status(404).json({
                    message: 'No item found'
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    getItemById: async (req, res) => {
        const { itemId } = req.params;
        try {
            const retrievedItem = await Item.findOne({ _id: itemId })
            res.json(retrievedItem)
        } catch (error) {
            console.log(error)
        }
    },
    updateItem: async (req, res) => {
        const { itemId } = req.params;
        const { name, category, price, quantity } = req.body;
        try {
            await Item.updateOne({ "_id": itemId }, { $set: { name, category, price, quantity } })
            res.status(200).json({
                message: 'Item updated successfully!'
            })
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = itemsController;