const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bucketSchema = new Schema({
  type: { type: String, required: true },
  isFull: { type: Boolean, required: true },
  belongsTo: { type: String, require: true },
	points: { type: Number},
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	}
});

const Bucket = mongoose.model('bucket', bucketSchema);

module.exports = Bucket;
