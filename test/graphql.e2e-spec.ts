import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { gql } from 'graphql-tag';
import { DocumentNode } from 'graphql';

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

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const prisma = moduleRef.get<PrismaService>(PrismaService);
    await prisma.$executeRawUnsafe('DELETE FROM "User";');
    await prisma.$executeRawUnsafe(
      'DELETE FROM sqlite_sequence where name="User"',
    );

    for (const user of users) {
      await prisma.user.create({ data: user });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  const query = (doc: DocumentNode) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: doc.loc && doc.loc.source.body });
  };

  describe('/graphql', () => {
    describe('userById', () => {
      it('should get the user', () => {
        return query(
          gql`
            {
              userById(id: 1) {
                id
                firstName
                lastName
                email
              }
            }
          `,
        )
          .expect(200)
          .expect((res) => {
            expect(res.body.data.userById).toMatchObject(users[0]);
          });
      });
    });
    describe('users', () => {
      it('should get all users', () => {
        return query(
          gql`
            {
              users {
                id
                firstName
                lastName
                email
              }
            }
          `,
        )
          .expect(200)
          .expect((res) => {
            expect(res.body.data.users).toMatchObject(users);
          });
      });
    });
    describe('createUser', () => {
      it('should create a user', () => {
        const input = {
          firstName: 'Test',
          lastName: 'Demo',
          email: 'test@gmail.com',
        };
        return query(
          gql`
            mutation createUser{
              createUser(
                input: {
                  firstName: "${input.firstName}"
                  lastName: "${input.lastName}"
                  email: "${input.email}"
                }
              ) {
                id
                firstName
                lastName
                email
              }
            }
          `,
        )
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createUser).toMatchObject(input);
          });
      });
    });
  });
});
