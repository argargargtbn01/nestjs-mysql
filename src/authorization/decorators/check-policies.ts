import { SetMetadata } from '@nestjs/common';
import { RawRule } from '@casl/ability';

export const CHECK_POLICIES_KEY = 'check_policy';
export interface CustomRule {
  action: string;
  subject: string;
  conditions?: any;
  fields?: string[];
}
export const CheckPolicies = (...requiredPolicies: CustomRule[]): any =>
  SetMetadata(CHECK_POLICIES_KEY, requiredPolicies);
