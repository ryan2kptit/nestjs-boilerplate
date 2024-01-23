import { Body, Delete, Get, HttpException, Param, Post, Put, Query, Type } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ICRUDBaseService, PagingRequest, PagingRequestDto, PagingRequestDtoV2, PagingRequestV2 } from '../service/base.service.interface';
import { TenantBaseAppEntity } from '../entity/app.entity';
import { ICRUDBaseController } from './base.controller.interface';
import { Constructor } from '../service/app.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ICreateEntityDto } from '../dto/create-entity.dto';
import { ViewDtoContructor } from '../dto/view-entity.dto';
import { UtilService } from '../util.service';
import { GetDetailRelation, PaginationDto, PaginationDtoParams } from '../dto';
import { FilterLogic, FilterOperator } from '../filter-provider';

export function CRUDBaseController<E extends TenantBaseAppEntity>(
  createDto: Constructor<ICreateEntityDto<E>>,
  updateDto: Constructor<ICreateEntityDto<E>>,
  viewDto: ViewDtoContructor<E>,
  entity: Constructor<E>,
): Type<ICRUDBaseController<E>> {
  class CRUDBaseControllerHost implements ICRUDBaseController<E> {
    constructor(private readonly appService: ICRUDBaseService<E>, private readonly utilService: UtilService) {}

    @Post()
    @ApiBody({ type: createDto })
    @ApiOperation({ summary: `Create new entity` })
    async create(@Body() createEntityDto: Record<keyof ICreateEntityDto<E>, unknown>): Promise<Record<keyof ViewDtoContructor<E>, unknown>> {
      const requestDto = new createDto(createEntityDto);
      // const errors = await requestDto.validate();
      // if (errors.length > 0) throw new HttpException('INVALID_INPUT', 400000);
      return this.appService.createOne(requestDto.mapToEntity()).then((entity: E) => {
        return new viewDto(entity);
      });
    }

    @Get('/paging')
    @ApiOperation({ summary: 'Find all' })
    @ApiQuery({
      name: 'filter',
      required: false,
    })
    async getAndPaging(@Query('filter') _filter: string): Promise<PaginationDto<E>> {
      const filterObject: PagingRequest = new PagingRequestDto();
      try {
        if (_filter && _filter !== '') {
          const { filters, pagination, sort }: PagingRequest = JSON.parse(_filter);
          if (filters) filterObject.filters = filters;
          if (pagination) filterObject.pagination = pagination;
          if (sort) filterObject.sort = sort;
        }
      } catch (error) {
        throw new HttpException('INVALID_INPUT', 400000);
      }
      return this.appService.getAndPaginate(filterObject as PagingRequest).then(([records, total]) => {
        return new PaginationDto(
          records.map((record: E) => new viewDto(record)),
          {
            paginationOptionsDto: filterObject.pagination,
            totalItem: total,
          } as unknown as PaginationDtoParams,
        );
      });
    }

    @Get('/dynamic/fields')
    getProperties() {
      const columns = UtilService.getEntities()[entity.name];
      const searchables = columns.reduce((acc, item) => (item.searchable ? [...acc, item.searchable] : acc), []);
      const arr = [];

      for (const key in FilterOperator) {
        arr.push({ key: key, value: FilterOperator[key] });
      }

      return {
        columns,
        searchables,
        operators: arr,
        logics: Object.values(FilterLogic),
      };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find by Id' })
    async findById(@Param('id') id: string): Promise<Record<keyof ViewDtoContructor<E>, unknown>> {
      return this.appService.fineOneByUID(id).then((entity: E) => {
        return new viewDto(entity);
      });
    }

    @Put(':id')
    @ApiBody({ type: updateDto })
    @ApiOperation({ summary: 'Update' })
    async update(
      @Param('id') id: string,
      @Body()
      updateEntityDto: Partial<Record<keyof ICreateEntityDto<E>, unknown>>,
    ) {
      const requestDto = new updateDto(updateEntityDto);
      // const errors = await requestDto.validate();
      // if (errors.length > 0) throw new HttpException('INVALID_INPUT', 400000);
      return this.appService.updateByUID(id, requestDto.mapToEntity() as QueryDeepPartialEntity<E>);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete' })
    async delete(@Param('id') id: string) {
      return this.appService.deleteOne(id);
    }

    @Get('/paging/v2')
    @ApiOperation({ summary: 'Find all' })
    @ApiQuery({
      name: 'filter',
      required: false,
    })
    async getAndPagingV2(@Query('filter') _filter: string): Promise<PaginationDto<E>> {
      const filterObject: PagingRequestV2 = new PagingRequestDtoV2();
      try {
        if (_filter && _filter !== '') {
          const { filters, pagination, sort, relations }: PagingRequestV2 = JSON.parse(_filter);
          if (filters) filterObject.filters = filters;
          if (pagination) filterObject.pagination = pagination;
          if (sort) filterObject.sort = sort;
          if (relations) filterObject.relations = relations;
        }
      } catch (error) {
        throw new HttpException('INVALID_INPUT', 400000);
      }
      return this.appService.getAndPaginateV2(filterObject as PagingRequestV2).then(([records, total]) => {
        return new PaginationDto(
          records.map((record: E) => new viewDto(record)),
          {
            paginationOptionsDto: filterObject.pagination,
            totalItem: total,
          } as unknown as PaginationDtoParams,
        );
      });
    }

    @Get(':id/v2')
    @ApiOperation({ summary: 'Find by Id with relation' })
    async findByIdWithRelation(@Param('id') id: string, @Query() _query: GetDetailRelation): Promise<Record<keyof ViewDtoContructor<E>, unknown>> {
      const listRelation = _query.relations.split('-');
      return this.appService.findOneByUIdRelation(id, listRelation).then((entity: E) => {
        return new viewDto(entity);
      });
    }

    @Get('/list')
    @ApiOperation({ summary: 'Find all not paging' })
    @ApiQuery({
      name: 'filter',
      required: false,
    })
    async getList(@Query('filter') _filter: string): Promise<PaginationDto<E>> {
      const filterObject: PagingRequestV2 = new PagingRequestDtoV2();
      try {
        if (_filter && _filter !== '') {
          const { filters, pagination, sort, relations }: PagingRequestV2 = JSON.parse(_filter);
          if (filters) filterObject.filters = filters;
          if (pagination) filterObject.pagination = pagination;
          if (sort) filterObject.sort = sort;
          if (relations) filterObject.relations = relations;
        }
      } catch (error) {
        throw new HttpException('INVALID_INPUT', 400000);
      }
      return this.appService.getList(filterObject as PagingRequestV2).then(([records, total]) => {
        return new PaginationDto(
          records.map((record: E) => new viewDto(record)),
          {
            paginationOptionsDto: filterObject.pagination,
            totalItem: total,
          } as unknown as PaginationDtoParams,
        );
      });
    }
  }

  return CRUDBaseControllerHost;
}
