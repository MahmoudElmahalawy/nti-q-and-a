const mongoose = require("mongoose");
const express = require("express");

//importing environment variables
require("dotenv/config");

const app = express();

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

// app.get("/", (req, res) => {
// 	res.send("Everything is working");
// });
