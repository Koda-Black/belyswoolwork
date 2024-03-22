const express = require("express");
const path = require("path");
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

// Define __dirname before using it

app.use(cors());
app.options("*", cors());

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);
app.use(errorHandler);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "/frontend/build")));

// Route for all other requests to serve the React app
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

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
