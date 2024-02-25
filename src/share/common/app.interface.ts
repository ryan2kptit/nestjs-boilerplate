export interface IAdminPayload {
  sub: string;
  email: string;
  fullName?: string;
}

export interface IUserPayload {
  id?: number | string;
  sub?: number | string;
  name: string;
  email: string;
  createdBy: string;
  phone: string;
  status?: string | number;
  createdAt?: string;
  updatedAt?: string;
  lastLogin: string;
}

export interface IPaginateParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  status?: string;
}

export interface IResponseList<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
}
