const { ObjectId } = require("mongoose").Types;
const Product = require("../models/ProductSchema");
const {productService} = require("../utils/productService");

const createProduct = async (req, res) => {
    try {
        const product = await productService.save(req.body);
        return res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
       return res.status(500).json("There was an error creating the product");
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("There was an error get all products");
    }
    
};

const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!ObjectId.isValid(productId)) {
            return res.status(400).json("Object Id not valid");
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json("Product not found");
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json("There was an error search the product");
    }
};

const deleteProduct = async (req, res) => {
    const todayDate = new Date();
    const deletedStatus = {
        deletedAt: todayDate,
    };
    try {
        const productId = req.params.id;
        if (!ObjectId.isValid(productId)) {
            return res.status(400).json("Object Id not valid");
        }
        const deletedProduct = await Product.findOneAndUpdate({_id: productId}, deletedStatus, {new: true});
        if (deletedProduct) {
            return res.status(200).json(deletedProduct);
        } else {
            res.status(400).json("Article not found");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json("There was an error deleted the product");
    }
};

const editProduct = async (req, res) => {
    try {
        const { body } = req;
        const productId = req.params.id;
        if (!ObjectId.isValid(productId)) {
            return res.status(400).json("Object Id not valid");
        }
        const updateProduct = await Product.findOneAndUpdate(
            { _id: productId },
            body,
            { new: true }
        );
        if (updateProduct) {
            res.status(200).json(updateProduct);
        } else {
            res.status(400).json("Product not found")
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json('There was an error update the product');
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    editProduct,
};
