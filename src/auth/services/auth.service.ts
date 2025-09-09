import { UsersService } from '@main-module/users/services/users.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from '../models/dtos/login-user.dto';
import { IAccessToken } from '../models/interfaces/access-token.interface';
import { IUserPayload } from '../models/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Login principal: devuelve JWT
  async login(credentials: LoginUserDTO): Promise<IAccessToken> {
    const user = await this.validateUser(credentials);

    const payload: IUserPayload = {
      id: user.id,
      username: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      iss: String(process.env.ORIGIN),
      roles: user.roles,
    };

    return this.signToken(payload);
  }

  // Valida usuario y password
  async validateUser(dto: LoginUserDTO) {
    const user = await this.userService.getByUsername(dto.username);

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };
  }

  // Genera JWT
  private async signToken(payload: IUserPayload): Promise<IAccessToken> {
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY, // secreto JWT
        expiresIn: process.env.TOKEN_EXPIRATION || '14d', // fallback válido
      }),
    };
  }
}
