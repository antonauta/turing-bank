import * as mongoose from 'mongoose';

export const operationSchema = new mongoose.Schema({
    type: { type: Number },
    value: { type: Number, default: 0},
    date: { type: Date, default: new Date() },
    origin: { type: mongoose.Schema.ObjectId, ref: 'User' },
    destin: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

