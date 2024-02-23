import { Filterable } from '../filter-provider';
import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, QueryRunner, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export default interface ICRUDBaseRepository<E> extends Repository<E> {
  createOne(entityLike: DeepPartial<E>): E;
  saveOne(entity: E): Promise<E>;
  updateOne(criteria: FindOptionsWhere<E>, partialEntity: QueryDeepPartialEntity<E>): Promise<UpdateResult>;
  findMany(options?: FindManyOptions<E>): Promise<E[]>;
  findOneByUId(uid: string): Promise<E | null>;
  delete(criteria: FindOptionsWhere<E>): Promise<DeleteResult>;
  toQueryBuilder(filters?: Filterable[]): SelectQueryBuilder<E>;
  getQueryBuilder(alias?: string, queryRuner?: QueryRunner): SelectQueryBuilder<E>;
  toQueryBuilderV2(filters?: Filterable[], relations?: any): SelectQueryBuilder<E>;
  findOneByUIdRelation(uid: string, relations: any): Promise<E | null>;
}
