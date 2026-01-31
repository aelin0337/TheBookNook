import express from "express";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getMyOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllOrders); 
router.get("/my", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, adminOnly, updateOrderStatus);
router.delete("/:id", authMiddleware, adminOnly, deleteOrder);

export default router;