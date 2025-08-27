import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '@main-module/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from '../models/dtos/login-user.dto';
import { IAccessToken } from '../models/interfaces/access-token.interface';
import { IPayload } from '../models/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // Login principal: devuelve JWT
  async login(credentials: LoginUserDTO): Promise<IAccessToken> {
    const user = await this.validateUser(credentials);

    const payload: IPayload = {
      id: user.id,
      username: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
    };

    return this.signToken(payload);
  }

  // Valida usuario y password
  async validateUser(dto: LoginUserDTO) {
    const user = await this.userService.getByUsername(dto.username);

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) throw new NotFoundException('User not found');

    // Devolvemos solo los datos necesarios, sin password
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  // Genera JWT
  private async signToken(payload: IPayload): Promise<IAccessToken> {
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'defaultSecret', // secreto JWT
        expiresIn: process.env.TOKEN_EXPIRATION || '14d',   // fallback válido
      }),
    };
  }
}

