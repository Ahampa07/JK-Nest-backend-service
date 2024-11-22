import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET || 'secret',
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN || 1800
}));