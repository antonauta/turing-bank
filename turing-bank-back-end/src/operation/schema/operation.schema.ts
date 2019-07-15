import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
export const operationSchema = new mongoose.Schema({
    description: { type: String ,default:''},
    value: { type: Number, default: 0},
    destination_balance : {type:Number},
    origin_balance : {type:Number},
    expire_at: {type: Date, default: Date.now, expires:'1y'} , //  dados de op duram 2 anos
    date: { type: Date, default: new Date() },
    origin: { type: mongoose.Schema.ObjectId, ref: 'User' },
    destination: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

operationSchema.plugin(mongoosePaginate)