// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  producer: { type: String, required: true },
  contactInfo: { type: String, required: true }, // New field for contact info
});

module.exports = mongoose.model('Product', productSchema);
