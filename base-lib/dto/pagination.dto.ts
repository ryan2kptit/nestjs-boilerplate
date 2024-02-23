import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { TenantBaseAppEntity } from '../entity/app.entity';
import { ViewDtoContructor } from './view-entity.dto';

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

export interface PaginationDtoParams {
  paginationOptionsDto: PaginationOptionsDto;
  totalItem: number;
}

export class PaginationMetaDto {
  @ApiProperty()
  readonly page?: number = null;

  @ApiProperty()
  readonly limit?: number = null;

  @ApiProperty()
  readonly totalPage?: number = null;

  @ApiProperty()
  readonly hasPreviousPage?: boolean;

  @ApiProperty()
  readonly hasNextPage?: boolean;

  constructor({ paginationOptionsDto, totalItem }: PaginationDtoParams) {
    this.page = paginationOptionsDto.page;
    this.limit = paginationOptionsDto.limit;
    this.totalPage = Math.ceil(totalItem / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.totalPage;
  }
}

export class PaginationDto<E extends TenantBaseAppEntity> {
  readonly data: Record<keyof ViewDtoContructor<E>, unknown>[];
  readonly meta: PaginationDtoParams;

  constructor(data: Record<keyof ViewDtoContructor<E>, unknown>[], meta: PaginationDtoParams) {
    this.data = data;
    this.meta = meta;
  }
}

export enum PagingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export interface PagingSort {
  field: string;
  order: PagingOrder;
}
