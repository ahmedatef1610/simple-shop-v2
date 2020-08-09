const mongoose = require("mongoose");
/***********************************************************************/
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    //   date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    // userId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     require: true
    // }
  },
  {
    timestamps: true,
  }
);
/***********************************************************************/
module.exports = mongoose.model("product", productSchema); // name change to lowercase and add s in end
