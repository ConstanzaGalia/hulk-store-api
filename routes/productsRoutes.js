const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");
const authorization = require("../middleware/middlewares");
const adminRole = 'admin';

router.post("/products", authorization.checkRole(adminRole), controller.createProduct);
router.get("/products", controller.getAllProducts);
router.get("/products/:id", controller.getProduct);
router.put("/products/:id", authorization.checkRole(adminRole), controller.editProduct);
router.delete("/products/:id", authorization.checkRole(adminRole), controller.deleteProduct);

module.exports = router;
