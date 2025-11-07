import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { connectRedis } from "./infra/db/redis.client.js";
import "./config/dependency.injection.js";
import { otpRouter } from "./presentation/routes/otp.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

async function startServer() {
  try {
    await connectRedis();
    console.log(" Redis connection established");

    app.use("/otp", otpRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
