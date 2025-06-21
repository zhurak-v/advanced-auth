import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '..', 'configs', `.${process.env.NODE_ENV}.env`)
    }),
    AuthModule,
    UserModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}