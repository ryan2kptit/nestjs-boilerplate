import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../src/api/auth/guards/jwt.guard';
import { MOCK_USER, MOCK_USER_WITH_ROLE } from '../src/api/user/user.constant';
import { UserEntity } from '../src/api/user/user.entity';
import { UserModule } from '../src/api/user/user.module';
import { RoleEntity } from '../src/api/role/role.entity';
import { stubUserGuard } from './stubs';

describe('User', () => {
  let appSuccess: INestApplication;
  let appFailure: INestApplication;
  const userService = {
    getByEmail: () => MOCK_USER_WITH_ROLE,
  };
  const mockedRepo = {
    findOne: jest.fn((id) => Promise.resolve(MOCK_USER_WITH_ROLE)),
    findOneBy: jest.fn((id) =>
      Promise.resolve({
        ...MOCK_USER,
        password:
          '$2b$12$VaegMcM07WIGh5ePNKydPuURhhzr6F5rFfuBz2BtkO.Ut.1PNDRbK',
        save: () => true,
      }),
    ),
    save: jest.fn((id) => Promise.resolve(true)),
    count: jest.fn((params) => Promise.resolve(1)),
    countBy: jest.fn((params) => Promise.resolve(1)),
    update: jest.fn((params) => Promise.resolve(true)),
    findAndCount: jest.fn((params) => Promise.resolve([MOCK_USER, 1])),
  };

  beforeAll(async () => {
    const moduleUserSuccess = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(stubUserGuard)
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockedRepo)
      .overrideProvider(getRepositoryToken(RoleEntity))
      .useValue({})
      .compile();

    const moduleUserFail = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(stubUserGuard)
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockedRepo)
      .overrideProvider(getRepositoryToken(RoleEntity))
      .useValue({})
      .compile();

    appSuccess = moduleUserSuccess.createNestApplication();
    appFailure = moduleUserFail.createNestApplication();
    appFailure.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await appSuccess.init();
    await appFailure.init();
  });

  it(`/GET users/info`, () => {
    return request(appSuccess.getHttpServer())
      .get('/users/info')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(userService.getByEmail());
  });

  it(`/PATCH users/change-password`, () => {
    return request(appSuccess.getHttpServer())
      .patch('/users/change-password')
      .set('Accept', 'application/json')
      .send({
        oldPassword: 'abcd1234',
        newPassword: '@abcd1234',
        confirmPassword: '@abcd1234',
      })
      .expect(204);
  });

  it(`/PATCH users/change-password error`, () => {
    return request(appFailure.getHttpServer())
      .patch('/users/change-password')
      .set('Accept', 'application/json')
      .send({
        oldPassword: 'abcd1111',
        newPassword: '@abcd1234',
        confirmPassword: 'abcd1234',
      })
      .expect(400)
      .expect({ message: 'Password does not match', code: 'us00005' });
  });

  afterAll(async () => {
    await appSuccess.close();
    await appFailure.close();
  });
});
