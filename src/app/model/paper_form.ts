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
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });

  return conn.model('PaperForm', FormSchema);

};
