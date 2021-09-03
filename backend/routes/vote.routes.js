const router = require("express").Router();

const Question = require("../models/question.model");
const Reply = require("../models/reply.model");
const QuestionVote = require("../models/question-vote.model");
const ReplyVote = require("../models/reply-vote.model");

// get all votes of a user
router.get("/user/:id", (req, res) => {
	Promise.all([QuestionVote.find({ userId: req.params.id }), ReplyVote.find({ userId: req.params.id })])
		.then((votes) => {
			return res.status(200).json({ success: true, votes });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// get a vote of a specific question
router.get("/user/:userId/question/:questionId/", (req, res) => {
	const { userId, questionId } = req.params;
	QuestionVote.find({ userId, questionId })
		.then((question) => {
			return res.status(200).json({ success: true, question });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// get a vote of a specific reply
router.get("/user/:userId/reply/:replyId/", (req, res) => {
	const { userId, replyId } = req.params;
	ReplyVote.find({ userId, replyId })
		.then((reply) => {
			return res.status(200).json({ success: true, reply });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// post a vote of a question
router.post("/user/:userId/question/:questionId/", (req, res) => {
	const { userId, questionId } = req.params;
	const { value } = req.body;

	const vote = new QuestionVote({
		userId,
		questionId,
		value: Number(value),
	});

	vote.save()
		.then((vote) => {
			Question.findByIdAndUpdate(
				questionId,
				{ $push: { votes: vote } },
				{ useFindAndModify: false, new: true },
				(err, question) => {
					if (err) {
						console.log(err);
						res.send(err);
					} else {
						console.log("Updated User: ", question);
						res.json(question);
					}
				}
			);
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// post a vote of a reply
router.post("/user/:userId/reply/:replyId/", (req, res) => {
	const { userId, replyId } = req.params;
	const { value } = req.body;

	const vote = new ReplyVote({
		userId,
		replyId,
		value: Number(value),
	});

	vote.save()
		.then((vote) => {
			Reply.findByIdAndUpdate(
				replyId,
				{ $push: { votes: vote } },
				{ useFindAndModify: false, new: true },
				(err, reply) => {
					if (err) {
						console.log(err);
						res.send(err);
					} else {
						console.log("Updated User: ", reply);
						res.json(reply);
					}
				}
			);
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

module.exports = router;
