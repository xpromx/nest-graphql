import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserResolver } from './user.resolvers';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserResolver,
        PrismaService,
        {
          provide: UserService,
          useFactory: async () => ({
            findOneById: jest.fn((id: number) => ({
              id,
            })),
            findAll: jest.fn(() => [{ id: 1 }, { id: 2 }]),
            create: jest.fn((input) => ({ id: 1, ...input })),
          }),
        },
      ],
    }).compile();

    resolver = moduleRef.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('userById', () => {
    it('should get the user', async () => {
      expect(await resolver.userById(1)).toEqual({
        id: 1,
      });
    });
  });

  describe('users', () => {
    it('should get all users', async () => {
      expect(await resolver.users()).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const input = {
        firstName: 'Rodrigo',
        lastName: 'Ramirez',
        email: 'rodrigo@gmail.com',
      };
      expect(await resolver.createUser(input)).toEqual({ id: 1, ...input });
    });
  });
});
