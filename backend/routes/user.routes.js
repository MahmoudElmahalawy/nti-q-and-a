const router = require("express").Router();

const User = require("../models/user.model");

// get all users
router.get("/", (req, res) => {
	User.find()
		.then((users) => res.status(200).json({ success: true, users }))
		.catch((e) => res.status(500).json({ success: false, error: e }));
});

// get user by id
router.get("/:id", (req, res) => {
	User.findById(req.params.id)
		.then((user) => res.status(200).json({ success: true, user }))
		.catch((e) => res.status(400).json({ success: false, error: e }));
});

// add new user
router.post("/register", (req, res) => {
	const { username, email, password } = req.body;
	passwordHash = password;

	const user = new User({
		username,
		email,
		passwordHash,
	});

	user.save()
		.then((user) => res.status(200).json({ success: true, user }))
		.catch((e) => {
			if (e.name === "MongoError" && e.code === 11000) {
				const uniquenessError = `${e.keyValue[Object.keys(e.keyValue)[0]]} is already used`;
				return res.status(400).json({ success: false, error: uniquenessError });
			}
			return res.status(400).json({ success: false, error: e });
			// console.log(e.keyValue[Object.keys(e.keyValue)[0]]);
		});
});

module.exports = router;
