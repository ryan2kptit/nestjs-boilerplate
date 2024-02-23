import { DataSource, DeepPartial, DeleteResult, FindOneOptions, FindOptionsWhere, QueryRunner, RelationQueryBuilder, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { TenantBaseAppEntity } from '../entity/app.entity';
import { Inject, Injectable, Type } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ITenancy } from '../tenancy.interface';
import ICRUDBaseRepository from './base.repository.interface';
import { TENANT_CONTEXT } from '../tenancy.constants';
import { Filterable, toQueryable } from '../filter-provider';

type Constructor<I> = new (...args: any[]) => I;

export function CRUDBaseRepository<E extends TenantBaseAppEntity>(entity: Constructor<E>): Type<ICRUDBaseRepository<E>> {
  @Injectable()
  class BaseRepositoryHost extends Repository<E> implements ICRUDBaseRepository<E> {
    private tenantId: string;
    constructor(
      @Inject(TENANT_CONTEXT)
      private readonly tenantContext: ITenancy,
      @InjectDataSource()
      private readonly dataSource: DataSource,
    ) {
      super(entity, dataSource.createEntityManager());
      this.tenantId = this.tenantContext.getTenantId();
    }

    toQueryBuilder(query?: Filterable[]): SelectQueryBuilder<E> {
      const queryBuilder = super.createQueryBuilder().where({
        tenantId: this.tenantId,
        isDeleted: false,
      });

      const subQuery = toQueryable(query);

      if (!subQuery) return queryBuilder;

      return queryBuilder.andWhere(subQuery);
    }

    toQueryBuilderV2(query?: Filterable[], relations?: any): SelectQueryBuilder<E> {
      const queryBuilder = super.createQueryBuilder("entity").where({
        tenantId: this.tenantId,
        isDeleted: false,
      });

      const subQuery = toQueryable(query);

      if (!subQuery) return queryBuilder.leftJoinAndSelect(`entity.${relations}`, relations, `${relations}.isDeleted = false`);

      return queryBuilder.andWhere(subQuery).leftJoinAndSelect(`entity.${relations}`, relations, `${relations}.isDeleted = false`);
    }

    createOne(attrs: DeepPartial<E>): E {
      return super.create({ tenantId: this.tenantId, ...attrs } as unknown as DeepPartial<E>);
    }

    saveOne(attrs: DeepPartial<E>): Promise<E> {
      return super.save({
        tenantId: this.tenantId,
        ...attrs,
      });
    }

    updateOne(criteria: FindOptionsWhere<E>, partialEntity: QueryDeepPartialEntity<E>): Promise<UpdateResult> {
      return super.update(
        {
          tenantId: this.tenantId,
          ...criteria,
          isDeleted: false,
        },
        partialEntity,
      );
    }

    updateMany(criteria: FindOptionsWhere<E>, partialEntity: QueryDeepPartialEntity<E>): Promise<UpdateResult> {
      return super.update(
        {
          tenantId: this.tenantId,
          ...criteria,
          isDeleted: false,
        },
        partialEntity,
      );
    }

    async findMany(criteria?: FindManyOptions<E>): Promise<E[]> {
      return await super.find({
        where: {
          tenantId: this.tenantId,
          ...criteria?.where,
          isDeleted: false,
        },
        take: criteria?.take,
        skip: criteria?.skip,
      } as FindManyOptions<E>);
    }

    findOneByUId(uid: string): Promise<E | null> {
      return super.findOneBy({
        tenantId: this.tenantId,
        uid,
        isDeleted: false,
      } as FindOptionsWhere<E>);
    }

    findOneByUIdRelation(uid: string, relations: any): Promise<E | null> {
      return super.findOne({
        where: {
          tenantId: this.tenantId,
          uid,
          isDeleted: false,
        },
        relations: relations
      } as FindOneOptions<E> );
    }

    async delete(criterial: FindOptionsWhere<E>): Promise<DeleteResult> {
      return await super.update(
        {
          tenantId: this.tenantId,
          ...criterial,
          isDeleted: false,
        },
        { isDeleted: true } as unknown as QueryDeepPartialEntity<E>,
      );
    }

    getQueryBuilder(alias?: string, queryRuner?: QueryRunner): SelectQueryBuilder<E> {
      return super.createQueryBuilder(alias, queryRuner).where({
        tenantId: this.tenantId,
      });
    }
  }

  return BaseRepositoryHost;
}
