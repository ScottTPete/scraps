var mongoose = require('mongoose'),
	PhotoSchema = require('../photos/photoSchema'),
	CommentSchema = require('../comments/commentSchema'),
	Schema = mongoose.Schema;

var AlbumSchema = new Schema({
	albumName: {
		type: String,
		required: true,
	},
	photos: [PhotoSchema],
	description: {
		type: String,
		default: ''
	},
	comments: [CommentSchema],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	albumCover: [PhotoSchema], //array in case user wants rotating pictures as cover.
	location: [{
		type: String,
		default: ''
	}],
	albumDate: {
		type: Date
	},
	peopleIn: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	publicEditable: {
		type: Boolean,
		default: false
	}

},
{
	timestamps: true,
})

module.exports = AlbumSchema;
