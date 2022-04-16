var express = require("express");
var app = express();
var fs = require("fs");

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/login.html");
});

app.get("/signup", function (req, res) {
	res.sendFile(__dirname + "/public/signup.html");
});

app.post("/login", function (req, res) {
	var userData = req.body;
	// console.log(`this is the user data: ${userData}`);
	var user = {
		email: userData.email,
		password: userData.password,
	};

	// console.log(`this is the user EMAIL : ${user.email}`);
	// console.log(`this is the user PASSWORD : ${user.password}`);

	fs.readFile("./db.txt", "utf-8", function (err, data) {
		if (err) {
			res.end("0");
		} else {
			if (data.length > 0) {
				var users = JSON.parse(data);
				console.log(`this is parsed data: ${users}`);

				if (users.length > 0) {
					var found = false;
					for (var i = 0; i < users.length; i++) {
						if (users[i].email == userData.email) {
							found = true;
							break;
						}
					}
				}

				if (found) {
					res.end("1");
				} else {
					res.end("0");
				}
			} else res.end("0");

			// console.log(`this is the data: ${data}`);
		}
	});
});

app.post("/signup", function (req, res) {
	var userData = req.body;
	var found = false;
	// console.log(`this is the user data: ${userData}`);
	// console.log(`this is the user EMAIL : ${userData.email}`);
	// console.log(`this is the user PASSWORD : ${userData.password}`);

	var users = [];

	fs.readFile("./db.txt", "utf-8", function (err, data) {
		if (err) {
			res.end("0");
		} else {
			if (data.length > 0) {
				users = JSON.parse(data);
				for (var i = 0; i < users.length; i++) {
					if (users[i].email == userData.email) {
						res.end("2");
						found = true;
					}
				}
			}

			if (!found) {
				users.push({
					email: userData.email,
					password: userData.password,
				});

				console.log(`this is the users: ${users}`);

				fs.writeFile("./db.txt", JSON.stringify(users), function (err) {
					if (err) {
						res.end("0");
						return;
					}
					res.end("1");
				});
			}
		}
	});
});

app.get("/home", function (req, res) { 
    res.sendFile(__dirname + "/public/home.html");
});

app.listen(3000, function () {
	console.log("Example app listening on port 3000!");
});
