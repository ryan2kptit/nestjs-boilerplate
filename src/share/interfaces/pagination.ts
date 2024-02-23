export interface Pagination<T> {
  data: T;
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
  // cursor paging
  next?: string;
  hashNext?: boolean;
  previous?: string;
  hashPrevious?: boolean;
}

//#region Params
interface PaginateParamsBase {
  /**
   * @field page_size
   * @type number
   * @description size page request.
   * * Default is 20
   * * If page_size=-1 <=> get all data
   * @example page_size=20
   */
  pageSize?: number;
  /**
   * @field sort
   * @type string
   * @description sort param
   * @example sort: _id:1;name:1;address:-1
   */
  sort?: string;
  /**
   * @field select
   * @type string
   * @description list field is preview
   * @example select: name:0;email:1,
   */
  select?: string;
  /**
   * @field populations
   * @type string
   * @description mongoose populate. We are support populate with field select
   * @example populations: account:name address  (<=> populate field "account" and show list with field "name" & "address")
   */
  populations?: string;
  /**
   * @field where
   * @type string
   * @description search for absolute right data
   * @example where: role:wholesaler;status.active.is_active:1,
   */
  where?: string;
  /**
   * @field pattern
   * @type string
   * @description search for same like SQL
   * @example email:manhhipkhmt2
   */
  pattern?: string;
  /**
   * @field content
   * @type string
   * @description full text search
   * @example duytmx
   */
  content?: string;
}

export interface PaginateParams extends PaginateParamsBase {
  /**
   * @field page
   * @type number
   * @description set current page
   * @example page:2
   */
  page?: number;
}

export interface PaginateCursorParams extends PaginateParamsBase {
  /**
   * @field next
   * @type string
   * @description cursor next page (support solution chat with paging same facebook, twitter)
   */
  next?: string;
  /**
   * @field previous
   * @type string
   * @description cursor previous page (support solution chat with paging same facebook, twitter)
   */
  previous?: string;
}

//#endregion
