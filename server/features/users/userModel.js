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
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}],
	friends: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}],
},
{
	timestamps: true
});

UserSchema.pre('save', function(next) {
	var user = this;
	if(!this.isModified('password')) {
		return next()
	}
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			next();
		});
	});
});


module.exports = mongoose.model('User', UserSchema);
