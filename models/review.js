const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    body: String,

    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },

});

UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('Review', ReviewSchema)