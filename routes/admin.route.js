const router = require("express").Router();
/***********************************************************/
const adminController = require("../controllers/admin.controller");
/*********************************/
const check = require("express-validator").check;
const authGuard = require("../middleware/auth.guard");
const adminGuard = require("../middleware/admin.guard");
const multer = require("multer");
/*********************************/
router.get(
  "/add",
  authGuard.isAuth,
  adminGuard.isAdmin,
  adminController.getAdd
);
router.post(
  "/add",
  authGuard.isAuth,
  adminGuard.isAdmin,
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "images");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  check("image").custom((value, { req }) => {
      if(req.file) return true;
      else throw "image is required";
  }),
  adminController.postAdd
);

/***********************************************************/
module.exports = router;
