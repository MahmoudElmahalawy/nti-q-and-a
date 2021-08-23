const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username provided is not valid"],
		trim: true,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email provided is not valid"],
		trim: true,
		unique: true,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
