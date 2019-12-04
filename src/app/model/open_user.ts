import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const UserSchema = new Schema({
    nickName: { type: String },
    avatarUrl: { type: String },
    gender: { type: Number },
    province: { type: String },
    city: { type: String },
    country: { type: String },
    uid: { type: String || Number },
    from: { type: Number, default: 0 },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });

  return conn.model('OpenUser', UserSchema);

};
