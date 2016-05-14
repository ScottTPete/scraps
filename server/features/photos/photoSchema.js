var mongoose = require('mongoose'),
	CommentSchema = require('../comments/commentSchema'),
	Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	description: {
		type: String,
		default: ''
	},
	image: {
		type: String,
//		required: true
	},
	comments: [CommentSchema],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	location: {
		type: String,
		default: ''
	},
	photoDate: {
		type: Date
	},
	peopleIn: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
},
{
	timestamps: true,
});

/*PhotoSchema.pre('remove', function(next){
	this.model('User').update(
		{_id: {$in: this.users}},
		{$pull: {photos: this._id}},
		{multi: true},
		next
	);
});*/

PhotoSchema.pre('find', function(next) {
	this.populate('postedBy');
	next();
})

module.exports = mongoose.model('Photo', PhotoSchema);
