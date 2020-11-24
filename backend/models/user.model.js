const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// todo - are the image_ids even needed? maybe just need to run one command
// that gets all the ids with the current user id instead of using a relational list...
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;