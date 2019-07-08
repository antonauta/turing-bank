"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const SALT_WORK_FACTOR = 10;
exports.UserSchema = new mongoose.Schema({
    name: String,
    agency: { type: String, default: '01' },
    account: { type: Number, unique: true },
    preferredName: String,
    email: String,
    cpf: { type: String, unique: true },
    balance: { type: Number, default: 0 },
    password: { type: String },
});
exports.UserSchema.plugin(AutoIncrement, { id: 'account_seq', inc_field: 'account' });
const UserModel = mongoose.model('users', exports.UserSchema);
exports.UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isNew) {
            return next();
        }
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    });
});
//# sourceMappingURL=item.schema.js.map