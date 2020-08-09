const ProductDb = require("../models/product.db");

/*********************************/
// 1 Get "/"
exports.getHome = (req, res, next) => {
  let vaildCategories = ["clothes", "phones", "computers"];
  if (req.query.category && vaildCategories.includes(req.query.category)) {
    ProductDb.getProductsByCategory(req.query.category)
      .then((products) => {
        res.render("index", {
          products,
          path: "/",
          validationError: req.flash("validationErrors")[0],
          pageTitle: "Home",

        });
      })
      .catch((err) => next(err));
  } else {
    ProductDb.getAllProducts()
      .then((products) => {
        res.render("index", {
          products,
          path: "/",
          validationError: req.flash("validationErrors")[0],
          pageTitle: "Home",

        });
      })
      .catch((err) => next(err));
  }
};
