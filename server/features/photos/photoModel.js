var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	/*post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},*/
	description: {
		type: String,
		default: ''
	},
	// TODO: fix photo schema
	image: {
		type: String,
		required: true
	},
	comments: {
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Likes'
	}],
},
{
	timestamps: true,
})

model.exports = mongoose.model('Photo', PhotoSchema);
