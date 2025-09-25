// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const payload = {
      userId: user._id.toString(),
      role: user.role,
      tenantId: user.tenantId.toString(),
      tenantSlug: user.tenantSlug
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        tenantSlug: user.tenantSlug
      }
    });
  } catch (err) {
    next(err);
  }
};
