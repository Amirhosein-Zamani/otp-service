import { injectable } from 'tsyringe';
import type { IOTPRepository } from "../../application/interfaces/otp-repository.interface.js";
import { OTP } from "../../domain/entities/otp.entity.js";
import { getRedisClient } from "../db/redis.client.js";

@injectable()
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