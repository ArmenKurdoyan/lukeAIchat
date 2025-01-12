import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['chats'] });
  }

  async checkUserExists(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: +userId } });
    return !!user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
