import { Router } from "express";

import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar
} from "../controllers/car.controller";

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
    "MANAGER"
  ),
  createCar
);

router.get(
  "/",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  getCars
);

router.get(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER",
    "SALESMAN"
  ),
  getCarById
);

router.put(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER"
  ),
  updateCar
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN"
  ),
  deleteCar
);

export default router;