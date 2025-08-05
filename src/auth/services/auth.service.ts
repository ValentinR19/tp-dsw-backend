import { UsersService } from '@main-module/users/services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users-module/models/entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: { username: string; password: string }) {
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

  async login(user: Partial<User>) {
    const payload = { sub: user.id, username: user.userName };
    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }
}
