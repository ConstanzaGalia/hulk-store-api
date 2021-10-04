const mongoose = require('mongoose') ;
const Cart = require('../models/CartSchema') ;
const CartDetail = require('../models/CartDetailSchema') ;
const Product = require('../models/ProductSchema') ;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const publicKey = fs.readFileSync('./keys/public.pem');

const createCart = async (req, res) => {
    try {
        // Process body data
        const { productId, quantity
        } = req.body;
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, publicKey);
        req.userId = decoded.id;

        // Validate user input
        if (!(productId && quantity)) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Get product and check stock 
        const product = await Product.findOne({_id: productId});
        if (product) {
            if (product.stock < quantity) {
                throw new Error("Stock no disponible");
            }
        } else {
            throw new Error("Producto no encontrado");
        }

        // Validate if cart exist for user in our database
        let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(req.userId) });
        if (!cart) {
            cart = new Cart({
                user: mongoose.Types.ObjectId(req.userId)
            });
            await cart.save();
        }
        
        // Validate if product already exist in the cart
        let cartDetail = await CartDetail.findOne({
            cart: mongoose.Types.ObjectId(cart._id),
            products: mongoose.Types.ObjectId(productId)
        });
        if (cartDetail) {
            throw new Error("El producto ya ha sido agregado al carrito");
        }

        // Create and save cart detail
        cartDetail = new CartDetail({
            quantity: quantity,
            cart: mongoose.Types.ObjectId(cart._id),
            products: mongoose.Types.ObjectId(productId),
        });
        await cartDetail.save();
        res.status(200).json('Producto agregado al carrito');

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Hubo un problema al agregar el producto', error: error.message});
    }
}


const updateCart = async (req, res) => {
    try {
        // Process body data
        const { productId, quantity
        } = req.body;
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, publicKey);
        req.userId = decoded.id;

        // Validate user input
        if (!(productId && quantity)) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Get product and check stock 
        const product = await Product.findOne({_id: productId});
        if (product) {
            if (product.stock < quantity) {
                throw new Error("Stock no disponible");
            }
        } else {
            throw new Error("Producto no encontrado");
        }

        // Get cart for user in our database
        let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(req.userId) });
        
        // Validate if product exist in the cart
        let cartDetail = await CartDetail.findOne({
            cart: mongoose.Types.ObjectId(cart._id),
            products: mongoose.Types.ObjectId(productId)
        });
        
        if (!cartDetail) {
            cartDetail = new CartDetail({
                quantity: quantity,
                cart: mongoose.Types.ObjectId(cart._id),
                products: mongoose.Types.ObjectId(productId),
            });
            await cartDetail.save();
            res.status(200).json('Producto agregado al carrito');
        } 

        // Update cart detail
        cartDetail.quantity = quantity;
        await cartDetail.save();
        res.status(200).json('Carrito actualizado exitosamente');

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Hubo un problema al actualizar el carrito', error: error.message});
    }
}

const getCart = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, publicKey);
        req.userId = decoded.id;

        // Get cart 
        let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(req.userId) });
        
        if (!cart) {
            throw new Error("El usuario aún no tiene un carrito con productos");
        }

        // Get cart detail
        let cartDetail = await CartDetail.find({
            cart: mongoose.Types.ObjectId(cart._id)
        }).select({ 'cart': 0, 'createdAt': 0, 'updatedAt': 0 })
            .populate('products', 'name price stock');
        
        if (cartDetail) {
            return res.status(200).send(cartDetail);
        } else {
            throw new Error('No se puede obtener detalle del carrito');
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Hubo un problema al obtener el carrito', error: error.message});
    }
}

module.exports = {
    createCart,
    updateCart,
    getCart,
}
