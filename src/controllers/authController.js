const jwt = require('jsonwebtoken');
const users = require('../db/db');

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

   if (!user) {
        console.log("User Not Found in DB!"); // Agar user match nahi hua
        return res.status(400).json({ message: "Invalid Credentials" });
    }
    const secret = process.env.JWT_SECRET || "my_backup_secret_123";
    
    const token = jwt.sign(
        { id: user.id, role: user.role }, 
        secret, 
        { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });
    res.json({ message: "Login Successful", token, role: user.role });
};

exports.signup = (req, res) => { res.json({ message: "Signup works" }); };
exports.signout = (req, res) => { res.clearCookie('token'); res.json({ message: "Signed out" }); };