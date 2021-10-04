const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const productsRoutes = require('./productsRoutes');
const cartRoutes = require('./cartRoutes');
const saleRoutes = require('./saleRoutes');

router.use('/', authRoutes);
router.use('/', productsRoutes);
router.use('/', cartRoutes);
router.use('/', saleRoutes);

module.exports = router;
