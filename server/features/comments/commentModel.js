var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},
	postedBy: {
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		postedByName:  {
			type: String
		},
		postedByImage:  {
			type: String
		}
	},
	commentMessage: {
		type: String,
		required: true
	}

},
{
	timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);
