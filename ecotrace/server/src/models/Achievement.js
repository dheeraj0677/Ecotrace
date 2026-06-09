import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badge_id: { type: String, required: true },
  earned_at: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed,
});

achievementSchema.index({ user_id: 1, badge_id: 1 }, { unique: true });

export default mongoose.model('Achievement', achievementSchema);
