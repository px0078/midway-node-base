import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const ModuleSchema = new Schema({
    name: { type: String },
    uri: { type: String, unique: true },
    describe: { type: String },
    sort: { type: Number, default: 0 },
    // 假设parent_id没有值的时候，表示它是顶级module
    parent_id: { type: String },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  }, {
    usePushEach: true,
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });

  return conn.model('AuthModule', ModuleSchema);
};
