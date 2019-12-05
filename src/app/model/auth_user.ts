import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const UserSchema = new Schema({
    name: { type: String },
    account: { type: String, unique: true },
    password: { type: String },
    remark: { type: String },
    status: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    gender: { type: Number, default: 0 },
    mobile: { type: String },
    avatar: { type: String },
    email: { type: String },
  }, {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
  });

  return conn.model('AuthUser', UserSchema);

};
