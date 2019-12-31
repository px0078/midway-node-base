
export interface IXlsxJson {
  sheetName: any,
  data: any,
  keys: [],
}

export interface IService {
  json2XlsxObject(data: any): any
}