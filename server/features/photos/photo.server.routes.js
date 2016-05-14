var photoCtrl = require('./photo.server.ctrl');

module.exports = function(app) {

	app.post('/api/v1/photo', photoCtrl.postPhoto);
	app.get('/api/v1/photos', photoCtrl.getPhotos);

	app.route('/api/v1/photo/:id')
		.put(photoCtrl.editPhoto)
		.delete(photoCtrl.deletePhoto)

}
