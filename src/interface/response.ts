
export interface IPagingRes {
  total: number,
  pageNumber: number,
  pageSize: number,
}

export interface ISuccessRes {
  data?: any,
  code: number,
  msg: string,
}

export interface IFailureRes {
  code: number,
  msg: string,
}