import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET || '75749eab10434adc3446faed4ef3e659',
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN || 1800
}));