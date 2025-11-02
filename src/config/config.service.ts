import dotenv from 'dotenv';
import path from 'path';

type ConfigSchema = {
    NODE_ENV: string;
    PORT: number;
    REDIS_HOST: string;
    REDIS_PORT: number;
    OTP_TTL_SECONDS: number;
    OTP_COOLDOWN_SECONDS: number;
    OTP_MAX_PER_WINDOW: number;
    OTP_WINDOW_SECONDS: number;
    USE_MONGO: boolean;
};

class ConfigService {
    private readonly env: NodeJS.ProcessEnv;

    constructor() {
        const envPath = path.resolve(process.cwd(), '.env');
        dotenv.config({ path: envPath });
        this.env = process.env;
        this.validate();
    }

    private validate() {
        const required = [
            'REDIS_HOST',
            'REDIS_PORT',
        ];
        const missing = required.filter((k) => !this.env[k]);
        if (missing.length > 0) {
            throw new Error(`Missing required ENV variables: ${missing.join(', ')}`);
        }
    }

    get NODE_ENV(): string {
        return this.env.NODE_ENV ?? 'development';
    }
    get PORT(): number {
        return Number(this.env.PORT ?? 3000);
    }
    get REDIS_HOST(): string {
        return this.env.REDIS_HOST ?? '127.0.0.1';
    }
    get REDIS_PORT(): number {
        return Number(this.env.REDIS_PORT ?? 6379);
    }
    get OTP_TTL_SECONDS(): number {
        return Number(this.env.OTP_TTL_SECONDS ?? 120);
    }
    get OTP_COOLDOWN_SECONDS(): number {
        return Number(this.env.OTP_COOLDOWN_SECONDS ?? 60);
    }
    get OTP_MAX_PER_WINDOW(): number {
        return Number(this.env.OTP_MAX_PER_WINDOW ?? 3);
    }
    get OTP_WINDOW_SECONDS(): number {
        return Number(this.env.OTP_WINDOW_SECONDS ?? 3600); // 1 hour
    }
    get USE_MONGO(): boolean {
        return (this.env.USE_MONGO ?? 'false') === 'true';
    }
}

const configService = new ConfigService();
export default configService;
export type { ConfigSchema };
