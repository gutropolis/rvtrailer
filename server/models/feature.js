var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    feature_name:{type:String}
   
});

module.exports = mongoose.model('feature', schema);