import { TenantBaseAppEntity } from '../entity/app.entity';
export type ViewDtoContructor<E extends TenantBaseAppEntity> = new (data: E) => {
  //
};
