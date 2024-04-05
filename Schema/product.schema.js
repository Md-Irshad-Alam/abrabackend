const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  image: {
    type: String,
    required: true,
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const product = mongoose.model('product', ProductSchema);
module.exports = product;
