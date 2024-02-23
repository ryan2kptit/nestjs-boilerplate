import { CanActivate, ExecutionContext } from '@nestjs/common';
import { MOCK_USER_WITH_ROLE } from '../../src/api/user/user.constant';

const stubCustomLogger = {
  error: () => ({}),
  log: () => ({}),
  warn: () => ({}),
};

const stubGuard: CanActivate = { canActivate: jest.fn(() => true) };

const stubUserGuard: CanActivate = {
  canActivate: (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = MOCK_USER_WITH_ROLE;
    return true;
  },
};

export { stubCustomLogger, stubGuard, stubUserGuard };
