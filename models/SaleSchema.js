const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
    {
        paymentMethod: {
            type: String,
            required: true
        },
        total: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Sale', saleSchema);
