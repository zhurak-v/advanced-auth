import { Injectable } from '@nestjs/common';
import { User, Prisma } from 'prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BaseRepository } from '@/common/repository/base.repository';

type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    profile: true;
    accounts: true;
  };
}>;

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserFindUniqueArgs,
  Prisma.UserFindManyArgs,
  Prisma.UserCreateArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserDeleteArgs,
  Prisma.UserCountArgs,
  Prisma.UserUpsertArgs,
  Prisma.UserDelegate
> {
  constructor(prisma: PrismaService) {
    super(prisma.user);
  }

  public async findByEmail(email: string): Promise<UserWithRelations | null> {
    return this.model.findUnique({
      where: { email },
      include: {
        profile: true,
        accounts: true,
      },
    }) as Promise<UserWithRelations | null>;
  }
}
