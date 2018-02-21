var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CmsSchemaSchema = new Schema({
    slug: {type: String},
    body: {type: String},
    created_at : { type : Date,default:null},
});

module.exports = mongoose.model('CmsPage', CmsSchemaSchema);



