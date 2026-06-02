import { Router } from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../controllers/employee.controller";

import { authenticate }
from "../middleware/auth.middleware";

import { authorizeRole }
from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorizeRole("ADMIN", "MANAGER"),
  createEmployee
);

router.get(
  "/",
  authenticate,
  authorizeRole("ADMIN", "MANAGER"),
  getEmployees
);

router.get(
  "/:id",
  authenticate,
  authorizeRole("ADMIN", "MANAGER"),
  getEmployeeById
);

router.put(
  "/:id",
  authenticate,
  authorizeRole("ADMIN", "MANAGER"),
  updateEmployee
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole("ADMIN"),
  deleteEmployee
);

export default router;