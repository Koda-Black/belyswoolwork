const express = require("express");
const stripe = require("stripe")(
  `sk_test_51OwXukB9RrPApwN7CoC4EMDLJBMerGmxQJZcfv8gys1om5yCbyRbDkvX5TW5KFCNH18S8c691BPiyWRTU3P1AKY800zyacIwSP`
);

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

// create stripe payment route
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

// create new order
router.post("/", isAuth, createOrder);

// get one order
router.get("/:id", isAuth, getOrder);

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
