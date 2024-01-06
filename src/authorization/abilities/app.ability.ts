import { ForcedSubject, MongoAbility, RawRuleOf, createMongoAbility } from '@casl/ability';

const actions = ['manage', 'invite'] as const;
const subjects = ['User', 'all'] as const;
type AppAbilities = [
  (typeof actions)[number],
  (typeof subjects)[number] | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>,
];

export type AppAbility = MongoAbility<AppAbilities>;
export const createAbility = (rules: RawRuleOf<AppAbility>[]) =>
  createMongoAbility<AppAbility>(rules);
