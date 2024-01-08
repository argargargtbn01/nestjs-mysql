import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { PoliciesGuard } from './guards/policies.guard';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, PoliciesGuard],
})
export class AuthorizationModule {}
