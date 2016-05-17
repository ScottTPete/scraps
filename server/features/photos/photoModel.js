var mongoose = require('mongoose'),
	CommentSchema = require('../comments/commentSchema'),
	Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	description: {
		type: String,
		default: ''
	},
	image: {
		type: String,
	},
	comments: [CommentSchema],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	location: {
		type: String,
		default: ''
	},
	photoDate: {
		type: Date
	},
	peopleIn: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
},
{
	timestamps: true,
});

module.exports = mongoose.model('Photo', PhotoSchema);
