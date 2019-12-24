
import { IPagingRes, ISuccessRes } from './response';
import { IAuthModule } from './model';


export interface IListResult extends IPagingRes {
  list: [IAuthModule]
}

export interface IService {
  list(): Promise<IListResult>;
  create(options: IAuthModule): Promise<ISuccessRes>;
}