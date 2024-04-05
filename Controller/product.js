const product = require('../Schema/product.schema');
const Category = require('../Schema/Category.schema');
const User = require('../Schema/User.schema');
const fs = require('fs');
const addproduct = async (req, res) => {
  const { title, description, price, categoryId, ownerId } = req.body;

  const basepath = `${req.protocol}://${req.get('host')}/public/uplods/`;
  const filename = req.file.filename;
  const category = await Category.findById(categoryId);
  const owner = await User.findById(ownerId);
  const products = new product({
    title,
    description,
    price,
    categoryId,
    image: `${basepath}${filename}`,
    ownerId,
  });
  await products.save();
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const image = req.file.filename;

    const products = await product.findByIdAndUpdate(
      id,
      { title, price, image, description },
      { new: true }
    );
    res.json({ message: 'Product updated successfully', products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteproduct = async (req, res) => {
  try {
    const products = await product.findByIdAndDelete(req.params.id);
    if (!products) {
      return res.status(404).json({ message: 'product not found' });
    }

    // Delete image after deleting category
    // Add your code to delete the image file here
    res.json({ message: 'product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const ReadSingle = async (req, res) => {
  try {
    const priviousinfo = await product
      .findById(req.params.id)
      .populate('ownerId')
      .populate('categoryId');
    if (!priviousinfo) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(priviousinfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Getproduct = async (req, res) => {
  try {
    const priviousinfo = await product
      .find()
      .populate('ownerId')
      .populate('categoryId');

    res.json(priviousinfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addproduct,
  Getproduct,
  updateProduct,
  deleteproduct,
  ReadSingle,
};
