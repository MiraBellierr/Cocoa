const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	point: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('Quiz', QuizSchema);