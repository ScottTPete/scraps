var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LikeSchema = new Schema({
	likedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			unique: true
	},
	/*album: {
		type: Schema.Types.ObjectId,
		ref: 'Album'
	},
	photo: {
		type: Schema.Types.ObjectId,
		ref: 'Photo'
	}*/
});

module.exports = mongoose.model('Likes', LikeSchema);
