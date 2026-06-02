import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller";

import {
  authenticate
} from "../middleware/auth.middleware";

import {
  authorizeRole
} from "../middleware/role.middleware";

const router = Router();

router.get("/test", (req, res) => {
  res.send("User Routes Working");
});

router.post(
  "/",
  authenticate,
  authorizeRole("ADMIN"),
  createUser
);

router.get(
  "/",
  authenticate,
  authorizeRole("ADMIN", "MANAGER"),
  getUsers
);

router.get(
  "/:id",
  authenticate,
  authorizeRole("ADMIN", "MANAGER"),
  getUserById
);

router.put(
  "/:id",
  authenticate,
  authorizeRole("ADMIN"),
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole("ADMIN"),
  deleteUser
);

export default router;