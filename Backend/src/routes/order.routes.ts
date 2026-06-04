import { Router } from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/order.controller";

import {
  authenticate
} from "../middleware/auth.middleware";

import {
  authorizeRole
} from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  createOrder
);

router.get(
  "/",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  getOrders
);

router.get(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  getOrderById
);

router.put(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER"
  ),
  updateOrder
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN"
  ),
  deleteOrder
);

export default router;