const router = require("express").Router();

const Reply = require("../models/reply.model");
const Question = require("../models/question.model");

// get all replies of a specific user
router.get("/user/:id", (req, res) => {
	Reply.find({ userId: req.params.id })
		.then((replies) => res.status(200).json({ success: true, replies }))
		.catch((e) => res.status(500).json({ success: false, error: e }));
});

// get all replies of a specific question
router.get("/question/:questionId/", (req, res) => {
	const { questionId } = req.params;

	Reply.find({ questionId })
		.then((replies) => {
			return res.status(200).json({ success: true, replies });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// add new reply
router.post("/user/:userId/question/:questionId", (req, res) => {
	const { userId, questionId } = req.params;
	const { replyType, replyText, replyChoice } = req.body;

	if (replyType === "choice" && !replyChoice) {
		return res.status(400).json({ success: false, error: "Choice for the reply must be provided" });
	}

	const reply = new Reply({
		userId,
		questionId,
		replyType,
		replyText,
		replyChoice,
	});

	reply
		.save()
		.then((reply) => {
			Question.findByIdAndUpdate(
				questionId,
				{ $push: { replies: reply } },
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

module.exports = router;
