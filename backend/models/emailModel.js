const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true },
});

// Temporariamente sem autoincremento
module.exports = mongoose.model('Email', emailSchema);
