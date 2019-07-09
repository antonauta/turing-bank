import * as mongoose from 'mongoose';

export const statementSchema = new mongoose.Schema({
  operation: {type: Number},
  value: {type: Number},
  date: {type: Date },
  accountOrigin: { type: mongoose.Schema.ObjectId, ref: 'User' },
  accountDestiny: { type: mongoose.Schema.ObjectId, ref: 'User' }
});