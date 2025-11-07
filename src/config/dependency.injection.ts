import "reflect-metadata";
import { container } from "tsyringe";
import { IOTPRepository } from "../application/interfaces/otp-repository.interface.js";
import { RedisOTPRepository } from "../infra/repositories/redis-otp.repository.js";
import { OTPService } from "../application/services/otp.service.js";
import { OTPController } from "../presentation/controllers/otp.controller.js";

container.register<IOTPRepository>("IOTPRepository", {
  useClass: RedisOTPRepository,
});

container.registerSingleton(OTPService, OTPService);
container.registerSingleton(OTPController, OTPController);

export { container };
