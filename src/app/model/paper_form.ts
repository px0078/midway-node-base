import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const FormSchema = new Schema({
    name: { type: String },
    phone: { type: String },
    discipline: { type: Number },
    task: { type: Number },
    taskSource: { type: String },
    orderId: { type: String, unique: true },
    shareId: { type: String },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
  });

  return conn.model('PaperForm', FormSchema);

};
