import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import departmentRoutes
from "./routes/department.routes";
import employeeRoutes
from "./routes/employee.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.get("/", (req, res) => {
  res.send("Employee Management API");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);

export default app;