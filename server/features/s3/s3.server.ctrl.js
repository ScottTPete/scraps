var AWS = require('aws-sdk'),
	secret = require('../../config/s3.secrets');

AWS.config.update({
	accessKeyId: secret.AWSAccessKey,
	secretAccessKey: secret.AWSSecretKey,
	region: secret.AWSRegion
});

var s3 = new AWS.S3();

module.exports = {

	saveImage: function (req, res) {
			var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

			var bucketName = secret.AWSBucket + req.body.userId

			var params = {
				Bucket: bucketName,
				Key: req.body.imageName,
				Body: buf,
				ContentType: 'image/' + req.body.imageExtension,
				ACL: 'public-read'
			}

			s3.upload(params, function(err, response) {
				if (err) {
					return res.status(500).send(err)
				}

				res.status(200).json(response);
			})

		},

}
