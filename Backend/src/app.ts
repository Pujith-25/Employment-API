import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import customerRoutes from "./routes/customer.routes";
import salesmanRoutes from "./routes/salesman.routes";
import carRoutes from "./routes/car.routes";
import orderRoutes from "./routes/order.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import profileRoutes from "./routes/profile.routes";
import myOrderRoutes from "./routes/myOrder.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("Car Sales Management API");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/profile", profileRoutes);
app.use("/my-orders", myOrderRoutes);
app.use("/customers", customerRoutes);
app.use("/salesmen", salesmanRoutes);
app.use("/cars", carRoutes);
app.use("/orders", orderRoutes);

export default app;