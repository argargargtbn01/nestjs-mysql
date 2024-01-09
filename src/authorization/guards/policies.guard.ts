import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY, CustomRule } from '../decorators/check-policies';
import {
  AbilityBuilder,
  ExtractSubjectType,
  ForbiddenError,
  InferSubjects,
  MongoAbility,
  PureAbility,
  RawRule,
  createMongoAbility,
} from '@casl/ability';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Article } from 'src/aritcle/entities/aritcle.entity';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';

export type Subjects = InferSubjects<typeof User | typeof Article> | 'all';
@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPolicies =
      this.reflector.get<CustomRule[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();
    const userWithRolesAndPermissions = await this.userService.findUserRoleAndPermission(user.uid);
    const a = new AbilityBuilder(createMongoAbility);
    const { can, build } = a;
    userWithRolesAndPermissions.roles.forEach((role) => {
      role.policies.forEach((policy) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        a.can(policy.action, policy.subject, { private: 'true' });
      });
    });
    const ability: PureAbility = a.build({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
    const isAllowed = requiredPolicies.every((policy) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return ability.can(policy.action, policy.subject);
    });

    if (!isAllowed) {
      throw new ForbiddenException();
    }
    return true;
  }
}
