import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [],
})
export class AppModule {}
