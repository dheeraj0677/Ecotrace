import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  action_id: { type: String, required: true },
  pledged_at: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completed_at: Date,
  co2_saved_kg: { type: Number, default: 0 },
});

actionSchema.index({ user_id: 1, action_id: 1 }, { unique: true });

export default mongoose.model('Action', actionSchema);
