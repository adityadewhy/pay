const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Authorization header missing or incorrect format");
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        console.log(`Decoded userId: ${req.userId}`);
        next();
    } catch (err) {
        console.log("Token verification failed", err);
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}
