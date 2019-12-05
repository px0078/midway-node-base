'use strict';

module.exports = {
  PaperForm: {
    
  },
  Query: {
    getPaperFormList: (root, args, ctx) => {
      const params = args.input;
      return ctx.connector.paperForm.getPaperFormList(params);
    },
  },
  Mutation: {
    createPaperForm: (root, args, ctx) => {
      const params = args.input;
      return ctx.connector.paperForm.createPaperForm(params);
    },
  },
};