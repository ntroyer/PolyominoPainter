const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    position_id: {
        type: Number,
        required: true
    },
    canvas: {
        type: Object
    }
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;