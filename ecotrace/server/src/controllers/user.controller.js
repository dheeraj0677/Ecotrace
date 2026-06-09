import User from '../models/User.js';
import Footprint from '../models/Footprint.js';

export async function getProfile(req, res) {
  res.json({ success: true, data: req.user });
}

export async function updateProfile(req, res) {
  try {
    const { name, country, preferences, avatar_color } = req.body;
    if (name) req.user.name = name;
    if (country) req.user.country = country;
    if (avatar_color) req.user.avatar_color = avatar_color;
    if (preferences) req.user.preferences = { ...req.user.preferences.toObject(), ...preferences };
    await req.user.save();
    res.json({ success: true, data: req.user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteAccount(req, res) {
  try {
    await req.user.deleteOne();
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getPublicScore(req, res) {
  try {
    const user = await User.findById(req.params.userId).select('name country badges_earned avatar_color');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const latest = await Footprint.findOne({ user_id: user._id }).sort({ submitted_at: -1 });
    res.json({
      success: true,
      data: {
        name: user.name,
        country: user.country,
        avatar_color: user.avatar_color,
        badges: user.badges_earned.map(b => b.badge_id),
        latest_footprint: latest ? latest.results : null
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
