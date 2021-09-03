const mongoose = require("mongoose");

const ReplyVoteSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		replyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Reply",
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

const ReplyVote = mongoose.model("ReplyVote", ReplyVoteSchema);

module.exports = ReplyVote;
