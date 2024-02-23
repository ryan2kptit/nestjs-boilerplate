import { SetMetadata } from '@nestjs/common';
import { PERMISSION_METADATA } from '../common/app.const';

export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSION_METADATA, permissions);
