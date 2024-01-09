import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { Role } from './entities/role.entity';
import { Policy } from './entities/policy.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Policy)
    private readonly policyRepo: Repository<Policy>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }
  async findById(uid: string): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        uid,
      },
    });
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async findUserRoleAndPermission(uid: string): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        uid,
      },
      relations: ['roles', 'roles.policies'],
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
    return await this.userRepo.save(createUserDto);
  }

  async delete(uid: string): Promise<void> {
    await this.userRepo.delete(uid);
  }
}
