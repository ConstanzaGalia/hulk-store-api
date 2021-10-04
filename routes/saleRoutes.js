const express = require('express');
const router = express.Router();
const {createSales} = require("../controllers/salesController");
const authorization = require("../middleware/middlewares");

router.post('/sale', authorization.isLoggedIn, createSales);

module.exports = router;