const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {type: Number, default: 0},
    description: String,
    deletedAt: Date || null,
},
    {
        timestamps: true,
        versionKey: false,
    });

module.exports = mongoose.model('products', productSchema);