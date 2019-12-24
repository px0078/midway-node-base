import { provide, inject } from 'midway';
import { IListResult, IListRequest, IService, ICreateRequest } from '@/interface/authGroupService';
import IContext from '@/interface/context'
import { ISuccessRes } from '@/interface/response'

@provide('AuthGroupService')
export class AuthGroupService implements IService {
  
  @inject()
  ctx: IContext;

  async list({ pageNumber, pageSize, query } : IListRequest): Promise<IListResult> {
    const results = await this.ctx.model.AuthGroup.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return this.ctx.response.format.paging({
      results: results || [],
      total: await this.ctx.model.AuthGroup.find(query).countDocuments() || 0,
      pageSize,
      pageNumber,
    })
  }

  async create(data: ICreateRequest): Promise<ISuccessRes> {
    const result = await this.ctx.model.AuthGroup.create(data);
    return result;
  }

  // async removeUser(id) {
  //   const result = await this.ctx.model.AuthGroup.find({
  //     users: { $in: [id] },
  //   });
  //   result.forEach(group => {
  //     this.update(
  //       group.id,
  //       Object.assign(group, {
  //         users: _.difference(group.users, [id]),
  //       }),
  //     );
  //   });
  // }

  async destroy(id: string) {
    try {
      return await this.ctx.model.AuthGroup.remove(
        { _id: id },
      ).exec();
    } catch (err) {
      this.ctx.logger.error(err.message);
      return '';
    }
  }

  async detail(id: string) {
    const result = await this.ctx.model.AuthGroup.findOne({
      _id: id,
    });

    return result;
  }

  async update(id: string, data: ICreateRequest) {
    const newData = Object.assign(data, { _id: id });

    try {
      return await this.ctx.model.AuthGroup.findOneAndUpdate({ _id: id }, newData, {
        new: true,
        runValidators: true,
      }).exec();
    } catch (err) {
      this.ctx.logger.error(err.message);
      return '';
    }
  }
  

}
