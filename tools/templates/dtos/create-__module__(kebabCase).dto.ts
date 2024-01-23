import { ICreateEntityDto } from 'kt-nestjs-base';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, validate } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { __module__(pascalCase) } from '../entities/__module__(kebabCase).entity';

export class Create__module__(pascalCase)Dto implements ICreateEntityDto<__module__(pascalCase)> {
  @ApiProperty()
  @IsNotEmpty()
  column_name: string;

  constructor(data: Create__module__(pascalCase)Dto) {
    this.column_name = data.column_name;
  }

  async validate() {
    return validate(this);
  }

  mapToEntity(): DeepPartial<__module__(pascalCase)> {
    return {
      column_name: this.column_name
    };
  }
}