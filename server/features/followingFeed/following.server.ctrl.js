var User = require('../users/userModel');


module.exports = {
	getFollowing: function (req, res, next) {
		console.log(req.user + ' server following ctrl')

		User.findById(req.user._id).populate({
			path: 'following'
			, select: 'username profilePic photos'
		}).exec(function (err, user) {
			if (err) {
				res.status(500).send(err)
			} else {
				console.log(user);
				user.populate('photos')
				res.status(200).send(user);
			}
		})
	}







}
