import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const SubjectSchema = new Schema({
    name: { type: String },
    parentId: { type: String },
    status: { type: Number, default: 0 },
    amount: { type: Number },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });

  return conn.model('StudySubject', SubjectSchema);

};
