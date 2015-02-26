var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
		id: String,
		name: String,
		tasks: [{
				id: Number,
				source: Number
		}],
		members: [{
				name: String,
				admin: Boolean
			}]
});

var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;