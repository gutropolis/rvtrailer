var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListTrailerSchema = new Schema({
    rv_type: {type: String},
    specification_trailer_type: {type: Number},
    specification_trailer_sub_type: {type: String},
    specification_make: {type: String},
    specification_model: {type: String},
    specification_year: {type: String},
    specification_length: {type: String},
    specification_gross_weight: {type: String},
    specification_tough_weight: {type: String},
    specification_guest: {type: String},
    specification_slide_out: {type: String},
    fifthwheel: {type: String, default: false},
    hybrid: {type: String, default: false},
    tenttrailer: {type: String, default: false},
    toyhauler: {type: String, default: false},
    traveltrailer: {type: String, default: false},
    vintage: {type: String, default: false},
    motor_class_a: {type: String, default: false},
    motor_class_b: {type: String, default: false},
    motor_class_c: {type: String, default: false},

    location_street: {type: String},
    location_city: {type: String },
    location_province: {type: String},
    location_postal: {type: String},
    details_ad_title: {type: String},
    details_ad_description: {type: String},
    details_feature: {type : Array , "default" : []},
    details_no_of_beds: {type: String},
    details_no_of_bathrooms: {type: String},
    pricing_security_deposit: {type: String},
    pricing_delivery_charges: {type: String},
    pricing_high_rate_hour: {type:Number},
    pricing_high_rate_week: {type: String},
    pricing_high_rate_month: {type: String},
    pricing_low_rate_hour: {type: String},
    pricing_low_rate_week: {type: String},
    pricing_low_rate_month: {type: String},
    pricing_highest_season_date_range_from: {type: String},
    pricing_highest_season_date_range_to: {type: String},
    photo: {type: String},
    user_id : {type: String},
    type_of_rv:{type: String},
    rentalTypeID:{type: String},
    created_at : { type : Date,default:null},
    unavailability_from:{ type : Date,default:null},
    unavailability_to:{ type : Date,default:null},
    owner_name:{type:String},
    owner_email:{type:String},
    star_rating:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Feedback"
        }]
    },{
            usePushEach: true
        
    }
); 

module.exports = mongoose.model('ListTrailer', ListTrailerSchema);
