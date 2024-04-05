const express = require('express');
const categoryRoute = express.Router();
const multer = require('multer');
const Category = require('../Schema/Category.schema');
const {
  createCato,
  updateCato,
  deletecato,
  ReadSingle,
  ReadCato,
} = require('../Controller/Category');
const middleware = require('../Middleware/middleware');
const upload = require('../Middleware/MediaHelper');
categoryRoute.post('/add', middleware, upload.single('image'), createCato);
categoryRoute.put(
  '/:categoryId',
  upload.single('image'),
  middleware,
  updateCato
);
categoryRoute.get('/', ReadCato);
categoryRoute.get('/single/:id', ReadSingle);
categoryRoute.delete('/:deleteId', middleware, deletecato);
module.exports = categoryRoute;
