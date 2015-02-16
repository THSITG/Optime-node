var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
		id: Number,
		name: String,
		finished: Boolean,
		importance: Number,
		description: String
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
