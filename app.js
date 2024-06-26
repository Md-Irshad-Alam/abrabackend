require('dotenv').config();
const express = require('express');
const userRouter = require('./Routes/UserRoute');
const categoryRoute = require('./Routes/CategoryRoute');
const cors = require('cors');
const produtroute = require('./Routes/Product');

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

// `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.otro2lv.mongodb.net/`
app.listen(port, async (req, res) => {
  await mongoose
    .connect(
      `mongodb+srv://almairsh0205:Vyl3diYmd3BTalhT@cluster0.otro2lv.mongodb.net/`
    )
    .then((responce) => {
      console.log('server is connected with databse ');
    })
    .catch((error) => {
      console.log(`server connection is faild  ${error}`);
    });

  console.log('server is live on the http://localhost:8080');
});
