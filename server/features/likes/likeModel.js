var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LikeSchema = new Schema({
	likes: {
		album: {
			type: Schema.Types.ObjectId,
			ref: 'Album'
		},
		photo: {
			type: Schema.Types.ObjectId,
			ref: 'Photo'
		}
	}
});

module.exports = mongoose.model('Like', LikeSchema);
