const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers.token;

    if (!token) return res.status(401).send("Unuthorized");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).send("Access denied. Admins only.");
    }
}

module.exports = { verifyToken, isAdmin };


