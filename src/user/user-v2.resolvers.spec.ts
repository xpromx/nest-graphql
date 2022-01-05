import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserResolver } from './user.resolvers';
import { UserService } from './user.service';

const users = [
  {
    firstName: 'Alice',
    lastName: 'Wonderland',
    email: 'alice@gmail.com',
  },
  {
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'harry@gmail.com',
  },
  {
    firstName: 'Rodrigo',
    lastName: 'Ramirez',
    email: 'rodrigo@gmail.com',
  },
];

describe('UserResolver: v2', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserResolver, PrismaService, UserService],
    }).compile();

    resolver = moduleRef.get<UserResolver>(UserResolver);
    const prisma = moduleRef.get<PrismaService>(PrismaService);
    await prisma.$executeRawUnsafe('DELETE FROM "User";');
    await prisma.$executeRawUnsafe(
      'DELETE FROM sqlite_sequence where name="User"',
    );

    for (const user of users) {
      await prisma.user.create({ data: user });
    }
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('userById', () => {
    it('should get the user', async () => {
      expect(await resolver.userById(1)).toMatchObject(users[0]);
    });
  });

  describe('users', () => {
    it('should get all users', async () => {
      expect(await resolver.users()).toMatchObject(users);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const input = {
        firstName: 'Test',
        lastName: 'Demo',
        email: 'test@gmail.com',
      };
      expect(await resolver.createUser(input)).toMatchObject(input);
    });
  });
});
