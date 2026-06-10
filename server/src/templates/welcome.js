export function welcomeTemplate(name) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to EcoTrace</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7fafc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .content {
            padding: 40px 30px;
            color: #2d3748;
            line-height: 1.6;
          }
          .content h2 {
            color: #1a202c;
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .content p {
            font-size: 16px;
            margin-bottom: 24px;
            color: #4a5568;
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
            text-align: center;
            margin: 10px 0 30px 0;
            box-shadow: 0 4px 6px rgba(45, 158, 107, 0.2);
            transition: background-color 0.2s;
          }
          .cta-button:hover {
            background-color: #27845a;
          }
          .features {
            background-color: #f7fafc;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 30px;
            border: 1px solid #edf2f7;
          }
          .feature-item {
            display: flex;
            margin-bottom: 16px;
          }
          .feature-item:last-child {
            margin-bottom: 0;
          }
          .feature-icon {
            font-size: 20px;
            margin-right: 12px;
          }
          .feature-text h4 {
            margin: 0 0 4px 0;
            font-size: 16px;
            color: #2d3748;
          }
          .feature-text p {
            margin: 0;
            font-size: 14px;
            color: #718096;
          }
          .footer {
            background-color: #edf2f7;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
          }
          .footer a {
            color: #2d9e6b;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌱 Welcome to EcoTrace</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We are absolutely thrilled to welcome you to EcoTrace! By creating an account, you've taken an important first step towards tracking, understanding, and actively reducing your carbon footprint.</p>
            
            <div class="features">
              <div class="feature-item">
                <div class="feature-icon">📊</div>
                <div class="feature-text">
                  <h4>Calculate Your Footprint</h4>
                  <p>Input your home energy, transportation, flights, and dietary habits to see your annual CO₂ impact.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🎯</div>
                <div class="feature-text">
                  <h4>Pledge Green Actions</h4>
                  <p>Choose from 30+ eco-friendly challenges and build daily habits to lower your score.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🏆</div>
                <div class="feature-text">
                  <h4>Earn Badges & Rise</h4>
                  <p>Maintain your daily check-in streaks, earn beautiful achievements, and climb the leaderboards.</p>
                </div>
              </div>
            </div>

            <center>
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" class="cta-button">Go to Dashboard</a>
            </center>

            <p>Let's make a positive impact together!</p>
            <p>Best regards,<br>The EcoTrace Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EcoTrace. All rights reserved.</p>
            <p>Want to change how you receive emails? Adjust notifications in your <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/profile">Profile settings</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
