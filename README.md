# 🔐 OTP Service (Node.js + Redis + Clean Architecture)

This project is a **modular OTP (One-Time Password) microservice** built with **Node.js**, **Express**, **TypeScript**, **Redis**, and **Clean Architecture** principles. It is **Docker-ready** and designed for scalability, testability, and maintainability.

---

## 🧱 Architecture Overview

- **Domain Layer:** Core business logic (`otp.entity.ts`) and domain rules.  
- **Application Layer:** Service interfaces (`otp-repository.interface.ts`) and business use-cases (`otp.service.ts`).  
- **Infrastructure Layer:** Redis repository (`redis-otp.repository.ts`), Mongo/Redis clients, and utility functions.  
- **Presentation Layer:** Express routes (`otp.routes.ts`), controllers (`otp.controller.ts`), middleware, and API helpers.  
- **Config Layer:** Dependency injection (`dependency.injection.ts`) and environment-based configuration (`config.service.ts`).

**Folder structure:**

---

## ⚡ Features

✅ OTP generation and verification  
✅ Rate limiting per phone number using Redis  
✅ Configurable OTP TTL, cooldown, max requests, and time window  
✅ Standardized API responses using a centralized helper  
✅ Clean Architecture with Dependency Injection via **Tsyringe**  
✅ Strictly typed with TypeScript  
✅ Async Redis operations with proper error handling  
✅ Docker-ready (multi-stage build for production)  
✅ Environment variable-based configuration  

---

## ⚙️ Environment Variables

| Variable | Description | Example |
|-----------|--------------|----------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `REDIS_HOST` | Redis hostname | `redis` |
| `REDIS_PORT` | Redis port | `6379` |
| `OTP_TTL_SECONDS` | OTP validity duration | `120` |
| `OTP_COOLDOWN_SECONDS` | Time between OTP requests | `60` |
| `OTP_MAX_PER_WINDOW` | Max OTPs allowed in a time window | `10` |
| `OTP_WINDOW_SECONDS` | Duration of OTP window in seconds | `3600` |

---

## 🧰 Technologies

- Node.js 22+  
- Express.js  
- TypeScript (strict mode)  
- Redis (caching and rate limiting)  
- Tsyringe (Dependency Injection)  
- Docker & Docker Compose  
- dotenv  

---

  ## 🚀 Run with Docker

```yaml
run:
  "### Build and Start": "docker-compose up --build"
  "### Stop and Remove": "docker-compose down"

---
## 🖋️ Author
