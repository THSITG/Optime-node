var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
		id: String,
		name: String,
		email: String,
		boards: [{
				id: String,
				color: String,
				private: Boolean,
				admin: Boolean
		}]
});
