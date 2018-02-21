var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    feature_name:{type:String},
    created_at : { type : Date,default:null},
   
});

module.exports = mongoose.model('feature', schema);