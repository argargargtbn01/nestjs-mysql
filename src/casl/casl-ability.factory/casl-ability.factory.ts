import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ForcedSubject,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { App } from 'firebase-admin/app';
import { Article } from 'src/article/article.entity';
import { Action } from 'src/authorization/enums/action.enum';
import { User } from 'src/user/entities/user.entity';

const actions = ['manage', 'invite'] as const;
const subjects = ['User', 'all'] as const;
type AppAbilities = [
  (typeof actions)[number],
  (typeof subjects)[number] | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>,
];
type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
type PossibleAbilities = [Action, Subjects];
export type AppAbility = MongoAbility<AppAbilities>;
@Injectable()
export class CaslAbilityFactory {
  createForUser(user) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility<[Action, Subjects]>>,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      //   can(Action.Read, 'all'); // read-only access to everything
    }
  }
}
