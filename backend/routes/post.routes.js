const router = require("express").Router();

const Question = require("../models/question.model");

// get all posts
router.get("/", (req, res) => {
	Question.find()
		.populate({ path: "replies votes", populate: { path: "votes", model: "ReplyVote" } })
		.then((posts) => {
			return res.status(200).json({ success: true, posts });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// get all posts of a user
router.get("/user/:userId", (req, res) => {
	Question.find({ userId: req.params.userId })
		.populate({ path: "replies votes", populate: { path: "votes", model: "ReplyVote" } })
		.then((posts) => {
			return res.status(200).json({ success: true, posts });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

module.exports = router;
