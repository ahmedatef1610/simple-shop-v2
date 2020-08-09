const mongoose = require("mongoose");
const { mongoURL } = require("../config/keys");
const dataDb = { useNewUrlParser: true, useUnifiedTopology: true };
/***********************/
const OrderModel = require("./orders.model");
const CartDb = require("./cart.db");
/***********************************************************************/
// 1
exports.addNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    CartDb
      .deleteItem(data.cartId)
      .then(() => mongoose.connect(mongoURL,dataDb))
      .then(() => {
        let order = new OrderModel(data);
        return order.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
// 2
exports.getOrdersByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL,dataDb)
      .then(() => {
        return OrderModel.find({ userId }, {}, { sort: { createdAt: 1 } });
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
//3
exports.cancelOrder = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL,dataDb)
      .then(() => OrderModel.findByIdAndDelete(id))
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
/***************************/
//4
exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL,dataDb)
      .then(() => {
        return OrderModel.find({}, {}, { sort: { createdAt: 1 } });
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
//5
exports.editOrder = (id, newStatus) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL)
      .then(() => {
        return OrderModel.updateOne({ _id: id }, { status: newStatus });
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
/***************************/

/***********************************************************************/
