const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    pir: { type: Number, required: true },
    distancia: { type: Number, required: true },
    led1: { type: Number, required: true },
    led2: { type: Number, required: true },
    buzzer: { type: Number, required: true },
});

module.exports = mongoose.model('ConfigModel', configSchema);