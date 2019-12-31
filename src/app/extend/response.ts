
import { IPagingRes } from '@/interface/response';

interface IPagingReulst extends IPagingRes {
  list: [any]
}

export default {
  format: {
    paging({ results, total, pageSize, pageNumber }: any): IPagingReulst {
      return {
        list: results,
        pageSize: Number(pageSize),
        pageNumber: Number(pageNumber),
        total,
      };
    },
  },
};
