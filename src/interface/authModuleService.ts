
import { IPagingRes, ISuccessRes } from './response';
import { IAuthModule } from './model';


export interface IListResult extends IPagingRes {
  list: [IAuthModule]
}

export interface IService {
  list(): Promise<IListResult>;
  create(options: IAuthModule): Promise<ISuccessRes>;
  destroy(id: string): Promise<ISuccessRes>;
  detail(id: string): Promise<IAuthModule>;
  update(id: string, data: IAuthModule): Promise<ISuccessRes>;
}