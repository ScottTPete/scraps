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
	/*loginAttempts: {
		type: Number,
		required: true,
		default: 0
	},
	lockUntil: {
		type: Number
	},*/
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
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(passwordGiven) {
	console.log(passwordGiven);
	var user = this;
	bcrypt.compare(passwordGiven, user.password, function(err, isMatch) {
		console.log('line 89 usermodel ' + isMatch);
		if (err) throw(err);
		return isMatch;
	})
}

module.exports = mongoose.model('User', UserSchema);
