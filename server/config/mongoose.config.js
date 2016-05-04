var mongoose = require('mongoose');

module.exports = function() {
	//Intialize Mongoose db//
	mongoose.connect('mongodb://localhost/scraps', function(err) {
		if(err) {
			console.log(err + ' bad things going down')
		} else {
			console.log('good to go')
		}
	});
}
