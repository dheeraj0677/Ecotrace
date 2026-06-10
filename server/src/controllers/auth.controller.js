import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../config/email.js';
import { welcomeTemplate } from '../templates/welcome.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ecotrace-dev-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ecotrace-refresh-dev-secret';
const ACCESS_TOKEN_EXPIRES = '15m';
const REFRESH_TOKEN_EXPIRES = '7d';

function generateTokens(userId) {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
  const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
  return { accessToken, refreshToken };
}

export async function register(req, res) {
  try {
    const { name, email, password, country } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }
    const user = await User.create({ name, email, password, country: country || 'WORLD' });
    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refresh_token = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send welcome email
    try { await sendEmail({ to: email, subject: 'Welcome to EcoTrace! 🌱', html: welcomeTemplate(name) }); } catch (e) { /* silent */ }

    res.status(201).json({ success: true, data: { user, accessToken } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refresh_token = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, data: { user, accessToken } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function logout(req, res) {
  res.clearCookie('refreshToken');
  if (req.user) {
    req.user.refresh_token = null;
    await req.user.save();
  }
  res.json({ success: true, message: 'Logged out' });
}

export async function refreshToken(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ success: false, message: 'No refresh token' });

    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refresh_token !== token) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
    user.refresh_token = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, data: { accessToken } });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token expired' });
  }
}

export async function forgotPassword(req, res) {
  // Simplified — in production, generate reset token and send email
  res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
}
