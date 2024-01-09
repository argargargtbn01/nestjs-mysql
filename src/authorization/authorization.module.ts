import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { PoliciesGuard } from './guards/policies.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, PoliciesGuard],
})
export class AuthorizationModule {}
