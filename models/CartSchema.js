const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
