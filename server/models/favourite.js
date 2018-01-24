var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavouriteSchema = new Schema({
    user_id: {type: String},
    trailer_id: {type: String},
    //trailers: [{ type: Schema.Types.ObjectId, ref: 'ListTrailer' }]
});

module.exports = mongoose.model('Favourite', FavouriteSchema);

