var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsLetterSchema = new Schema({
    email: {type: String, unique: true, lowercase: true}
});

module.exports = mongoose.model('NewsLetter', NewsLetterSchema);



