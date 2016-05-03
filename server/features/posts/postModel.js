var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
	postedBy: {
		type: Schema.Types.ObjectId,
		user: 'User'
	},
	album: {
		type: Schema.Types.ObjectId,
		ref: 'Album'
	},
	photo: {
		type: Schema.Types.ObjectId,
		ref: 'Photo'
	},
	coments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
},
{
	timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema)
