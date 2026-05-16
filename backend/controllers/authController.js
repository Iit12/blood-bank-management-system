const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🔍 Login attempt for:", email);   // ← Debug log

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    console.log("👤 Users found:", users.length);   // ← Debug log

    if (users.length === 0) {
      console.log("❌ User not found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    console.log("🔑 Stored hashed password length:", user.password.length);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match result:", isMatch);   // ← Most important log

    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("✅ Login successful for:", user.name);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("💥 Login Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};