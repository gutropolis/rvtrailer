var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    title: {type: String},
    review: {type: String},
    ip_address: {type: String},
    user_id: {type: String},
    star_rating:{type:Number},
    trailer_id:{type:String},
    date: { type: Date, default: Date.now },
    trailers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "ListTrailer"
    }],
    owners: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
    }]
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

