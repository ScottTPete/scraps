var mongoose = require('mongoose');

module.exports = function () {
	//Intialize Mongoose db//
	//	mongoose.set('debug', true);
	mongoose.connect('mongodb://localhost/scraps', function (err) {
		if (err) {
			console.log(err + ' bad things going down.')
		} else {
			console.log('Mongoose is good to go.')
		}
	});
}
