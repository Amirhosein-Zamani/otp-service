import type { Request, Response, NextFunction } from 'express';
import { getRedisClient } from '../../infra/db/redis.client.js';
import config from '../../config/config.service.js';

export async function otpRateLimiter(req: Request, res: Response, next: NextFunction) {
    const { phone } = req.body as { phone?: string };
    if (!phone) {
        return res.status(400).json({ error: 'phone is required' });
    }

    const redis = getRedisClient();
    const cooldownSeconds = config.OTP_COOLDOWN_SECONDS;
    const windowSeconds = config.OTP_WINDOW_SECONDS;
    const maxPerWindow = config.OTP_MAX_PER_WINDOW;
    const cooldownKey = `otp:cooldown:${phone}`;
    const windowKey = `otp:count:${phone}`;

    try {
        const remainingCooldown = await redis.ttl(cooldownKey);
        if (remainingCooldown > 0) {
            return res.status(429).json({
                error: `Please wait ${remainingCooldown} seconds before requesting another OTP.`,
                retryAfter: remainingCooldown
            });
        }

        const currentCount = await redis.incr(windowKey);
        if (Number(currentCount) === 1) {
            await redis.expire(windowKey, windowSeconds);
        }

        if (Number(currentCount) > maxPerWindow) {
            const windowTtl = await redis.ttl(windowKey);
            const retryAfterSeconds = windowTtl > 0 ? windowTtl : windowSeconds;
            return res.status(429).json({
                error: `OTP request limit exceeded. Try again in ${Math.ceil(retryAfterSeconds / 60)} minute(s).`,
                retryAfter: retryAfterSeconds
            });
        }

        await redis.setex(cooldownKey, cooldownSeconds, '1');

        return next();
    } catch (err) {

        return next(err);
    }
}
