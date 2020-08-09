const mongoose = require("mongoose");
const { mongoURL } = require("../config/keys");
const dataDb = { useNewUrlParser: true, useUnifiedTopology: true };
/***********************/
const CartModel = require("./cart.model");
/***********************************************************************/
// 1
exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        let item = new CartModel(data);
        return item.save();
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
exports.getItemsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        return CartModel.find({ userId }, {}, { sort: { createdAt: 1 } });
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
// 3
exports.editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => CartModel.updateOne({ _id: id }, newData))
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
//4
exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => CartModel.findByIdAndDelete(id))
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
//5
exports.getItemById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => CartModel.findById(id))
      .then((item) => {
        mongoose.disconnect();
        resolve(item);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
//6
exports.getItemByproductIdAndUserId = (pid, uid) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => CartModel.find({ productId: pid, userId: uid }))
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
// 7
exports.addAmount = (pid,uid, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => CartModel.updateOne({ productId: pid, userId: uid  }, newData))
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
//8
exports.deleteAll = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => CartModel.deleteMany())
      .then((items) => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
/***********************************************************************/
