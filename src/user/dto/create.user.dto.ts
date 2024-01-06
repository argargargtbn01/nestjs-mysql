import { IsOptional, IsString } from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  uid: string;

  @IsOptional()
  @IsString()
  email: string;
}
