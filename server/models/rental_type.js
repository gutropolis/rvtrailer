var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    rental_type:{type:String},
    type_of_rv: {type: String},
    sort_description: {type: String},
    icon: {type: String},
    active:{type:Boolean},
    created_at : { type : Date,default:null},
});

module.exports = mongoose.model('rental_type', schema);