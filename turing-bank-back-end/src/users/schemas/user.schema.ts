import * as mongoose from 'mongoose';
import * as  bcrypt from 'bcryptjs';
import * as autoIncrement from 'mongoose-easy-auto-increment';
const SALT_WORK_FACTOR = 10;
export const UserSchema = new mongoose.Schema({
  name: String,
  agency: { type: String, default: '01' },
  account: { type: Number },
  preferredName: String,
  email: String,
  token:String,
  cpf: { type: String, unique: true },
  balance: { type: Number, default: 0 },
  password: { type: String },
});

UserSchema.plugin(autoIncrement, { field: 'account', collection: 'Counters' });

UserSchema.pre('save',  function(next) {
  if (!this.isNew) {
    return next();
  }
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR,  function(err, salt) {
    if (err) {
      return next(err);
    }
 
    // hash the password using our new salt
    bcrypt.hash(user.password, salt,  function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
      // override the cleartext password with the hashed one
    });
  });
});
