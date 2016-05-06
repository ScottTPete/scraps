var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	description: {
		type: String,
		default: ''
	},
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
		ref: 'User'
	}],
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	location: {
		type: String,
		default: ''
	},
	photoDate: {
		type: Date
	},
	peopleInPhoto: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
},
{
	timestamps: true,
})

model.exports = mongoose.model('Photo', PhotoSchema);
