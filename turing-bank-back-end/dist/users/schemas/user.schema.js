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
const randomatic = require("randomatic");
const SALT_WORK_FACTOR = 10;
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    agency: { type: String, default: '01' },
    account: { type: String },
    preferredName: { type: String, required: true },
    email: { type: String, required: true },
    token: String,
    refreshToken: String,
    cpf: { type: String, unique: true, required: true },
    balance: { type: Number, default: 0 },
    password: { type: String, required: true },
});
function LeftPadWithZeros(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
exports.UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isNew) {
            user.account = LeftPadWithZeros(randomatic('0', Math.floor(Math.random() * 6)), 6) + `${Math.floor(Math.random() * 9)}`;
            user.agency = LeftPadWithZeros(`${Math.floor(Math.random() * 10)}`, 2);
        }
        if (!user.isModified('password')) {
            return next();
        }
        try {
            const hashed = yield bcrypt.hash(this['password'], SALT_WORK_FACTOR);
            this['password'] = hashed;
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
//# sourceMappingURL=user.schema.js.map