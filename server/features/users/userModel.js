var mongoose = require('mongoose'),
	validate = require('mongoose-validator'),
	bcrypt = require('bcryptjs'),
	Schema = mongoose.Schema;


var validateName = [
	validate({
		validator: 'isAlpha',
		passIfEmpty: true,
		message: 'Name can only contain letters, no numbers or symbols'
	})
];

/*var validateEmail = [
	validate({
		validator: 'isEmail',
		passIfEmpty: true,
	})
];*/

var validateDate = [
	validate({
		validator: 'isDate',
	})
];

var UserSchema = new Schema({
	name: {
		firstname: {
			type: String,
			trim: true,
			minlength: 2,
			validate: validateName
		},
		lastname: {
			type: String,
			trim: true,
			minlength: 2,
			validate: validateName
		}
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 15,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
		trim: true
	},
	email: {
		type: String,
//		validate: validateEmail,
	},
	profileImg: {
		type: String,
	},
	age: {
		type: Number,
	},
	birthday: {
		type: Date,
		validate: validateDate
	},
	photoAlbums: [{
		type: Schema.Types.ObjectId,
		ref: 'Album'
	}],
	photos: [{
		type: Schema.Types.ObjectId,
		ref: 'Photo'
	}],
	friends: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}],
	following: [{
		type: Schema.Types.ObjectId,
		ref: 'Following'
	}],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Like',
		unique: true
	}],
	location: {
		type: String,
	}
},
{
	timestamps: true
});

UserSchema.pre('save', function(next) {
	var user = this;
	console.log('hit');
	if(!user.isModified('password')) {

		return next()
	}

	bcrypt.genSalt(10, function(err, salt) {
		if(err) return next(err)
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return cb(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(attemptedPassword, cb) {
	var user = this;
	bcrypt.compare(attemptedPassword, user.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);

	})
};

module.exports = mongoose.model('User', UserSchema);
