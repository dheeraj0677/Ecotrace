export function weeklyTemplate(name, stats) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Weekly EcoTrace Report</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7fafc;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #1b4332 0%, #2d9e6b 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 40px 30px;
            color: #2d3748;
            line-height: 1.6;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin: 20px 0;
          }
          .stat-box {
            background-color: #f7fafc;
            border: 1px solid #edf2f7;
            padding: 16px;
            text-align: center;
            border-radius: 8px;
          }
          .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #2d9e6b;
            margin-top: 4px;
          }
          .cta-button {
            display: inline-block;
            background-color: #2d9e6b;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
          }
          .footer {
            background-color: #edf2f7;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 Your Weekly Impact Report</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Here's a breakdown of your environmental conservation progress over the past week. You are doing amazing work!</p>
            
            <div class="stats-grid">
              <div class="stat-box">
                <div>Current Streak</div>
                <div class="stat-value">${stats.currentStreak} Days</div>
              </div>
              <div class="stat-box">
                <div>CO₂ Saved</div>
                <div class="stat-value">${stats.totalSavedKg} kg</div>
              </div>
              <div class="stat-box">
                <div>Active Pledges</div>
                <div class="stat-value">${stats.pledgesCount}</div>
              </div>
              <div class="stat-box">
                <div>Badges Unlocked</div>
                <div class="stat-value">${stats.badgesCount}</div>
              </div>
            </div>

            <center>
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" class="cta-button">View Your Dashboard</a>
            </center>

            <p>Keep tracking, keep pledging, and continue lowering your footprint. Every effort counts!</p>
            <p>Best regards,<br>The EcoTrace Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EcoTrace. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
