const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bucketSchema = new Schema({
  type: { type: String, required: true },
  isFull: { type: Boolean, required: true },
  belongsTo: { type: String, require: true },
	points: { type: Number}
});

const Bucket = mongoose.model('Bucket', bucketSchema);

module.exports = Bucket;
