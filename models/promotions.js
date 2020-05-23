const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


const PromotionSchema = new Schema({
    name:{
        type: String,
        unique: true,
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
    label: {
        type: String,
        default: ''
    },
    price: {
        type: mongoose.Types.Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    }
},{
    timestamps: true
});

var promotions = mongoose.model('Promotion', PromotionSchema);

module.exports = promotions;