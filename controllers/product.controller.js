const ProductDb = require("../models/product.db");

/*********************************/
//  1 Get "/product/"
exports.getProduct = (req, res, next) => {
  ProductDb.getFirstProduct()
    .then((product) => {
      res.render("product", {
        product,
        path: "/",
        pageTitle: "Product Details",
      });
    })
    .catch((err) => next(err));
};
//  2 Get "/product/:id"
exports.getProductById = (req, res, next) => {
  let id = req.params.id;
  ProductDb.getProductById(id)
    .then((product) => {
      res.render("product", {
        product,
        path: "/",
        validationError: req.flash("validationErrors")[0],
        pageTitle: product.name
      });
    })
    .catch((err) => next(err));
};
