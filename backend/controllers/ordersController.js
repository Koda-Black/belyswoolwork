const { OrderItem } = require("../models/order-itemController");
const { Order } = require("../models/ordersModel");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x.id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user.id,
    });

    const order = await newOrder.save();

    if (!order) {
      return res.status(400).json({ message: "order cannot be created" });
    }

    res.status(201).json({ message: "New order created", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);

    if (!totalSales) {
      return res
        .status(400)
        .json({ message: "The order sales cannot be generated" });
    }

    res.status(200).json({ totalsales: totalSales.pop().totalsales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    if (orderCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ orderCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Could not find order" });
    }

    res.status(200).send(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server erorr" });
  }
};

const getOrderList = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });

    if (!orderList) {
      return res.status(404).json({ message: "Could not find orders" });
    }

    res.status(200).json({ orderList });
  } catch (error) {
    res.status(500).json({ message: "Internal server erorr" });
  }
};

const updateOrder = async (req, res) => {
  try {
    let order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "order cannot be updated" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (order) {
      await order.OrderItems.map(async (orderItem) => {
        await OrderItem.findByIdAndDelete(orderItem);
      });

      return res.status(200).json({ success: true, message: "order deleted!" });
    } else res.status(404).json({ message: "order not found!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserOrderHistory = async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userid })
      .populate("user", "name")
      .sort({ dateOrdered: -1 });

    if (!userOrderList) {
      return res.status(404).json({ message: "Could not find orders" });
    }

    res.status(200).json({ userOrderList });
  } catch (error) {
    res.status(500).json({ message: "Internal server erorr" });
  }
};

module.exports = {
  getOrder,
  getTotalSales,
  getOrderList,
  getUserOrderHistory,
  getCount,
  createOrder,
  updateOrder,
  deleteOrder,
};
