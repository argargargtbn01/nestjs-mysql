import { SetMetadata } from '@nestjs/common';
import { RawRule } from '@casl/ability';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...requiredPolicies: RawRule[]): any =>
  SetMetadata(CHECK_POLICIES_KEY, requiredPolicies);
