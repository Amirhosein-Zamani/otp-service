import { Router } from 'express';
import { OTPController } from '../controllers/otp.controller.js';
import { otpRateLimiter } from '../middleware/otp-rate-limit.middleware.js';
import { asyncHandler } from '../middleware/async-handler.middleware.js';
import { container } from 'tsyringe';

const router = Router();
const ctrl = container.resolve(OTPController);

router.post('/send', otpRateLimiter, asyncHandler(ctrl.sendOTP));
router.post('/verify', asyncHandler(ctrl.verifyOTP));

export { router as otpRouter };
