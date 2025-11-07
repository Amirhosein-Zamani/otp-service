import { Router } from "express";
import { otpRateLimiter } from "../middleware/otp-rate-limit.middleware.js";
import { asyncHandler } from "../middleware/async-handler.middleware.js";
import { container } from "tsyringe";
import { OTPController } from "../controllers/otp.controller.js";
import "../../config/dependency.injection.js";

const router = Router();

// Lazy load controller
router.post("/send", otpRateLimiter, asyncHandler(async (req, res) => {
  const controller = container.resolve(OTPController);
  return controller.sendOTP(req, res);
}));

router.post("/verify", asyncHandler(async (req, res) => {
  const controller = container.resolve(OTPController);
  return controller.verifyOTP(req, res);
}));

export { router as otpRouter };
