import Action from '../models/Action.js';

export async function pledgeAction(req, res) {
  try {
    const { action_id, co2_saved_kg } = req.body;
    const action = await Action.findOneAndUpdate(
      { user_id: req.user._id, action_id },
      { user_id: req.user._id, action_id, co2_saved_kg, pledged_at: new Date() },
      { upsert: true, new: true }
    );
    res.status(201).json({ success: true, data: action });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function unpledgeAction(req, res) {
  try {
    await Action.findOneAndDelete({ user_id: req.user._id, action_id: req.params.actionId });
    res.json({ success: true, message: 'Unpledged' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getMyPledges(req, res) {
  try {
    const actions = await Action.find({ user_id: req.user._id });
    res.json({ success: true, data: actions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function completeAction(req, res) {
  try {
    const action = await Action.findOneAndUpdate(
      { user_id: req.user._id, action_id: req.params.actionId },
      { completed: true, completed_at: new Date() },
      { new: true }
    );
    if (!action) return res.status(404).json({ success: false, message: 'Pledge not found' });
    res.json({ success: true, data: action });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
