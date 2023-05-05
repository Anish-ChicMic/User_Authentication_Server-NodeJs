const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerCredentialsSchema = new Schema({
    name: { type: String },
    email: { type: String },
    userID: { type: String },
    password: { type: String },
    accessToken: { type: String }
}, { timestamps: true });

const playerCredentials = mongoose.model('playerCredentials', playerCredentialsSchema);

module.exports = playerCredentials; 