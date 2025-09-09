import { LoginUserDTO } from '@main-module/auth/models/dtos/login-user.dto';
import { AuthService } from '@main-module/auth/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // endpoint: /api/auth/login
  async login(@Body() dto: LoginUserDTO) {
    return this.authService.login(dto);
  }
}
