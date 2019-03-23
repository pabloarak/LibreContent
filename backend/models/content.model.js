const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    title: String,
    author: String,
    description: String
});

module.exports = mongoose.model('Content', contentSchema);