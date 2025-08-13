import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../models/classes/user.entity';

@Injectable()
export class UserRepository {
  //Inyeccion de TypeORM Repository.
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async findActiveUsers(): Promise<User[]> {
    return await this.repository.find({ where: { active: true } });
  }

  async findById(id: number): Promise<User> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username: username } });
  }

  async save(user: DeepPartial<User>): Promise<User> {
    return this.repository.save(user);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
