const Product = require("../models/ProductSchema");

const productService = {
  save: async (dataProduct) => {
    const product = new Product({
      ...dataProduct,
    });
    await product.save();
    return product;
  },
  find: async () => {
    const products = Product.find();
    return products;
  }
};

module.exports = { productService };
