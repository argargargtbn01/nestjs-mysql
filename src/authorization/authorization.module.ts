import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { RolesGuard } from './guards/role.guard';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, RolesGuard],
})
export class AuthorizationModule {}
