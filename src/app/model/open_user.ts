import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const UserSchema = new Schema({
    nickName: { type: String },
    avatarUrl: { type: String },
    gender: { type: Number, default: 0 },
    province: { type: String },
    city: { type: String },
    country: { type: String },
    uid: { type: String || Number },
    from: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
  });

  return conn.model('OpenUser', UserSchema);

};
