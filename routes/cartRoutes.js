const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
const authorization = require("../middleware/middlewares");

router.post('/cart', authorization.isLoggedIn, controller.createCart);
router.put('/cart', authorization.isLoggedIn, controller.updateCart);
router.get('/cart', authorization.isLoggedIn, controller.getCart);

module.exports = router;