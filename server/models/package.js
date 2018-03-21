var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageSchema = new Schema({
    name: {type: String},
    price: {type: Number},
    listing: {type: String},
    edit_listing: {type: String},
    chat: {type: Boolean},
    created_at : { type : Date,default:null},
});

module.exports = mongoose.model('Package', PackageSchema);

