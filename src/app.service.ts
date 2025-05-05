import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, World!';
  }

  getStatus(): { status: string; timestamp: Date } {
    return {
      status: 'OK',
      timestamp: new Date(),
    };
  }
}
