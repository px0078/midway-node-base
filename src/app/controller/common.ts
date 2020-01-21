import { Context, controller, inject, post, provide, get, config } from 'midway';
import nodeXlsx from 'node-xlsx';
import baseController from "../core/baseController";
import { IService } from '@/interface/commonService';
import * as Qiniu from 'qiniu';

@provide()
@controller('/common')
export class CommonController extends baseController {

  @inject()
  ctx: Context;

  @inject('CommonService')
  service: IService;

  /**
  * 导出excel
   * 
  */
  @post('/excel', { routerName: 'common.exportExcel', middleware: ['authMiddleware']})
  async exportExcel() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const createRule = {
      sheetName: {
        type: 'string',
        required: true,
      },
      data: {
        type: 'object',
        required: true,
      },
      keys: {
        type: 'object',
        required: true,
      },
    };

    try {
      ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);
      return;
    }

    const sheetData = {
      sheetName: query.sheetName,
      data: query.data,
      keys: query.keys,
    };
    const XlsxObject = service.json2XlsxObject(sheetData);

    let file = nodeXlsx.build(XlsxObject); // 这一步将符合要求的数据拼成buffer
    ctx.response.set({
      'content-type': 'application/octet-stream',
      // 'Content-Type': 'application/vnd.openxmlformats',
      'Content-Disposition':
        'attachment; filename=' + `${encodeURIComponent(sheetData.sheetName)}_${Date.now()}.xlsx`,
    });

    ctx.body = file;
  }

  @config('qiniu')
  qiniuConfig: {
    accessKey: string,
    secretKey: string,
    bucket: string,
    domain: string,
  };
   /**
   * 获取七牛云 token
   */
  @get('/qiniuToken',  { routerName: 'common.getQiniuToken', middleware: ['authMiddleware']} )
  getQiniuToken() {
    const { accessKey, secretKey, bucket, domain } = this.qiniuConfig;
    const mac = new Qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: bucket,
      expires: 600
    };
    const putPolicy = new Qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    
    this.success({
      uploadToken,
      domain,
    })
  }

}
