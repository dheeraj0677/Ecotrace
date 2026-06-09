# 🌱 EcoTrace — Carbon Footprint Tracker

EcoTrace is a premium, visually stunning, production-ready carbon footprint tracker web application built with a modern React frontend and a Node.js + Express backend. The application tracks user carbon emissions across housing, transport, flights, food, and lifestyle, offering personalized AI insights, leaderboard competition, daily streaks, action pledges, and offset matching.

---

## ✨ Features

- **📊 Comprehensive Carbon Calculator:** 5-step interactive form with real-time visual results, percentile calculations, and paris agreement target comparisons.
- **📈 Dynamic Dashboards:** Visualizations using Recharts (monthly trends, category breakdowns, tree-offset equivalence, global/national comparison).
- **🏆 Gamified Leaderboards:** Compete globally, regionally, or with friends. Earn dynamic achievement badges.
- **🔥 Habit & Streak Tracking:** Log check-ins, maintain streaks, and receive automated email reminders.
- **🌱 Offset Marketplace:** Match and calculate offset costs for real-world environmental projects.
- **📚 Education & Action Hubs:** Read and search eco-articles, pledge 30+ custom green actions, and mark them completed.
- **🌗 Dark Mode & Premium UI:** Curated color palettes, glassmorphism design elements, responsive layouts, and page transitions via Framer Motion.
- **📧 Advanced Email Systems:** Automated registration welcome emails, weekly summary digests, and streak reminders using Nodemailer.
- **📲 Progressive Web App (PWA):** Installable web app with custom manifest and SVG brand assets.

---

## 🛠️ Tech Stack

### Frontend
- **React 18 + Vite** (Fast builds & hot module reloading)
- **TailwindCSS** (Custom theme, custom animations, unified dark mode)
- **Framer Motion** (Sleek transitions & micro-animations)
- **Recharts** (Interactive data visualization graphs)
- **Zustand** (Global state management with local persistence)
- **React Hook Form + Zod** (Rigorous form validation)
- **Axios** (With interceptors for automatic JWT token rotation)
- **React Hot Toast** (Premium notification system)
- **html2canvas + jsPDF** (Exportable PDF carbon certificate and CSV data logs)

### Backend
- **Node.js + Express** (Fast, unopinionated routing framework)
- **MongoDB + Mongoose** (NoSQL database for flexible storage schemas)
- **JWT Auth** (Secure access token in memory & HTTP-Only refresh token cookie rotation)
- **bcryptjs** (Industry-standard password hashing)
- **Nodemailer** (SMTP transactional email dispatching)
- **node-cron** (Scheduled recurring reports and daily streak checking)
- **Joi** (Express request body validator schema middleware)

---

## 📁 Project Structure

```
ecotrace/
├── client/                 # Frontend (Vite + React)
│   ├── public/             # PWA assets & manifest
│   ├── src/
│   │   ├── components/     # UI, Layout, Shared, Calculator components
│   │   ├── data/           # Static articles, countries, actions, badges
│   │   ├── hooks/          # React hooks (auth, calculator, storage)
│   │   ├── lib/            # Axios instance
│   │   ├── pages/          # 13 Application Pages
│   │   ├── store/          # Zustand state stores
│   │   ├── utils/          # Calculations & grade engine
│   │   └── App.jsx & main.jsx
│   └── package.json
└── server/                 # Backend (Node.js + Express)
    ├── src/
    │   ├── config/         # Mongoose & Nodemailer connectors
    │   ├── controllers/    # API Request Handlers
    │   ├── middleware/     # Auth, validation, rate-limiting
    │   ├── models/         # Mongoose DB Schemas
    │   ├── routes/         # Express API Route Declarations
    │   ├── scripts/        # Seeding scripts (50 users)
    │   ├── services/       # Cron services
    │   ├── templates/      # HTML email templates (Welcome, Reset, Weekly)
    │   └── index.js        # Server Entry point
    └── package.json
```

---

## ⚡ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

### Server Configuration
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env` (use `.env.example` as a template).
4. Seed the database (Populates 50 users, footprints, pledges, and streaks):
   ```bash
   npm run seed
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

### Client Configuration
1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend dev server:
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:5173`.

---

## 📡 API Reference

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/health` | GET | None | Server Health Check |
| `/api/v1/auth/register` | POST | None | Create account & send welcome email |
| `/api/v1/auth/login` | POST | None | Authenticate user & issue tokens |
| `/api/v1/auth/refresh` | POST | None | Rotate access/refresh tokens |
| `/api/v1/auth/logout` | POST | JWT | Revoke user tokens & clear cookie |
| `/api/v1/footprint` | POST | JWT | Save a new footprint computation |
| `/api/v1/footprint/history`| GET | JWT | Fetch previous 50 footprint reports |
| `/api/v1/footprint/latest` | GET | JWT | Retrieve latest footprint calculation |
| `/api/v1/actions/pledge` | POST | JWT | Pledge a new green action |
| `/api/v1/actions/pledges` | GET | JWT | Fetch user's active/completed pledges |
| `/api/v1/leaderboard` | GET | None | Retrieve global or regional rankings |
| `/api/v1/user/profile` | GET | JWT | Fetch current user account details |
| `/api/v1/user/public/:id` | GET | None | Shareable user stats details page |
