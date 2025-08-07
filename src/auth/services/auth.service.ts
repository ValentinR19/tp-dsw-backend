import { UsersService } from '@main-module/users/services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginUserDTO } from '../models/dtos/login-user.dto';
import { IAccessToken } from '../models/interfaces/access-token.interface';
import { IPayload } from '../models/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: LoginUserDTO) {
    const user = await this.validateUser(credentials);
    const payload: IPayload = {
      id: user.id,
      username: user.email,
      fullName: `${user.username} ${user.lastName}`,
    };

    return this.signToken(payload);
  }

  async validateUser(dto: LoginUserDTO) {
    const user = await this.userService.getByUsername(dto.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user;
    return result;
  }

  private async signToken(payload: IPayload): Promise<IAccessToken> {
    const signedToken: IAccessToken = {
      token: this.jwtService.sign(payload, { expiresIn: process.env.TOKEN_EXPIRATION }),
    };

    return signedToken;
  }
}
