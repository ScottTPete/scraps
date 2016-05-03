var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},
	description: {
		type: String,
		default: ''
	},
	// TODO: fix photo schema
	content: {
		type: String,
		required: true
	}
},
{
	timestamps: true,
})

model.exports = mongoose.model('Photo', PhotoSchema);
