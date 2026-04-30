const isAdmin = (req, res, next) => {
         if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ 
            message: "Access Denied: Only Admin can access this testing page." 
        });
    }
};

module.exports = { isAdmin }; 