import { Router } from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from "../controllers/department.controller";

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
  authorizeRole("ADMIN"),
  createDepartment
);

router.get(
  "/",
  authenticate,
  getDepartments
);

router.get(
  "/:id",
  authenticate,
  getDepartmentById
);

router.put(
  "/:id",
  authenticate,
  authorizeRole("ADMIN"),
  updateDepartment
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole("ADMIN"),
  deleteDepartment
);

export default router;