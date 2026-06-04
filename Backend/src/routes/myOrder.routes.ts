import { Router } from "express";

import {
  getMyOrders
} from "../controllers/myOrder.controller";

import {
  authenticate
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  getMyOrders
);

export default router;