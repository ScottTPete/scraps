var mongoose = require('mongoose'),
	PhotoSchema = require('../photos/photoSchema'),
	CommentSchema = require('../comments/commentSchema'),
	Schema = mongoose.Schema;

var AlbumSchema = new Schema({
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	albumName: {
		type: String,
		required: true,
	},
	photos: [PhotoSchema],
	description: {
		type: String,
		default: ''
	},
	albumCover: [PhotoSchema], //array in case user wants rotating pictures as cover.
	location: [{
		type: String,
		default: ''
	}],
	albumDates: {
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		}
	},
	comments: [CommentSchema],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}],
	peopleIn: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}],
	publicEditable: {
		type: Boolean,
		default: false
	},
	contributers: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}]

},
{
	timestamps: true,
})

module.exports = mongoose.model('Album', AlbumSchema);
