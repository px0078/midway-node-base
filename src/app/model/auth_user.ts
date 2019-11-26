
export = (app: any) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String },
    account: { type: String, unique: true },
    password: { type: String },
    remark: { type: String },
    status: { type: Number },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
    gender: { type: Number },
    mobile: { type: String },
    avatar: { type: String },
    email: { type: String },
  }, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });

  return mongoose.model('AuthUser', UserSchema);
};
