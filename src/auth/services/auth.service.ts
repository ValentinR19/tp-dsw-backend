import { UsersService } from '@main-module/users/services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './src/users/models/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private jwtService: JwtService) { }


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
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }
}
