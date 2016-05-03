var mongoose = require('mongoose'),
	CommentSchema = require('../comments/commentModel'),
	LikeSchema = require('../comments/commentModel'),
	Schema = mongoose.Schema;

var albumSchema = new Schema({
	/*post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},*/
	name: {
		type: String,
		required: true,
		unique: true
	},
	// TODO: fix photo property in album schema
	photos: [{
		type: Schema.Types.ObjectId,
		ref: 'Photo'
	}],
	description: {
		type: String,
		default: ''

	},
	comments: {
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	},
	publicEditable: {
		type: Boolean,
		default: false
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Likes'
	}],

},
{
	timestamps: true,
})
