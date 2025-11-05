import { container } from 'tsyringe';
import { OTPService } from '../application/services/otp.service.js';
import { RedisOTPRepository } from '../infra/repositories/redis-otp.repository.js';
import { getRedisClient } from '../infra/db/redis.client.js';

container.register('RedisClient', {
    useValue: getRedisClient(),
});

container.register('OtpRepository', {
    useClass: RedisOTPRepository,
});

container.register('OtpService', {
    useClass: OTPService,
});

export { container };
