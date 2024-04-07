const express = require('express');
const { register } = require('../Controller/User');
const { login, getLoggedInUser, updateUsers } = require('../Controller/User');
const middleware = require('../Middleware/middleware');
const upload = require('../Middleware/MediaHelper');
const multer = require('multer');
const userRouter = express.Router();

userRouter.get('/', (req, res) => res.send('i am live always '));
userRouter.post('/register', upload.single('avatar'), register);
userRouter.post('/login', login);
userRouter.get('/getuser', middleware, getLoggedInUser);
userRouter.put('/update/:id', upload.single('avatar'), updateUsers);

module.exports = userRouter;
