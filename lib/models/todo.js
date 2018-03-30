const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  description: String,
	assignTo: {
		type: String,
		default: 'Henry'
	},
	gender: {
		type: String,
		default: 'B'
	},
	points: {
		type: Number,
		required: true,
		default: 5
	},
	isActive: { type: Boolean },
	createdBy: {
		type: Date,
		default: '2017-3-25'
	},
	type: { type: String },
	status: {
		type: String,
		default: 'todo'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	}
});

module.exports = mongoose.model("todo", todoSchema);
