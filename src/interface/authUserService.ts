import { IPaging } from './request';
import { IPagingRes, ISuccessRes } from './response';
import { IAuthUser, IAuthModule } from './model';

export interface IListResult extends IPagingRes {
  list: [IAuthUser]
}

export interface IListReq extends IPaging {
  account?: string,
  name?: string,
  mobile?: number | string,
  email?: string,
}

export interface IModuleList {
  list: [IAuthModule]
}

export interface IService {
  list(query: IListReq): Promise<IListResult>;
  create(query: IAuthUser): Promise<IAuthUser>;
  destroy(id: string): Promise<ISuccessRes>;
  detail(id: string): Promise<IAuthUser>;
  update(id: string, data: any): Promise<IAuthUser>;
  auth(id: string): Promise<IModuleList>;
}