import { IsString } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  role: UserRole;
}
