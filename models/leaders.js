const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaderSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    }
},{
    timestamps: true
});

var leaders = mongoose.model('Leader', LeaderSchema);

module.exports = leaders;