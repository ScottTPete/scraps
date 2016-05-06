var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	commentMessage: {
		type: String,
		required: true
	}
},
{
	timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema;
