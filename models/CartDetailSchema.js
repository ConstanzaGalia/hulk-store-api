const mongoose = require('mongoose');
 
const cartDetailSchema = new mongoose.Schema(
    {
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
            required: true
        },
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
  },
  { timestamps: true },
);
 
module.exports = mongoose.model('CartDetail', cartDetailSchema);
