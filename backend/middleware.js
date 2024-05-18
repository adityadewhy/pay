const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const headerAuth = req.headers.authorization;

	if (!headerAuth.startsWith("Bearer ")) {
		return res.status(403).json({
			message: "token missing",
		});
	}

	const token = headerAuth.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		if (decoded.userId) {
			req.userId = decoded.userId;
			next();
		} else {
			return res.status(403).json({
				message: "decoded.userId doesnt exist in the headerAuth",
			});
		}
	} catch (error) {
		return res.status(403).json({
			message: "error 403 forbidden error",
		});
	}
};

module.exports = authMiddleware;
