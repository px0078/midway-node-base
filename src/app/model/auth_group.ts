import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const GroupSchema = new Schema(
    {
      name: { type: String, unique: true },
      describe: { type: String },
      users: { type: Array },
      modules: { type: Array },
      disable: { type: Number, default: 0 },
      createDate: { type: Date, default: Date.now },
      updateDate: { type: Date, default: Date.now },
    },
    {
      usePushEach: true,
      timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    }
  );

  return conn.model('AuthGroup', GroupSchema);
};
