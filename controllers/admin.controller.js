const ProductDb = require("../models/product.db");

/*********************************/
const validationResult = require("express-validator").validationResult;
/*********************************/
// 1 get "/admin/add"
exports.getAdd = (req, res, next) => {
  res.render("add-product", {
    path: "/admin/add",
    productAdded: req.flash("added")[0],
    validationErrors: req.flash("validationErrors"),
    pageTitle: "Add Product",
  });
};
// 2 post "/admin/add"
exports.postAdd = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    req.body.image = req.file.filename;
    ProductDb.addNewProduct(req.body)
      .then(() => {
        req.flash("added", true);
        res.redirect("/admin/add");
      })
      .catch((err) => {
        res.redirect("/error");
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/admin/add");
  }
};
