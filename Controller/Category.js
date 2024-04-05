const Category = require('../Schema/Category.schema');
const User = require('../Schema/User.schema');
const fs = require('fs');
const path = require('path');
const createCato = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const basepath = `${req.protocol}://${req.get('host')}/public/uplods/`;
    const filename = req.file.filename;

    const userId = req.user;
    const owner = await User.findById(userId.id);
    // console.log(owner);
    const category = new Category({
      name,
      slug,
      image: `${basepath}${filename}`,
      owner: owner._id,
    });
    await category.save();
    res
      .status(201)
      .json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCato = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, slug } = req.body;
    const image = req.file.path;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug, image },
      { new: true }
    );
    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deletecato = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.deleteId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const imagePath = path.join(
      __dirname,
      '..',
      'public',
      'uploads',
      category.image
    );
    console.log(imagePath);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    // Delete image after deleting category
    // Add your code to delete the image file here
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const ReadCato = async (req, res) => {
  try {
    const categories = await Category.find().populate('owner');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const ReadSingle = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('owner');
    console.log(category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCato,
  updateCato,
  deletecato,
  ReadSingle,
  ReadCato,
};
