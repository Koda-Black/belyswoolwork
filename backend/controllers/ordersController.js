const { OrderItem } = require("../models/order-itemController");
const { Order } = require("../models/ordersModel");

const createOrder = async (req, res) => {
  try {
    let orderItemsIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;
    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );

        // console.log(orderItem); // Log populated orderItem for debugging

        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    // console.log(totalPrices);
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });

    order = await order.save();

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
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      });

    if (!order) {
      return res.status(404).json({ message: "Could not find order" });
    }

    res.status(200).json({ order });
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
