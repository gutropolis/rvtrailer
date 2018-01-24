var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageSchema = new Schema({
    name: {type: String},
    prise: {type: Number},
    listing: {type: String},
    edit_listing: {type: String},
    chat: {type: Boolean}
});

module.exports = mongoose.model('Package', PackageSchema);

