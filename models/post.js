const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    images: [ String ],
    location: String,
    lat: Number,
    lng: Number,
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('Post', PostSchema)