var mongoose = require('mongoose'),
	validate = require('mongoose-validator'),
	bcrypt = require('bcryptjs'),
	PhotoSchema = require('../photos/photoSchema'),
	CommentSchema = require('../comments/commentSchema'),
	Schema = mongoose.Schema;


var validateName = [
	validate({
		validator: 'isAlpha',
		passIfEmpty: true,
		message: 'Name can only contain letters, no numbers or symbols'
	})
];

var validateEmail = [
	validate({
		validator: 'isEmail',
		passIfEmpty: true,
	})
];

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
			validate: validateName
		},
		lastname: {
			type: String,
			trim: true,
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
		validate: validateEmail,
	},
	profilePic: {
		type: String,
		default: 'https://www.drupal.org/files/profile_default.jpg'
	},
	birthday: {
		type: Date,
		validate: validateDate
	},
	bio: {
		type: String,
		maxlength: 150,
		trim: true
	},
	photoAlbums: [{
		type: Schema.Types.ObjectId,
		ref: 'Album'
	}],
	gender: {
		type: String,
		enum: ['Male', 'Female']
	},
	photos: [PhotoSchema],
	friends: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}],
	following: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}],
	followers: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}],
	likes: {
		albums: [{
			type: Schema.Types.ObjectId,
			ref: 'Album'
		}],
		photos: [PhotoSchema]

	},
	comments: [CommentSchema],
	location: {
		type: String,
	}
},
{
	timestamps: true
});

UserSchema.pre('save', function(next) {
	var user = this;
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
