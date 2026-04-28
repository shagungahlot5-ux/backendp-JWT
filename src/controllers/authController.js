const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../db/db');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "User exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: "Registered!" });
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET || "my_backup_secret_key_123";
    
    const token = jwt.sign(
        { email: user.email }, 
        secret, 
        { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true }).json({ 
        message: "Logged in", 
        token: token 
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token').json({ message: "Signed out" });
};