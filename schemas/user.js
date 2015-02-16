var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
		name: String,
		email: String,
		password: String,
		boards: [{
				id: String,
				color: String,
				private: Boolean,
				admin: Boolean
		}]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;