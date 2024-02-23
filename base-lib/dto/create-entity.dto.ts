import { ValidationError } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { TenantBaseAppEntity } from '../entity/app.entity';

export interface ICreateEntityDto<E extends TenantBaseAppEntity> {
  mapToEntity(): DeepPartial<E>;
  validate(): Promise<ValidationError[]>;
}
