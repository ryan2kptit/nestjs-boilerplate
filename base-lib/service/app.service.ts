import { Inject, Type } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, RelationQueryBuilder, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TenantBaseAppEntity } from '../entity/app.entity';
import ICRUDBaseRepository from '../repository/base.repository.interface';
import { ICRUDBaseService, PagingRequest, PagingRequestV2 } from './base.service.interface';

export type Constructor<I> = new (...args: any[]) => I;

export function CRUDBaseService<E extends TenantBaseAppEntity>(entityRepository: Constructor<ICRUDBaseRepository<E>>): Type<ICRUDBaseService<E>> {
  class CRUDBaseServiceHost implements ICRUDBaseService<E> {
    constructor(
      @Inject(entityRepository)
      private readonly entityRepository: ICRUDBaseRepository<E>,
    ) {}

    async createOne(createEntityDto: DeepPartial<E>): Promise<E> {
      const entityObj: E = this.entityRepository.createOne(createEntityDto);
      return this.entityRepository.saveOne(entityObj);
    }

    async updateByUID(uid: string, updateEndityDto: QueryDeepPartialEntity<E>): Promise<UpdateResult> {
      const filter = {
        uid,
      };
      return this.entityRepository.updateOne(filter as unknown as FindOptionsWhere<E>, updateEndityDto);
    }

    async fineOneByUID(uid: string): Promise<E> {
      return this.entityRepository.findOneByUId(uid);
    }

    async findOneByUIdRelation(uid: string, relations: any): Promise<E> {
      return this.entityRepository.findOneByUIdRelation(uid, relations);
    }

    async getAndPaginate(paginateOptions: PagingRequest): Promise<[E[], number]> {
      const { filters, pagination, sort } = paginateOptions;
      const queryBuilder: SelectQueryBuilder<E> = this.entityRepository
        .toQueryBuilder(filters)
        .orderBy(`"${sort.field}"`, sort.order, 'NULLS LAST')
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit);

      return queryBuilder.getManyAndCount();
    }

    async deleteOne(uid: string): Promise<UpdateResult> {
      const filter = {
        uid,
        isDeleted: false,
      };
      return this.entityRepository.updateOne(filter as unknown as FindOptionsWhere<E>, { isDeleted: true } as unknown as QueryDeepPartialEntity<E>);
    }

    async getAndPaginateV2(paginateOptions: PagingRequestV2): Promise<[E[], number]> {
      const { filters, pagination, sort, relations } = paginateOptions;
      const queryBuilder: SelectQueryBuilder<E> = this.entityRepository
        .toQueryBuilderV2(filters, relations)
        // .orderBy(`"${sort.field}"`, sort.order, 'NULLS LAST')
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit);

      return queryBuilder.getManyAndCount();
      // return [records, records.length]
    }

    async getList(paginateOptions: PagingRequestV2): Promise<[E[], number]> {
      const { filters, pagination, sort, relations } = paginateOptions;
      const queryBuilder: SelectQueryBuilder<E> = this.entityRepository
        .toQueryBuilderV2(filters, relations)
        // .orderBy(`"${sort.field}"`, sort.order, 'NULLS LAST')

      return queryBuilder.getManyAndCount();
      // return [records, records.length]
    }
  }

  return CRUDBaseServiceHost;
}
