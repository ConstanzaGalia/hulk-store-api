const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const productsRoutes = require('./productsRoutes');
const cartRoutes = require('./cartRoutes');
const saleRoutes = require('./saleRoutes');
const usersRoutes = require('./userRoutes');

router.use('/', authRoutes);
router.use('/', productsRoutes);
router.use('/', cartRoutes);
router.use('/', saleRoutes);
router.use('/', usersRoutes);

module.exports = router;
