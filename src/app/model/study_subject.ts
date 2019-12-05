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
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
  });

  return conn.model('StudySubject', SubjectSchema);

};
