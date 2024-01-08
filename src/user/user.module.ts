import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CaslModule } from 'src/casl/casl.module';
// import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
