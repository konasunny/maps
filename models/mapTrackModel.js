var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var mapTrackSchema = new Schema({
    "transaction_reference" : {type: String, required: true},
    "technician_id" : {type: Number, required: true},
    'latitude': {type: Number, required: true},
    'longitude': {type: Number, required: true},
    'is_destination_reached': {type: Number, default: false},
    'duration': {type: String, default: ''},
    'created_by': {type: Number, default: 0},
    'created_user': {type: String, default: ''},
    'timestamp': {type: Date}
});

// Sets the timestamp parameter equal to the current time
mapTrackSchema.pre('save', function(next){
  now = new Date();
  this.timestamp = now;
  next();
});
 
module.exports = mongoose.model('map-points', mapTrackSchema);