var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CmsSchemaSchema = new Schema({
    slug: {type: String},
    body: {type: String}
});

module.exports = mongoose.model('CmsPage', CmsSchemaSchema);



