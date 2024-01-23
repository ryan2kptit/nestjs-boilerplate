export type SearchableType = 'text' | 'number' | 'checkbox' | 'option' | 'date' | 'week' | 'month' | 'year' | 'quarter';
export interface Searchable {
  field?: string;
  label?: string | string[];
  description?: string;
  type: SearchableType;
  labelCol?: number;
  labelOffsetCol?: number;
  wrapperCol?: number;
  wrapperOffsetCol?: number;
  baseCol?: 24;
  isSelectMultiple?: boolean;
  selectOptions?: Array<{ label: string; value: any }>;
  format?: string;
  showRangeDate?: boolean;
  showTime?: boolean;
  rangeDateLabel?: [string, string];
}
export interface IField {
  dataIndex: string;
  type: string;
  name: string;
  searchable?: Searchable;
}
