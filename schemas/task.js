var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema({
		id: Number,
		name: String,
		finished: Boolean,
		importance: Number,
		description: String
});
