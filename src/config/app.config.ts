import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME || 'JK-TECH-BACKEND-SERVICE',
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain:
    process.env.FRONTEND_DOMAIN || 'http://localhost:3000',
  backendDomain:
    process.env.BACKEND_DOMAIN || 'http://localhost:3001',
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  }));
