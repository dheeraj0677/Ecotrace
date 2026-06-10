export function resetTemplate(name, resetUrl) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
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
            <h1>🔒 Reset Your Password</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>You recently requested to reset your password for your EcoTrace account. Click the button below to choose a new password. This link will expire shortly.</p>
            <center>
              <a href="${resetUrl}" class="cta-button">Reset Password</a>
            </center>
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>Thanks,<br>The EcoTrace Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EcoTrace. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
