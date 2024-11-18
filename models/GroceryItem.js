// models/GroceryItem.js
const mongoose = require("mongoose");
const grocerySchema = new mongoose.Schema({
    item: {type: String},
    food_group: 
        {type: String, 
        required: [true, 'food_group is required'], 
        enum: ['fruits', 'dairy', 'proteins', 'vegetables', 'nuts', 'grains']},
    price_in_usd: 
    {type: Number, 
        required: [true, 'Please enter a number for price_in_usd']}
});
module.exports = mongoose.model("GroceryItem", grocerySchema);