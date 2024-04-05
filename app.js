const express = require('express');
const userRouter = require('./Routes/UserRoute');
const categoryRoute = require('./Routes/CategoryRoute');
const cors = require('cors');
const produtroute = require('./Routes/Product');
const config = require('./config');
const mongoose = require('mongoose');
const port = process.env.PORT || 6060;
const app = express();
const path = require('path');
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/categories', categoryRoute);
app.use('/product', produtroute);

// enable the static url
app.use('/public/uplods', express.static('Public/uploads'));

app.listen(port, async (req, res) => {
  await mongoose
    .connect(config.Connect_db_URL)
    .then((responce) => {
      console.log('server is connected with databse ');
    })
    .catch((error) => {
      console.log(`server connection is faild  ${error}`);
    });

  console.log('server is live on the http://localhost:8080');
});
