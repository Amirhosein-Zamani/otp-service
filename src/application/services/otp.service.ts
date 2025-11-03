import type { IOTPRepository } from '../interfaces/otp-repository.interface.js';
import { OTP } from '../../domain/entities/otp.entity.js';
import config from '../../config/config.service.js';

export class OTPService {

    constructor(private readonly repository: IOTPRepository) { }

    async sendOTP(phone: string): Promise<string> {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const ttl = config.OTP_TTL_SECONDS;
        const expiresAt = new Date(Date.now() + ttl * 1000);
        const otp = new OTP(phone, code, expiresAt);

        await this.repository.saveOTP(otp, ttl);

        return code;
    }

    async verifyOTP(phone: string, code: string): Promise<boolean> {
        const stored = await this.repository.getOTP(phone);
        if (!stored) return false;
        if (stored !== code) return false;

        await this.repository.deleteOTP(phone);
        return true;
    }
}