const router = require("express").Router();
/***********************************************************/
const cartController = require("../controllers/cart.controller");
/*********************************/
const authGuard = require("../middleware/auth.guard");
const check = require("express-validator").check;
/*********************************/
router.get("/", authGuard.isAuth, cartController.getCart);
router.post(
  "/",
  authGuard.isAuth,
  check("amount")
    .not()
    .isEmpty()
    .withMessage("amount is required")
    .isInt({ min: 1 })
    .withMessage("amount must be grater than 0"),
  cartController.postCart
);
router.post(
  "/save",
  authGuard.isAuth,
  check("amount")
    .not()
    .isEmpty()
    .withMessage("amount is required")
    .isInt({ min: 1 })
    .withMessage("amount must be grater than 0"),
  cartController.postSave
);
router.post("/delete", authGuard.isAuth, cartController.postDelete);
router.post("/deleteall", authGuard.isAuth, cartController.postDeleteAll);
/***********************************************************/
module.exports = router;
