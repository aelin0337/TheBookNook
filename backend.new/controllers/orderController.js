import mongoose from "mongoose";
import Order from "../models/Order.js";
import Book from "../models/Book.js"; 

export const getMyOrders = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');

    const orders = await Order.find({ userId: req.user._id })
      .populate('items.bookId', 'title author');

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error getting user orders",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error getting orders",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error getting order",
      error: error.message,
    });
  }
};
export const createOrder = async (req, res) => {
  try {
    console.log('CREATE ORDER BODY:', req.body);
    console.log('USER:', req.user);

    for (const item of req.body.items) {
      if (!mongoose.Types.ObjectId.isValid(item.bookId)) {
        return res.status(400).json({
          message: "Incorrect bookId",
          bookId: item.bookId
        });
      }
    }

    const order = new Order({
      userId: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: "pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    res.status(500).json({ 
      message: "Error creating order",
      error: error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Status uploaded",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted",
      orderId: order._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting order",
      error: error.message,
    });
  }
};