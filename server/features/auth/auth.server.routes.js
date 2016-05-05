var localAuth = require('../../config/passport.local.config');


module.exports = function (app) {

	//Auth Endpoints//
   app.post('/auth/login', localAuth.authenticate);

}
