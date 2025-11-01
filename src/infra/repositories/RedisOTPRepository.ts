import type { IOTPRepository } from "../../application/interfaces/IOTPRepository.js";
import { OTP } from "../../domain/entities/OTP.js";
import { getRedisClient } from "../db/redis.client.js";

export class RedisOTPRepository implements IOTPRepository {
    private redis = getRedisClient();

    async saveOTP(otp: OTP, ttl: number): Promise<void> {
        await this.redis.setex(`otp:${otp.phone}`, ttl, otp.code);
    }

    async getOTP(phone: string): Promise<string | null> {
        return await this.redis.get(`otp:${phone}`);
    }

    async deleteOTP(phone: string): Promise<void> {
        await this.redis.del(`otp:${phone}`);
    }
}