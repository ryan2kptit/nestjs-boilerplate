import { IField, Searchable } from './type/service.type';

export class UtilService {
  static tempArr: IField[] = [];
  static entities: Record<string, IField[]> = {};
  static nameToSet: string;

  public static getProperty = (target: any, key: string) => {
    const name = UtilService.nameToSet;
    const t = Reflect.getMetadata('design:type', target, key);
    const field: IField = {
      dataIndex: key,
      type: t.name.toLowerCase(),
      name: name ? name : UtilService.convertToTitleCase(key),
    };
    UtilService.nameToSet = null;
    UtilService.tempArr.push(field);
  };

  public static getEntity(target: any) {
    UtilService.entities[`${target.name}`] = UtilService.tempArr;
    UtilService.tempArr = [];
  }

  public static getEntities() {
    return UtilService.entities;
  }

  public static searchable(searchableObj?: Searchable) {
    return (target: any, key: string) => {
      if (searchableObj) {
        searchableObj.field = key;
      } else {
        searchableObj = { field: key, type: 'text' };
      }
      const entity = UtilService.tempArr.find(field => field.dataIndex === key);
      if (entity) {
        entity.searchable = searchableObj;
      }
    };
  }

  public static changeNameProperty(name: string) {
    return function (target: any, key: string) {
      UtilService.nameToSet = name;
    };
  }

  private static convertToTitleCase(name: string): string {
    const result = name.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
