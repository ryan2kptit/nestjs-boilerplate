import { PaginationOptionsDto, PagingOrder, PagingSort } from '../dto';
import { DeepPartial, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TenantBaseAppEntity } from '../entity/app.entity';
import { Filterable } from '../filter-provider';

export type FindOneCondition = {
  uid: string;
  tenantId?: string;
};

export interface PagingRequest {
  filters: Filterable[];
  pagination: PaginationOptionsDto;
  sort: PagingSort;
}

export interface PagingRequestV2 {
  filters: Filterable[];
  pagination: PaginationOptionsDto;
  sort: PagingSort;
  relations: any
}

export class PagingRequestDto implements PagingRequest {
  filters: Filterable[];
  pagination: PaginationOptionsDto;
  sort: PagingSort;

  constructor() {
    this.filters = [];
    this.pagination = new PaginationOptionsDto();
    this.sort = {
      field: 'updatedAt',
      order: PagingOrder.DESC,
    };
  }
}

export class PagingRequestDtoV2 implements PagingRequestV2 {
  filters: Filterable[];
  pagination: PaginationOptionsDto;
  sort: PagingSort;
  relations: any;

  constructor() {
    this.filters = [];
    this.pagination = new PaginationOptionsDto();
    this.sort = {
      field: 'updatedAt',
      order: PagingOrder.DESC,
    };
    this.relations = []
  }
}

export interface ICRUDBaseService<E extends TenantBaseAppEntity> {
  createOne(data: DeepPartial<E>): Promise<E>;
  updateByUID(uid: string, data: QueryDeepPartialEntity<E>): Promise<UpdateResult>;
  fineOneByUID(uid: string): Promise<E>;
  getAndPaginate(paginateOption?: PagingRequest): Promise<[E[], number]>;
  deleteOne(uid: string): Promise<UpdateResult>;
  getAndPaginateV2(paginateOption?: PagingRequestDtoV2): Promise<[E[], number]>;
  getList(paginateOption?: PagingRequestDtoV2): Promise<[E[], number]>;
  findOneByUIdRelation(uid: string, relations: any): Promise<E>
}
