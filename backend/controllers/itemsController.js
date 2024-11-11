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
}

module.exports = itemsController;