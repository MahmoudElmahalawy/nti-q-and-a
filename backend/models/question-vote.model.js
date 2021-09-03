const mongoose = require("mongoose");

const QuestionVoteSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		questionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question",
			required: true,
		},
		value: {
			type: Number,
			enum: [1, -1],
			required: true,
		},
	},
	{ timestamps: true }
);

const QuestionVote = mongoose.model("QuestionVote", QuestionVoteSchema);

module.exports = QuestionVote;
