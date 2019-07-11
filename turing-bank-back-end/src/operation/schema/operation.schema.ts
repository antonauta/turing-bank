import * as mongoose from 'mongoose';

export const operationSchema = new mongoose.Schema({
    type: { type: Number },
    value: { type: Number, default: 0},
    expire_at: {type: Date, default: Date.now, expires: 6.3113904 * 10 ^10} , //  dados de op duram 2 anos
    date: { type: Date, default: new Date() },
    origin: { type: mongoose.Schema.ObjectId, ref: 'User' },
    destin: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

