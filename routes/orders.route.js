const router = require("express").Router();
/***********************************************************/
const orderController = require("../controllers/orders.controller");
/*********************************/
const check = require("express-validator").check;
const authGuard = require("../middleware/auth.guard");
/*********************************/
router.all("/verify-order", authGuard.isAuth, orderController.getOrderVerify);

router.get("/", authGuard.isAuth, orderController.getOrder);

router.post(
  "/",
  authGuard.isAuth,
  check("address").not().isEmpty().withMessage("address is required"),
  orderController.postOrder
);

router.post("/cancel", authGuard.isAuth, orderController.postCancel);
/***********************************************************/
module.exports = router;
