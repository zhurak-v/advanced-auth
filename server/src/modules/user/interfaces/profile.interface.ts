import { Sex } from '@/modules/user/interfaces/sex.enum';

export interface Profile {
  id: string;
  user_id: string;

  nickname?: string | null;
  phone?: string | null;

  birth_date?: Date | null;
  bio?: string | null;
  avatar?: string | null;
  sex?: Sex | null | undefined;
}
