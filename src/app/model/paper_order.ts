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
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });

  return conn.model('PaperOrder', OrderSchema);

};
