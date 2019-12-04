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
      create_date: { type: Date, default: Date.now },
      update_date: { type: Date, default: Date.now },
    },
    {
      usePushEach: true,
      timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
    }
  );

  return conn.model('AuthGroup', GroupSchema);
};
