var mongoose = require('mongoose');
var crypto = require('crypto');
var salt = "whyimsohandsome";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
		name: String, // User's displayed name, variable
		email: String, // Email, constant
		password: String, // Hashed password
		active: Boolean, // User Activation
		confirm: String, // Confirm code
		boards: [{ // User's task boards
				id: String, // Board id
				color: String, // Color for clients
				private: Boolean, // Is it the private board (initial board) of the user?
				admin: Boolean // Is the user the admin of the board?
		}]
});

UserSchema.statics.hashPassword = function(email,password) {
  var md5 = crypto.createHash('md5');
  token = password + email + salt;
  md5.update(token);
  return md5.digest('base64');
}

UserSchema.methods.validatePassword = function(input) {
  return this.model('User').hashPassword(this.email,input) == this.password;
}

var User = mongoose.model('User', UserSchema);

module.exports = User;
