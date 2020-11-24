const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    canvas: {
        type: Object
    },
    position_id: {
        type: Number
    } 
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;