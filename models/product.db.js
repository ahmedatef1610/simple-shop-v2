const mongoose = require("mongoose");
const { mongoURL } = require("../config/keys");
const dataDb = { useNewUrlParser: true, useUnifiedTopology: true };
/***********************/
const ProductModel = require("./product.model");
/***********************************************************************/
//1
exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        return ProductModel.find({});
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
//2
exports.getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        return ProductModel.find({ category });
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
//3
exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        return ProductModel.findById(id);
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
//4
exports.getFirstProduct = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        return ProductModel.findOne({});
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
// 5
exports.addNewProduct = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        let newProduct = new ProductModel(data);
        return newProduct.save();
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

/***********************************************************************/
