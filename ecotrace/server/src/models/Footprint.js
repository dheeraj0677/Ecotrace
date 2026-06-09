import mongoose from 'mongoose';

const footprintSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  submitted_at: { type: Date, default: Date.now },
  inputs: { type: mongoose.Schema.Types.Mixed, required: true },
  results: {
    total_annual_tons: Number,
    total_annual_kg: Number,
    breakdown: {
      home_energy: Number,
      transport: Number,
      flights: Number,
      food: Number,
      lifestyle: Number,
    },
    grade: String,
    label: String,
    percentile: Number,
    trees_needed: Number,
    country: String,
    national_average: Number,
    world_average: Number,
    paris_target: Number,
  },
});

footprintSchema.index({ user_id: 1, submitted_at: -1 });

export default mongoose.model('Footprint', footprintSchema);
