import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserResolver } from './user.resolvers';
import { UserService } from './user.service';
import { UniqueEmail } from './validations/unique-email.validation';

@Module({
  imports: [],
  controllers: [],
  providers: [UserResolver, UserService, PrismaService, UniqueEmail],
})
export class UserModule {}
