export enum FilterOperator {
  EQUAL = 'eq',
  NOTEQUAL = 'neq',
  IN = 'in',
  NOTIN = 'nin',
  LESTHAN = 'lt',
  LESTHANEQUAL = 'lte',
  GREATERTHAN = 'mt',
  GREATERTHANEQUAL = 'mte',
  CONTAINS = 'cons',
  STARTSWITH = 'startswith',
  ENDSWITH = 'endswith',
  NOTNULLEMPTY = 'notnull',
}
export enum FilterLogic {
  AND = 'AND',
  OR = 'OR',
}
export interface Filterable {
  field: string;
  operator: FilterOperator;
  value: unknown;
  logic: FilterLogic;
}
