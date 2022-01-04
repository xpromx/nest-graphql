import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(input: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data: input });
  }
}
