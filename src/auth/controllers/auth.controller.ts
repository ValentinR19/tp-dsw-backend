import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO } from '../models/dtos/login-user.dto';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() dto: LoginUserDTO) {
    return this.authService.validateUser(dto);
  }
}
