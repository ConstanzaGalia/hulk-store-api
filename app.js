const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const indexRouter = require('./routes/index');
const conectDB = require("./utils/db");
const app = express();

conectDB();
app.use(logger('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors({ origin: process.env.ORIGIN_URL }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

module.exports = app;
