const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { authJwt } = require("./middlewares/jwt.js");
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const ordersRouter = require("./routes/ordersRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");
require("dotenv/config");
const { errorHandler } = require("../backend/middlewares/error-handler.js");

app.use(cors());
app.options("*", cors());

// middleware
app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

// routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/orders", ordersRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
