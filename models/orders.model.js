const mongoose = require("mongoose");
/***********************************************************************/
const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    productId: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
  },
  {
    timestamps: true,
  }
);
/***********************************************************************/
module.exports = mongoose.model("order", orderSchema);
