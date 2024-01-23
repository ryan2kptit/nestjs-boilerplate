import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['tenantId', 'uid'])
export class TenantBaseAppEntity extends BaseEntity {
  @Column({ name: 'tenantId', type: 'uuid' })
  tenantId: string;
}
