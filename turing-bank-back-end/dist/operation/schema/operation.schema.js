"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.operationSchema = new mongoose.Schema({
    type: { type: Number },
    value: { type: Number, default: 0 },
    expire_at: { type: Date, default: Date.now, expires: '1y' },
    date: { type: Date, default: new Date() },
    origin: { type: mongoose.Schema.ObjectId, ref: 'User' },
    destination: { type: mongoose.Schema.ObjectId, ref: 'User' },
});
//# sourceMappingURL=operation.schema.js.map