import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  country: { type: String, default: 'WORLD' },
  avatar_color: { type: String, default: () => `hsl(${Math.floor(Math.random() * 360)}, 60%, 45%)` },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    last_checkin: { type: Date, default: null },
  },
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: {
      weekly_report: { type: Boolean, default: true },
      streak_reminder: { type: Boolean, default: true },
    },
    email_opt_in: { type: Boolean, default: true },
  },
  badges_earned: [{
    badge_id: String,
    earned_at: { type: Date, default: Date.now },
  }],
  notifications: [{
    icon: String,
    title: String,
    message: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  }],
  refresh_token: String,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refresh_token;
  return obj;
};

export default mongoose.model('User', userSchema);
