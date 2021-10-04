const mongoose = require("mongoose");
const Cart = require("../models/CartSchema");
const CartDetail = require("../models/CartDetailSchema");
const Sale = require("../models/SaleSchema");
const SaleDetail = require("../models/SaleDetailSchema");
const Product = require("../models/ProductSchema");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const publicKey = fs.readFileSync("./keys/public.pem");

const createSales = async (req, res) => {
  try {
    // Process body data
    const { paymentMethod, address } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, publicKey);
    req.userId = decoded.id;

    // Validate user input
    if (!(paymentMethod && address)) {
        throw new Error("Todos los campos son obligatorios");
    }

    // Get cart
    const cart = await Cart.findOne({
        user: mongoose.Types.ObjectId(req.userId),
    });
    if (!cart) {
        throw new Error("Carrito no existe");
    }

    // Get cart detail
    const cartDetail = await CartDetail.find({
        cart: mongoose.Types.ObjectId(cart._id),
    }).populate("products", "price");
    if (!cartDetail) {
        throw new Error("Detalle de carrito no existe");
    }

    // Calc total sale
    let total = 0.0;
    cartDetail.forEach((detail) => {
      total += detail.quantity * parseFloat(detail.products.price);
    });

    // Create sale
    const sale = new Sale({
        paymentMethod: paymentMethod,
        total: total,
        address: address,
        user: mongoose.Types.ObjectId(req.userId),
    });
    await sale.save();

    // Create sale details
    cartDetail.forEach(async (detail) => {
        const saleDetail = new SaleDetail({
        quantity: detail.quantity,
        price: detail.products.price,
        product: mongoose.Types.ObjectId(detail.products._id),
        sale: mongoose.Types.ObjectId(sale._id),
        });
        await saleDetail.save();
    });

    // Update stock in products
    cartDetail.forEach(async (detail) => {
        const product = await Product.findOne({ _id: detail.products._id });
        products.stock = products.stock - detail.quantity;
        await product.save();
    });

    // Remove detail cart and cart
    await CartDetail.deleteMany({ cart: cart._id });
    await Cart.deleteOne({ _id: cart._id });

    res.status(200).json("Compra realizada exitosamente");
    } catch (error) {
    console.error(error.message);
    res
        .status(200)
        .json({
        message: "Hubo un problema al al realizar la compra",
        error: error.message,
        });
    }
};

module.exports = { createSales };
