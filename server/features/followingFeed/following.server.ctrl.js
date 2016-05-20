var User = require('../users/userModel');


module.exports = {
	getFollowing: function (req, res, next) {
		console.log('hit')

		User.findById(req.user._id).populate('following').exec(function (err, user) {
			if (err) {
				res.status(500).send(err)
			} else {
				console.log(user);
			}
		})
	}







}
