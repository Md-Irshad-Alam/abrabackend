const express = require('express');
const produtroute = express.Router();
const multer = require('multer');

const {
  addproduct,
  Getproduct,
  updateProduct,
  deleteproduct,
  ReadSingle,
} = require('../Controller/product');
const middleware = require('../Middleware/middleware');
const upload = require('../Middleware/MediaHelper');

produtroute.post('/add', middleware, upload.single('image'), addproduct);
produtroute.get('/', middleware, Getproduct);
produtroute.put(
  '/update/:id',
  upload.single('image'),
  middleware,
  updateProduct
);
produtroute.get('/single/:id', ReadSingle);
produtroute.delete('/:id', middleware, deleteproduct);
module.exports = produtroute;
