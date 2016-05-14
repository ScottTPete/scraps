var S3Ctrl = require('./s3.server.ctrl')

module.exports = function(app) {
	app.post('/api/v1/uploadImg', S3Ctrl.saveImage);
}
