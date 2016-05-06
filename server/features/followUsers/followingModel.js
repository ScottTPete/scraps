var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FollowingModel = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	following: {
		type: Boolean,
		default: true,
	}
})

module.exports = mongoose.model('Following', FollowingModel);
