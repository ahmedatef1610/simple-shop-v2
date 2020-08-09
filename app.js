const path = require("path");
const express = require("express");

const session = require("express-session");
const sessionStore = require("connect-mongodb-session")(session);
const { mongoURL } = require("./config/keys");
const flash = require("connect-flash");
/********************************************************************/
const app = express();
/********************************************************************/
// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon!");
// });
/**************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
app.set("view engine", "ejs");
app.set("views", "views"); //default
/**************************/
const store = new sessionStore({
  uri: mongoURL,
  collection: "sessions",
});
app.use(
  session({
    secret: "this is my secret to hash express sessions ba bal .....",
    saveUninitialized: false,
    resave: true,
    store,
  })
);
app.use(flash());
/**************************/
app.use((req, res, next) => {
  res.locals.date = new Date().getFullYear();
  res.locals.isUser = req.session.userId;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});
/********************************************************************/
const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");
const cartRouter = require("./routes/cart.route");
const ordersRouter = require("./routes/orders.route");
const adminRouter = require("./routes/admin.route");

app.use("/", homeRouter);
app.use("/product", productRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminRouter);

app.get("/error", (req, res, next) => {
  res.status(500);
  res.render("error", {
    path: "/error",
    pageTitle: "error",
  });
});
app.get("/not-admin", (req, res, next) => {
  res.status(403);
  res.render("not-admin", {
    path: "/not-admin",
    pageTitle: "not-admin",
  });
});
app.use((req, res, next) => {
  res.status(404);
  res.render("not-found", {
    path: "/not-found",
    pageTitle: "not found",
  });
});
app.use((error, req, res, next) => {
  // res.status(500).send({ error: error.message });
  res.redirect("/error");
});
/********************************************************************/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
