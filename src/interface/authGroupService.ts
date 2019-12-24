
import { IPaging } from './request';
import { IPagingRes, ISuccessRes } from './response';
import { IAuthGroup } from './model';

export interface IListRequest extends IPaging {
  query: {
    disable?: any,
    name?: string,
    _id?: string,
  }
}

export interface ICreateRequest {
  name: string,
  describe?: string,
  modules?: [string]
}

export interface IListResult extends IPagingRes {
  list: [IAuthGroup]
}

export interface IService {
  list(options: IListRequest): Promise<IListResult>;
  create(options: ICreateRequest): Promise<ISuccessRes>;
  destroy(id: string): Promise<ISuccessRes>;
  detail(id: string): Promise<ISuccessRes>;
  update(id: string, data: ICreateRequest): Promise<ISuccessRes>
}