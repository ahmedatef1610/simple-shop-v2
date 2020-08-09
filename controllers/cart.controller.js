const CartDb = require("../models/cart.db");
const validationResult = require("express-validator").validationResult;
/*********************************/
// 1 Get "/cart/"
exports.getCart = (req, res, next) => {
  CartDb.getItemsByUser(req.session.userId)
    .then((items) => {
      res.render("cart", {
        items,
        path: "/cart",
        validationError: req.flash("validationErrors")[0],
        pageTitle: "Cart",
      });
    })
    .catch((err) => {
      next(err);
    });
};
// 2 Post "/cart/"
exports.postCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    CartDb.getItemByproductIdAndUserId(req.body.productId, req.session.userId)
      .then((item) => {
        if (item.length != 0) {
          return CartDb.addAmount(req.body.productId, req.session.userId, {
            amount: +req.body.amount + +item[0].amount,
          });
        } else {
          return CartDb.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
          });
        }
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        next(err);
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};
// 3 Post /cart/save
exports.postSave = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    CartDb.editItem(req.body.cartId, { amount: req.body.amount })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        next(err);
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/cart");
  }
};

// 4 Post /cart/delete
exports.postDelete = (req, res, next) => {
  CartDb.deleteItem(req.body.cartId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      next(err);
    });
};

// 5 Post /cart/deleteall
exports.postDeleteAll = (req, res, next) => {
  CartDb.deleteAll()
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      next(err);
    });
};
