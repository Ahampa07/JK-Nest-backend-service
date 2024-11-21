import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi there! the nest js backend service is up and running in watch mode';
  }
}
