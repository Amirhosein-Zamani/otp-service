import { OTP } from "../../domain/entities/OTP.js";

export interface IOTPRepository {
    saveOTP(otp: OTP, ttl: number): Promise<void>;
    getOTP(phone: string): Promise<string | null>;
    deleteOTP(phone: string): Promise<void>;
}