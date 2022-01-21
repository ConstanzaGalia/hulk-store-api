const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const authorization = require("../middleware/middlewares");
const adminRole = 'admin';

router.get("/users", controller.getAllUsers);
router.get("/users/:id", controller.getOneUser);
router.put("/users/:id", authorization.checkRole(adminRole), controller.editUser);
router.delete("/users/:id", authorization.checkRole(adminRole), controller.deleteUser);

module.exports = router;