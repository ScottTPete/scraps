var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		firstname: {
			type: String,
			trim: true,
			default: ''
		},
		lastname: {
			type: String,
			trim: true,
			default: ''
		}
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 15
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	email: {
		type: String,
		default: '',
		unique: true
	},
	age: {
		type: Number,
	},
	birthday: {
		type: Date
	},
	albums: [{
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
	/*likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Likes',
		unique: true
	}],*/
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
	console.log(attemptedPassword + ' user model line 86');
	var user = this;
	bcrypt.compare(attemptedPassword, user.password, function(err, isMatch) {
		console.log('line 89 usermodel ' + isMatch);
		if (err) return cb(err);
		cb(null, isMatch);

	})
};

/*UserSchema.statics.findByUsername = function (username, cb) {
	var User = this;
	return User.find({ username: username }, cb);
};*/


module.exports = mongoose.model('User', UserSchema);
