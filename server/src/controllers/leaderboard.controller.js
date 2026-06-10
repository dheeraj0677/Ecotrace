import Footprint from '../models/Footprint.js';

export async function getLeaderboard(req, res) {
  try {
    const { period = 'month', limit = 50 } = req.query;
    let dateFilter = {};
    if (period === 'week') {
      dateFilter = { submitted_at: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
    } else if (period === 'month') {
      dateFilter = { submitted_at: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
    }

    const results = await Footprint.aggregate([
      { $match: dateFilter },
      { $sort: { submitted_at: -1 } },
      { $group: { _id: '$user_id', total_annual_tons: { $first: '$results.total_annual_tons' }, country: { $first: '$results.country' }, submitted_at: { $first: '$submitted_at' } } },
      { $sort: { total_annual_tons: 1 } },
      { $limit: parseInt(limit) },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user', pipeline: [{ $project: { name: 1, country: 1, avatar_color: 1 } }] } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    ]);

    const leaderboard = results.map((r, i) => ({
      rank: i + 1,
      name: r.user?.name || 'Anonymous',
      country: r.user?.country || r.country,
      avatar_color: r.user?.avatar_color,
      total_annual_tons: r.total_annual_tons,
    }));

    res.json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getMyRank(req, res) {
  try {
    const latest = await Footprint.findOne({ user_id: req.user._id }).sort({ submitted_at: -1 });
    if (!latest) return res.json({ success: true, data: { rank: null } });

    const better = await Footprint.aggregate([
      { $sort: { submitted_at: -1 } },
      { $group: { _id: '$user_id', total_annual_tons: { $first: '$results.total_annual_tons' } } },
      { $match: { total_annual_tons: { $lt: latest.results.total_annual_tons } } },
      { $count: 'count' },
    ]);
    const rank = (better[0]?.count || 0) + 1;
    res.json({ success: true, data: { rank, total_annual_tons: latest.results.total_annual_tons } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
