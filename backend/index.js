const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");

//importing environment variables
require("dotenv/config");

//importing routes
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/question.routes");
const voteRoutes = require("./routes/vote.routes");
const replyRoutes = require("./routes/reply.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/votes", voteRoutes);
app.use("/replies", replyRoutes);
app.use("/posts", postRoutes);

//connecting to the database
mongoose
	.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		console.log("Connected to db successfully ...");
	})
	.catch((err) => {
		console.log(err);
	});

//starting the server
app.listen(process.env.PORT, () => {
	console.log(`Server is up and running at http://localhost:${process.env.PORT}/`);
});

// const Question = require("./models/question.model");

// app.post("/question", (req, res) => {
// 	const { questionType, questionText, questionChoices } = req.body;

// 	const question = new Question({ questionType, questionText, questionChoices });

// 	question
// 		.save()
// 		.then((question) => {
// 			res.send(question);
// 		})
// 		.catch((e) => {
// 			res.send(e);
// 		});
// });
