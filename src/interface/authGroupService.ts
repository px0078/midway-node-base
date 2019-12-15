
import { IPaging } from './request';
import { IPagingRes } from './response';
import { IAuthGroup } from './model';

export interface IListRequest extends IPaging {
  query: {
    disable?: any,
    name?: string,
    _id?: string,
  }
}

export interface IListResult extends IPagingRes {
  list: [IAuthGroup]
}

export interface IService {
  list(options: IListRequest): Promise<IListResult>;

}