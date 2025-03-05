import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;
  let ownerId = '';
  const ownersName = 'John Doe';
  const ownersEmail = 'john@example.com';
  const adminUserRoleHeader = { 'x-user-role': 'admin' };
  const vetUserRoleHeader = { 'x-user-role': 'vet' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Test owners endpoint', () => {
    it('/owners should return status code 403 (POST)', async () => {
      await request(app.getHttpServer())
        .post('/owners')
        .send({ name: ownersName, email: ownersEmail })
        .expect(403);
    });

    it('/owners (POST)', async () => {
      await request(app.getHttpServer())
        .post('/owners')
        .set(adminUserRoleHeader)
        .send({ name: ownersName, email: ownersEmail })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toEqual(ownersName);
          expect(res.body.email).toEqual(ownersEmail);
          ownerId = res.body.id;
        });
    });

    it('/owners (GET) Should return all owners by admin role ', async () => {
      await request(app.getHttpServer())
        .get('/owners')
        .set(adminUserRoleHeader)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });

    it('/owners (GET) Should return all owners by vet role ', async () => {
      await request(app.getHttpServer())
        .get('/owners')
        .set(vetUserRoleHeader)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });

    it('/owners (GET) Should return status code 403 ', async () => {
      await request(app.getHttpServer()).get('/owners').expect(403);
    });
  });
  describe('Test Card', () => {
    it('/horses Create new horse (POST)', async () => {
      await request(app.getHttpServer())
        .post(`/horses`)
        .set(adminUserRoleHeader)
        .send({
          name: 'Spirit',
          age: 7,
          breed: 'persian',
          healthStatus: 'healthy',
          owner: ownerId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Spirit');
        });
    });
  });
});
