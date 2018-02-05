var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    parent_id:{type:String},
    title: {type: String},
    sort_description: {type: String},
    icon: {type: String},
    active:{type:Boolean}
});

module.exports = mongoose.model('rental_type', schema);