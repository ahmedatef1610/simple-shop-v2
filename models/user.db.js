const mongoose = require("mongoose");
const { mongoURL } = require("../config/keys");
const dataDb = { useNewUrlParser: true, useUnifiedTopology: true };
/***********************/
const UserModel = require("./user.model");
/***********************/
const bcrypt = require("bcrypt");
/***********************************************************************/
// 1
exports.createNewUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        return UserModel.findOne({ email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("email is used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new UserModel({
          username,
          password: hashedPassword,
          email,
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve("user is created");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
// 2
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURL, dataDb)
      .then(() => {
        return UserModel.findOne({ email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("email not found");
        } else {
          return bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("password is incorrect");
            } else {
              mongoose.disconnect();
              resolve({ id: user._id, isAdmin: user.isAdmin });
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
/***********************************************************************/
