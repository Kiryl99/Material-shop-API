const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    hazardLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' }
});

module.exports = mongoose.model('Product', productSchema);