var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Taskboards = new Schema({
		id: String,
		name: String,
		tasks: [{
				id: Number,
				source: Number
		}],
		members: [{
				id: String,
				admin: Boolean}]
});
