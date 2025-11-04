import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/async-handler.middleware.js';
import { includeIf } from '../helpers/include-if.helper.js';
import { OTPService } from '../../application/services/otp.service.js';
import { ApiResponse } from '../helpers/api-response.js';

export class OTPController {
    constructor(private readonly service: OTPService) { }

    sendOTP = asyncHandler(async (req: Request, res: Response) => {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json(ApiResponse.error('Phone number is required'));
        }

        const code = await this.service.sendOTP(phone);
        const isDev = process.env.NODE_ENV !== 'production';

        return res.status(200).json(
            ApiResponse.success('OTP Sent.', {
                ...includeIf(isDev, { code }),
            }),
        );
    });

    verifyOTP = asyncHandler(async (req: Request, res: Response) => {
        const { phone, code } = req.body();

        if (!phone || !code) {
            return res.status(400).json(ApiResponse.error('Phone and code are required'));
        }

        const isValid = await this.service.verifyOTP(phone, code);

        if (!isValid) {
            return res.status(400).json(ApiResponse.error('Invalid OTP'));
        }

        return res.status(200).json(ApiResponse.success('OTP verified successfully'));
    });
}

