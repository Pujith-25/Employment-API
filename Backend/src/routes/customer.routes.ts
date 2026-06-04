import { Router } from "express";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controllers/customer.controller";

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
  createCustomer
);

router.get(
  "/",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  getCustomers
);

router.get(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  getCustomerById
);

router.put(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  updateCustomer
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN"
  ),
  deleteCustomer
);

export default router;