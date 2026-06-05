import app from "./app";
import prisma from "./config/prisma";
import "dotenv/config";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger";

async function testDB() {
  try {
    console.log(
      "DATABASE_URL =",
      process.env.DATABASE_URL
    );

    await prisma.$connect();

    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.error(
      "DATABASE ERROR:",
      error
    );
  }
}

testDB();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get("/", (req, res) => {
  res.send("Car Sales API");
});

app.listen(3000, () => {
  console.log("Server Running");
});