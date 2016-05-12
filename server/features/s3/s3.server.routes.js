var s3Ctrl = require('./s3.server.ctrl')

module.exports = function(app) {
	app.post('/api/v1/photos', s3Ctrl.saveImage);
}
