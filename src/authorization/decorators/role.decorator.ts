import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...roles: Role[]): any => SetMetadata(ROLES_KEY, roles);
