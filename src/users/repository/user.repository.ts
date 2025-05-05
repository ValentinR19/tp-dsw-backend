import { Repository } from 'typeorm';
import { User } from '../models/entities/user.entity';

export class UserRepository extends Repository<User> {
  // Methods for specific consults
  async findActiveUsers(): Promise<User[]> {
    return this.find({ where: { active: true } });
  }
}
