const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const paystack = require("paystack")(process.env.PAYSTACK_SECRET);

const {
  isAuth,
  isAdmin,
  mailgun,
  payOrderEmailTemplate,
} = require("../middlewares/jwt2.js");

const {
  createOrder,
  getOrderList,
  getOrderHistory,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getCount,
  getUserOrderHistory,
} = require("../controllers/ordersController");

const router = express.Router();

// create stripe payment route

// create new order
router.post("/", isAuth, createOrder);

router.get("/mine", isAuth, getOrderHistory);

// get one order
router.get("/:id", isAuth, getOrder);

// get all orders
router.get("/", isAuth, isAdmin, getOrderList);

// get total sales
router.get("/get/totalsales", getTotalSales);

// get order count
router.get("/get/ordercount", getCount);

// get user order history
// router.get("/get/userorders/:userid", getUserOrderHistory);

// update order status
router.put("/:id", updateOrder);

// delete order
router.delete("/:id", deleteOrder);

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "NGN",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/payment/success`,
    cancel_url: `http://localhost:3000/payment/cancel`,
  });
  res.json({ id: session.id });
});

router.post("/verify-payment", async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await paystack.transactions.verify(reference);
    if (response.data.status === "success") {
      // Payment successful, handle accordingly (e.g., update order status)
      console.log("Payment verified successfully");
      res.status(200).json({ message: "Payment successful" });
    } else {
      console.log("Payment verification failed");
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Error verifying payment" });
  }
});

module.exports = router;

const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const paystack = require("paystack")(process.env.PAYSTACK_SECRET);

const {
  isAuth,
  isAdmin,
  mailgun,
  payOrderEmailTemplate,
} = require("../middlewares/jwt2.js");

const {
  createOrder,
  getOrderList,
  getOrderHistory,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getCount,
  getUserOrderHistory,
} = require("../controllers/ordersController");

const router = express.Router();

// create stripe payment route

// create new order
router.post("/", isAuth, createOrder);

router.get("/mine", isAuth, getOrderHistory);

// get one order
router.get("/:id", isAuth, getOrder);

// get all orders
router.get("/", isAuth, isAdmin, getOrderList);

// get total sales
router.get("/get/totalsales", getTotalSales);

// get order count
router.get("/get/ordercount", getCount);

// get user order history
// router.get("/get/userorders/:userid", getUserOrderHistory);

// update order status
router.put("/:id", updateOrder);

// delete order
router.delete("/:id", deleteOrder);

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "NGN",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/payment/success`,
    cancel_url: `http://localhost:3000/payment/cancel`,
  });
  res.json({ id: session.id });
});

router.post("/verify-payment", async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await paystack.transactions.verify(reference);
    if (response.data.status === "success") {
      // Payment successful, handle accordingly (e.g., update order status)
      console.log("Payment verified successfully");
      res.status(200).json({ message: "Payment successful" });
    } else {
      console.log("Payment verification failed");
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Error verifying payment" });
  }
});

module.exports = router;
