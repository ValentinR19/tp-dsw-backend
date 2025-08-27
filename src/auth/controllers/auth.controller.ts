import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO } from '../models/dtos/login-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login') // endpoint: /api/auth/login
  async login(@Body() dto: LoginUserDTO) {
    // Llamamos al método login del AuthService que genera el JWT
    return this.authService.login(dto);
  }
}

