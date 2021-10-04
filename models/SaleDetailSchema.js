const mongoose = require('mongoose');
 
const saleDetailSchema = new mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        sale: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sale',
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        }
  },
  { timestamps: true },
);

module.exports = mongoose.model('SaleDetail', saleDetailSchema);
 
