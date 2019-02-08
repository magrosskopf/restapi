const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: String,
    content: String,
    lits: Array,
    canDoALit: Boolean,
    shits: Array,
    canDoAShit: Boolean,
    comments: Array,
    timestamp: String
});

module.exports = mongoose.model('Post', postSchema);