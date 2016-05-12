var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	comment: {
		type: String,
		required: true
	}
},
{
	timestamps: true,
});

module.exports = CommentSchema;
