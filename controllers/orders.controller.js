const CartDb = require("../models/cart.db");
const OrderDb = require("../models/orders.db");
/*********************************/
const validationResult = require("express-validator").validationResult;
/*********************************/
// 1 all "/orders/verify-order"
exports.getOrderVerify = (req, res, next) => {
  CartDb.getItemById(req.query.order)
    .then((cartItem) => {
      res.render("verify-order", {
        cart: cartItem,
        path: "/orders",
        validationError: req.flash("validationErrors")[0],
        pageTitle: "Verify Order",
      });
    })
    .catch((err) => next(err));
};
// 2 Get "/orders/"
exports.getOrder = (req, res, next) => {
  OrderDb.getOrdersByUser(req.session.userId)
    .then((items) => {
      res.render("orders", {
        path: "/orders",
        items: items,
        pageTitle: "Orders",
      });
    })
    .catch((err) => next(err));
};
// 3 Post "/orders/"
exports.postOrder = (req, res, next) => {
  if (validationResult(req).isEmpty())
    OrderDb.addNewOrder(req.body)
      .then(() => res.redirect("/orders"))
      .catch((err) => next(err));
  else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/orders/verify-order?order=" + req.body.cartId);
  }
};
// 4 Post "/orders/cancel"
exports.postCancel = (req, res, next) => {
  OrderDb.cancelOrder(req.body.orderId)
    .then(() => res.redirect("/orders"))
    .catch((err) => next(err));
};
