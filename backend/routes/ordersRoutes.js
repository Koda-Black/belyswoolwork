const express = require("express");
const {
  isAuth,
  isAdmin,
  mailgun,
  payOrderEmailTemplate,
} = require("../middlewares/jwt2.js");

const {
  createOrder,
  getOrderList,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getCount,
  getUserOrderHistory,
} = require("../controllers/ordersController");

const router = express.Router();

// create new order
router.post("/", isAuth, createOrder);

// get one order
router.get("/:id", getOrder);

// get all orders
router.get("/", isAuth, isAdmin, getOrderList);

// get total sales
router.get("/get/totalsales", getTotalSales);

// get order count
router.get("/get/ordercount", getCount);

// get user order history
router.get("/get/userorders/:userid", getUserOrderHistory);

// update order status
router.put("/:id", updateOrder);

// delete order
router.delete("/:id", deleteOrder);

module.exports = router;
