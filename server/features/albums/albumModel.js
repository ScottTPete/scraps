var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var albumSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	// TODO: fix photo property in album schema
	photos: {

	},
	description: {
		type: String,
		default: ''

	}

},
{
	timestamps: true,
})
