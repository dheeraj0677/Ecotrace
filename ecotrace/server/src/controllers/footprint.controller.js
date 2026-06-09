import Footprint from '../models/Footprint.js';

export async function saveFootprint(req, res) {
  try {
    const footprint = await Footprint.create({
      user_id: req.user._id,
      inputs: req.body.inputs,
      results: req.body.results,
    });
    res.status(201).json({ success: true, data: footprint });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getHistory(req, res) {
  try {
    const footprints = await Footprint.find({ user_id: req.user._id })
      .sort({ submitted_at: -1 })
      .limit(50);
    res.json({ success: true, data: footprints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getLatest(req, res) {
  try {
    const latest = await Footprint.findOne({ user_id: req.user._id })
      .sort({ submitted_at: -1 });
    res.json({ success: true, data: latest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteFootprint(req, res) {
  try {
    await Footprint.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
