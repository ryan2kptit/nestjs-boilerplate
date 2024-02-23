import { Brackets } from "typeorm";
import { Filterable, FilterLogic, FilterOperator } from "./filter.interface";

export function toQueryable(query?: Filterable[]): Brackets | null {
  if (!query || query.length === 0) return null;

  return new Brackets((filterQueryBuilder) => {
    let firstWhere = true;
    for (const filterable of query) {
      const { field, operator, value, logic } = filterable;
      let condition = field;
      const params = [];
      params[field] = value;

      switch (operator) {
        case FilterOperator.EQUAL:
          condition += ` = :${field}`;
          break;
        case FilterOperator.NOTEQUAL:
          condition += ` != :${field}`;
          break;
        case FilterOperator.IN:
          params[field] = '(' + (value as any[]).map(item => `'${item}'`).join(', ') + ')';
          condition += ` IN ${params[field]}`;
          break;
        case FilterOperator.NOTIN:
          params[field] = '(' + (value as any[]).map(item => `'${item}'`).join(', ') + ')';
          condition += ` NOT IN ${params[field]}`;
          break;
        case FilterOperator.LESTHAN:
          condition += ` < :${field}`;
          break;
        case FilterOperator.LESTHANEQUAL:
          condition += ` <= :${field}`;
          break;
        case FilterOperator.GREATERTHAN:
          condition += ` > :${field}`;
          break;
        case FilterOperator.GREATERTHANEQUAL:
          condition += ` >= :${field}`;
          break;
        case FilterOperator.CONTAINS:
          condition += ` LIKE :${field}`;
          params[field] = `%${value}%`;
          break;
        case FilterOperator.STARTSWITH:
          condition += ` LIKE :${field}`;
          params[field] = `${value}%`;
          break;
        case FilterOperator.ENDSWITH:
          condition += ` LIKE :${field}`;
          params[field] = `%${value}`;
          break;
        case FilterOperator.NOTNULLEMPTY:
          condition += ` IS NOT NULL AND != ''`;
          break;
        default:
          condition += ` = :${field}`;
          break;
      }
      if (firstWhere) {
        filterQueryBuilder.where((db) => {
          return `${db.alias}.${condition}`;
        }, params);
        firstWhere = false;
        continue;
      }

      if (logic === FilterLogic.AND) {
        filterQueryBuilder.andWhere((db) => {
          return `${db.alias}.${condition}`;
        }, params);
      } else {
        filterQueryBuilder.orWhere((db) => {
          return `${db.alias}.${condition}`;
        }, params);
      }
    }
  });
}
