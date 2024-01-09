import { Module } from '@nestjs/common';
import { AritcleService } from './aritcle.service';
import { AritcleController } from './aritcle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/aritcle.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UserModule],
  controllers: [AritcleController],
  providers: [AritcleService],
})
export class AritcleModule {}
