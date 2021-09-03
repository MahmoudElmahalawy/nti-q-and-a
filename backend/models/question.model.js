const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		questionType: {
			type: String,
			enum: ["text", "choice"],
			required: true,
		},
		questionText: {
			type: String,
			required: true,
		},
		questionChoices: {
			type: [String],
			validate(choices) {
				if (this.questionType === "choice") {
					return Array.isArray(choices) && choices.length > 1;
				}
			},
		},
		replies: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Reply",
			},
		],
		votes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "QuestionVote",
			},
		],
	},
	{ timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
