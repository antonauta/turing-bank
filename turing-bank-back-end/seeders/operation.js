const mongoose = require('mongoose');

 const operationSchema = new mongoose.Schema({
    description: { type: String,default:'' },
    value: { type: Number, default: 0},
    expire_at: {type: Date, default: Date.now, expires:'1y'} , //  dados de op duram 2 anos
    date: { type: Date, default: new Date() },
    origin: { type: mongoose.Schema.ObjectId, ref: 'User' },
    destination: { type: mongoose.Schema.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Operation',operationSchema)