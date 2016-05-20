var followingCtrl = require('./following.server.ctrl');

module.exports = function (app) {

	app.get('/api/v1/following', followingCtrl.getFollowing);

}
