const config = require("../config/credentials.json");

const auth = function (req, res, next) {
	console.log(req.signedCookies);

	if (!req.signedCookies.user) {
		// console.log(req.headers);
		var authHeader = req.headers.authorization;
		if (!authHeader) {
			var err = new Error("Unauthorized Request");
			res.setHeader("WWW-Authenticate", "basic");
			err.status = 401;
			return next(err);
		}
		var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
			.toString()
			.split(":");
		console.log("auth: ", auth);
		var username = auth[0];
		var password = auth[1];
		console.log(username, config.USERNAME);
		console.log(password, config.PASSWORD);
		if (username === config.USERNAME && password === config.PASSWORD) {
			res.cookie("user", username, { signed: true });
			next();
		} else {
			var err = new Error("Unauthorized Request");
			res.setHeader("WWW-Authenticate", "basic");
			err.status = 401;
			return next(err);
		}
	} else {
		if (req.signedCookies.user === config.USERNAME) {
			next();
		} else {
			var err = new Error("Unauthorized Request");
			err.status = 401;
			return next(err);
		}
	}
};
module.exports = auth;
