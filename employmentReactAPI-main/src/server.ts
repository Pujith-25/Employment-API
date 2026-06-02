import app from "./app";
import prisma from "./config/prisma";
import "dotenv/config";

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

app.get("/", (req, res) => {
  res.send("Employee Management API");
});

app.listen(3000, () => {
  console.log("Server Running");
});