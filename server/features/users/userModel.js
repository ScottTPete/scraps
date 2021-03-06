var mongoose = require('mongoose'), //	validate = require('mongoose-validator'),
	bcrypt = require('bcryptjs')
	, CommentSchema = require('../comments/commentSchema')
	, Schema = mongoose.Schema;


require('mongoose-type-email');


//var validateName = [
//	validate({
//		validator: 'isAlpha',
//		passIfEmpty: true,
//		message: 'Name can only contain letters, no numbers or symbols'
//	})
//];
//
//var validateDate = [
//	validate({
//		validator: 'isDate',
//	})
//];

var UserSchema = new Schema({
	name: {
		firstname: {
			type: String
			, trim: true, //			validate: validateName
		}
		, lastname: {
			type: String
			, trim: true, //			validate: validateName
		}
	}
	, username: {
		type: String
		, required: true
		, unique: true
		, minlength: 3
		, maxlength: 15
		, trim: true
	}
	, password: {
		type: String
		, required: true
		, minlength: 4
		, trim: true
	}
	, email: {
		type: mongoose.SchemaTypes.Email
		, /*unique: true,
		index: true*/
	}
	, profilePic: {
		type: String
		, default: 'https://www.drupal.org/files/profile_default.jpg'
	}
	, birthday: {
		type: Date, //		validate: validateDate
	}
	, bio: {
		type: String
		, maxlength: 150
		, trim: true
	}
	, photoAlbums: [{
		type: Schema.Types.ObjectId
		, ref: 'Album'

	}]
	, gender: {
		type: String
		, enum: ['Male', 'Female']
	}
	, photos: [{
		type: Schema.Types.ObjectId
		, ref: 'Photo'

	}]
	, friends: [{
		type: Schema.Types.ObjectId
		, ref: 'User'

	}]
	, following: [{
		type: Schema.Types.ObjectId
		, ref: 'User'

	}]
	, followers: [{
		type: Schema.Types.ObjectId
		, ref: 'User'

	}]
	, likes: {
		albums: [{
			type: Schema.Types.ObjectId
			, ref: 'Album'

		}]
		, photos: [{
			type: Schema.Types.ObjectId
			, ref: 'Photo'

		}]

	}
	, comments: [CommentSchema]
	, location: {
		type: String
	, }
}, {
	timestamps: true
});

UserSchema.pre('find', function (next) {
	this.populate('photos');
	next();
})

UserSchema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password')) {

		return next()
	}

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return cb(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (attemptedPassword, cb) {
	var user = this;
	bcrypt.compare(attemptedPassword, user.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);

	})
};

module.exports = mongoose.model('User', UserSchema);
