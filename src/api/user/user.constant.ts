import { IUserPayload } from 'src/share/common/app.interface';
import { swaggerSchemaExample } from '../../share/utils/swagger_schema';

export const USER_CONST = {
  MODEL_NAME: 'user',
};

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export const MOCK_USER: IUserPayload = {
  id: '1',
  createdAt: '2023-02-24T01:01:18.077Z',
  updatedAt: '2023-03-01T21:29:20.257Z',
  name: 'Dong Nguyen',
  email: 'dongnq@gmail.com',
  status: 1,
  createdBy: null,
  phone: null,
  lastLogin: '2023-03-02T04:29:20.000Z',
};

export const MOCK_USER_WITH_ROLE: IUserPayload = {
  ...MOCK_USER
};

export const USER_SWAGGER_RESPONSE = {
  GET_LIST_SUCCESS: swaggerSchemaExample(
    {
      data: [MOCK_USER],
      total: 1,
      page: 1,
      pageSize: 20,
      totalPage: 1,
    },
    'List success',
  ),
  UPDATE_SUCCESS: swaggerSchemaExample('', 'Update success'),
  GET_SUCCESS: swaggerSchemaExample(MOCK_USER_WITH_ROLE, 'Get success'),
};
