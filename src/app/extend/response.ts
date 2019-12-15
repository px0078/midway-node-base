
export default {
  format: {
    paging({ results, total, pageSize, pageNumber }: any) {
      return {
        list: results,
        pageSize: Number(pageSize),
        pageNumber: Number(pageNumber),
        total: total,
      };
    },
  },
};
