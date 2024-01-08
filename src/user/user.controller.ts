import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/authorization/enums/action.enum';
import { CheckPolicies } from 'src/authorization/decorators/check-policies';
import { FirebaseAuthGuard } from 'src/authentication/guard/firebase-auth.guard';
import { PoliciesGuard } from 'src/authorization/guards/policies.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':uid')
  async findById(@Param('uid') uid: string): Promise<User> {
    return this.userService.findById(uid);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard, PoliciesGuard)
  @CheckPolicies({ action: Action.Create, subject: 'User' })
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    // const user = {
    //   uid: '1',
    //   email: 'test',
    //   role: { name: 'admin' },
    //   creationDate: new Date(),
    //   lastModificationDate: new Date(),
    // };
    // const ability = this.caslAbilityFactory.createForUser(user);
    // const isAllowed = ability.can(Action.Create, User);
    // console.log(isAllowed);
    // return isAllowed;
    return this.userService.create(createUserDto);
  }

  @Delete(':uid')
  async delete(@Param('uid') uid: string): Promise<void> {
    return this.userService.delete(uid);
  }
}
