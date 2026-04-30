const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;
    
    if (!token) return res.status(401).json({ message: "No Token, Access Denied" });

    try {
        const secret = process.env.JWT_SECRET || "my_backup_secret_123";
        const verified = jwt.verify(token, secret);
        req.user = verified; 
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware; 