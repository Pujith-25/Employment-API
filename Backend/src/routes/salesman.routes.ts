import { Router } from "express";

import {
  createSalesman,
  getSalesmen,
  getSalesmanById,
  updateSalesman,
  deleteSalesman
} from "../controllers/salesman.controller";

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
    "ADMIN"
  ),
  createSalesman
);

router.get(
  "/",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER"
  ),
  getSalesmen
);

router.get(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN",
    "MANAGER"
  ),
  getSalesmanById
);

router.put(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN"
  ),
  updateSalesman
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole(
    "ADMIN"
  ),
  deleteSalesman
);

export default router;