var AWS = require('aws-sdk'),
	secret = require('../../config/s3.secrets');

AWS.config.update({
	accessKeyId: secret.AWSAccessKey,
	secretAccessKey: secret.AWSSecretKey,
	region: secret.AWSRegion
});

var s3 = new AWS.S3();

module.exports = {

	saveImage = function (req, res) {
		var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

		var bucketName

	},

}
