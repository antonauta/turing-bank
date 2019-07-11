import * as mongoose from 'mongoose';
import * as  bcrypt from 'bcrypt';
import * as util from 'util';
import * as autoIncrement from 'mongoose-easy-auto-increment';
const SALT_WORK_FACTOR = 10;
export const UserSchema = new mongoose.Schema({
  name: String,
  agency: { type: String, default: '01' },
  account: { type: String },
  preferredName: String,
  email: String,
  token:String,
  refreshToken:String,
  cpf: { type: String, unique: true },

  balance: { type: Number, default: 0 },
  password: { type: String },
});

UserSchema.plugin(autoIncrement, { field: 'account', collection: 'Counters' });

UserSchema.pre('save', async function(next : mongoose.HookNextFunction) {

  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const hashed = await bcrypt.hash(this['password'], SALT_WORK_FACTOR);
    this['password'] = hashed;
    return next();
  } catch (error) {
    return next(error)
  }
 
 
});
