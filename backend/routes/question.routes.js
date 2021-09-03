const router = require("express").Router();

const Question = require("../models/question.model");

// get all questions
router.get("/", (req, res) => {
	Question.find()
		.then((questions) => res.status(200).json({ success: true, questions }))
		.catch((e) => res.status(500).json({ success: false, error: e }));
});

// get question by id
router.get("/:id", (req, res) => {
	Question.findById(req.params.id)
		.then((question) => res.status(200).json({ success: true, question }))
		.catch((e) => res.status(500).json({ success: false, error: e }));
});

// get all questions of a user
router.get("/user/:id", (req, res) => {
	// User.findById(req.params.id)
	// 	.populate({ path: "questions", model: Question })
	// 	.select("questions")
	// 	.then((questions) => res.status(200).json({ success: true, questions }))
	// 	.catch((e) => res.status(500).json({ success: false, error: e }));

	Question.find({ userId: req.params.id })
		.then((questions) => res.status(200).json({ success: true, questions }))
		.catch((e) => res.status(500).json({ success: false, error: e }));
});

// add new question
router.post("/user/:id", (req, res) => {
	const { questionType, questionText, questionChoices } = req.body;

	if (questionType === "choice" && !questionChoices?.length) {
		return res.status(400).json({ success: false, error: "Choices for the question must be provided" });
	}

	const question = new Question({
		userId: req.params.id,
		questionType,
		questionText,
		questionChoices,
	});

	question
		.save()
		.then((question) => {
			return res.status(200).json({ success: true, question });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

module.exports = router;
