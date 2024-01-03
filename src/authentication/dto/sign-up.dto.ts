import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/user/user.entity';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: string;
}
