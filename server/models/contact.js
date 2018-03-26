var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    subject: {type: String},
    message: {type: String},
    date: { type: Date, default: Date.now }
    //trailers: [{ type: Schema.Types.ObjectId, ref: 'ListTrailer' }]
});

module.exports = mongoose.model('Contact', ContactSchema);

