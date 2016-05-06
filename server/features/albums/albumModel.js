var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AlbumSchema = new Schema({
	albumName: {
		type: String,
		required: true,
	},
	photos: [{
		type: Schema.Types.ObjectId,
		ref: 'Photo',
		required: true
	}],
	description: {
		type: String,
		default: ''
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	}],
	publicEditable: {
		type: Boolean,
		default: false
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	location: {
		type: String,
		default: ''
	},
	albumDate: {
		type: Date
	},
	peopleIn: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]

},
{
	timestamps: true,
})

module.exports = mongoose.model('Album', AlbumSchema)
