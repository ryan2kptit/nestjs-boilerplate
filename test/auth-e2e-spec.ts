import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthModule } from '../src/api/auth/auth.module';
import { AuthService } from '../src/api/auth/auth.service';
import { JWT_CONFIG } from '../src/configs/constant.config';
import { MOCK_USER_WITH_ROLE } from '../src/api/user/user.constant';
import { UserEntity } from '../src/api/user/user.entity';
import { UserModule } from '../src/api/user/user.module';
import { UserService } from '../src/api/user/user.service';
import { RoleEntity } from '../src/api/role/role.entity';

describe('Auth', () => {
  let appSuccess: INestApplication;
  let appFailure: INestApplication;
  const authService = {
    login: () => ({
      accessToken: 'xxxxx',
      accessTokenExpire: JWT_CONFIG.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      refreshToken: 'yyyyy',
      refreshTokenExpire: JWT_CONFIG.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      isFirstTimeLogin: false,
    }),
  };
  const mockedRepo = {
    findOne: jest.fn((id) =>
      Promise.resolve({
        ...MOCK_USER_WITH_ROLE,
        password:
          '$2b$12$VaegMcM07WIGh5ePNKydPuURhhzr6F5rFfuBz2BtkO.Ut.1PNDRbK',
        save: () => true,
      }),
    ),
    save: jest.fn((id) => Promise.resolve(true)),
  };

  const mockUserService = {
    setCurrentRefreshToken: jest.fn((token: string) => Promise.resolve(true)),
  };

  beforeAll(async () => {
    const moduleAuthSuccess = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, UserModule],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockedRepo)
      .overrideProvider(getRepositoryToken(RoleEntity))
      .useValue({})
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    const moduleAuthFail = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, UserModule],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockedRepo)
      .overrideProvider(getRepositoryToken(RoleEntity))
      .useValue({})
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    appSuccess = moduleAuthSuccess.createNestApplication();
    appFailure = moduleAuthFail.createNestApplication();
    appFailure.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await appSuccess.init();
    await appFailure.init();
  });

  it(`/POST login`, () => {
    return request(appSuccess.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'ngochuynh1991@gmail.com',
        password: 'abcd1234',
      })
      .expect(200)
      .expect(authService.login());
  });

  it(`/POST login error`, () => {
    return request(appFailure.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'ngochuynh1991',
        password: 'abcd1234',
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['email must be an email'],
        error: 'Bad Request',
      });
  });

  it(`/POST login, password is invalid`, () => {
    return request(appFailure.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'ngochuynh1991@gmail.com',
        password: 'abcd',
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Username or password is invalid!',
        error: 'Bad Request',
      });
  });

  afterAll(async () => {
    await appSuccess.close();
    await appFailure.close();
  });
});
