import { AccountProvider } from '@/modules/user/interfaces/account-provider.enum'

export interface Account {
  id: string;
  user_id: string;
  provider: AccountProvider;
  provider_account_id: string;
  refresh_token?: string | null;
}
