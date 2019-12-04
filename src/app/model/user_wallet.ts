import { Application } from 'midway';

export = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const WalletSchema = new Schema({
    name: { type: String },
    uid: { type: String },
    status: { type: Number, default: 0 },
    amount: { type: Number },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  }, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });

  return conn.model('UserWallet', WalletSchema);

};
