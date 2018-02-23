var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    parent_id: {type: String},
    sender_id: {type: String},
    listings_user_id: {type: String},
    listing_id: {type: String},
    recivername: {type: String},
    sendername:{type: String},
    email: {type: String},
    message: {type: String},
    date: { type: Date, default: Date.now }
    //trailers: [{ type: Schema.Types.ObjectId, ref: 'ListTrailer' }]
});

module.exports = mongoose.model('Message', MessageSchema);

