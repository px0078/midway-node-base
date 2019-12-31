import { provide, inject } from 'midway';
import { IService, IXlsxJson } from '@/interface/commonService';
import IContext from '@/interface/context';

@provide('CommonService')
export class CommonService implements IService {
  
  @inject()
  ctx: IContext;

  async json2XlsxObject({ sheetName, data, keys }: IXlsxJson) {
    const sheet: any[] = [];
      if (!!data && data.length > 0) {
        if (!sheet[sheetName]) {
          sheet[sheetName] = { sheet: [], value: [] };
        }
        sheet[sheetName].sheet = keys;

        let values: any[] = []; // 用来存储每一行json的数值，
        data.forEach((item: { [x: string]: any; }, index: string | number) => {
          values = [];
          keys.forEach(key => {
            values.push(item[key]);
          });
          sheet[sheetName].value[index] = values;
        });
      }
      sheet[sheetName].value.unshift(sheet[sheetName].sheet);
      const fileSheet = sheet[sheetName].value;
      return [{ name: sheetName, data: fileSheet }];
  }

}