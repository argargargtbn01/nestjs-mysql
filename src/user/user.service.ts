import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }
  async findById(uid: string): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        uid,
      },
      relations: ['role'],
    });
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const uid = createUserDto.uid;
    const user = await this.userRepo.findOne({
      where: {
        uid,
      },
    });
    if (user) {
      return user;
    }
    createUserDto['role'] = 2; // NEED TO FIX
    return await this.userRepo.save(createUserDto);
  }

  async delete(uid: string): Promise<void> {
    await this.userRepo.delete(uid);
  }
}
