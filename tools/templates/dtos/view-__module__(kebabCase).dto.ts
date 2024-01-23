import { Entity } from "typeorm";
import { __module__(pascalCase) } from '../entities/__module__(kebabCase).entity';

export class __module__(pascalCase)ViewDto {

  constructor(entity: __module__(pascalCase)) {
    return {
      id: entity.uid,
      column_name: entity.column_name
    };
  }
}