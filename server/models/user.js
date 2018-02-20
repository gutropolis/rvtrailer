var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    type: {type: Number},
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String, unique: true, lowercase: true },
    password: {type: String},
    newsletter_owner: {type: Boolean},
    newsletter_renter: {type: Boolean},
    approved: {type: Boolean},
    admin: {type: Boolean, default: false},
    owner: {type: Boolean, default: false},
    renter: {type: Boolean, default: false},
    type: {type: String},
    photo: {type: String},
    about_user_description: {type: String},
    user_address: {type: String},
    user_contact_no: {type: String},
    package_id: {type: String, default: null},
    created_at : { type : Date,default:null},
});

module.exports = mongoose.model('User', UserSchema);

