import { Profile } from '@/modules/user/interfaces/profile.interface';
import { Account } from '@/modules/user/interfaces/account.interface';

export interface User {
  full_name: string;
  email: string;
  password: string;

  is_verified?: boolean;
  is_two_factor_enabled?: boolean;
}
