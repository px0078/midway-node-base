import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const OrderSchema = new Schema({
    name: { type: String },
    phone: { type: String },
    formId: { type: String, unique: true },
    address: { type: String },
    status: { type: Number, default: 0 },
    type: { type: Number, default: 0 },
    amount: { type: Number },
    discount: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
  });

  return conn.model('PaperOrder', OrderSchema);

};
