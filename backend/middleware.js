const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}

// const {JWT_SECRET} = require("./config");
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
// 	const headerAuth = req.headers.authorization;

// 	if (!headerAuth || !headerAuth.startsWith("Bearer ")) {
// 		console.log("Authorization header missing or does not start with 'Bearer'");
// 		return res.status(403).json({
// 			message: "token missing",
// 		});
// 	}

// 	const token = headerAuth.split(" ")[1];
// 	console.log("Token received:", token);

// 	try {
// 		const decoded = jwt.verify(token, JWT_SECRET);
// 		console.log("Decoded token:", decoded);

// 		// Ensure that the decoded token contains the userId property
// 		if (decoded) {
// 			req.userId = decoded.userId;
// 			console.log("User ID set in request:", req.userId);
// 			next();
// 		} else {
// 			console.log("Decoded token does not contain userId");
// 			return res.status(403).json({
// 				message: "decoded.userId doesn't exist in the headerAuth",
// 			});
// 		}
// 	} catch (error) {
// 		console.log("Token verification failed:", error);
// 		return res.status(403).json({
// 			message: "error 403 forbidden error",
// 		});
// 	}
// };

// module.exports = {authMiddleware};
