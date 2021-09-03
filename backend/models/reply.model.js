const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		questionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question",
		},
		replyType: {
			type: String,
			enum: ["text", "choice"],
			required: true,
		},
		replyText: {
			type: String,
			required: this.replyType === "text",
		},
		replyChoice: {
			type: String,
			required: this.replyType === "choice",
		},
		votes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "ReplyVote",
			},
		],
	},
	{ timestamps: true }
);

const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;
