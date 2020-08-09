const mongoose = require("mongoose");
/***********************************************************************/
const cartSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);
/***********************************************************************/
module.exports = mongoose.model("cart", cartSchema); // name change to lowercase and add s in end
