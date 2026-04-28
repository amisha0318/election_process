# VoteWise: Election Process Education Assistant

VoteWise is a comprehensive, AI-powered platform designed to empower US citizens with verified, accessible information about the election process. It simplifies the journey from registration to casting a ballot.

## 🇺🇸 Project Overview
- **Vertical**: Election Process Education
- **Goal**: Reduce barriers to voting by providing real-time, state-specific information in an interactive, user-friendly format.

## 🛠️ Architecture & Logic
- **Frontend**: React 18 with Vite for speed. Framer Motion for premium animations.
- **Backend**: Node.js/Express acts as a secure proxy to Google APIs, protecting sensitive keys and implementing rate limiting.
- **AI Engine**: Google Gemini 1.5 Pro handles complex natural language queries about constitutional law and voting procedures.
- **Data Layer**: 
    - **Google Civic Information API**: Real-time polling locations, early voting sites, and representative contact data.
    - **Firebase Firestore**: Securely stores user preferences and chat history.
    - **Firebase Auth**: Google Sign-In for a personalized experience.

## 🌟 Google Services Integration
1. **Google Gemini API**: Powers the "24/7 Election Assistant" chatbot.
2. **Google Civic Information API**: Fetches live data for polling places and candidates.
3. **Google Maps Embed API**: Provides interactive visual context for voting locations.
4. **Google Calendar API**: Allows users to sync critical election dates to their personal schedules.
5. **Google Cloud Translation API**: Full support for Spanish and other languages.
6. **Firebase (GCP)**: Authentication and NoSQL database.

## 🚀 Setup Instructions

### Environment Variables
Create a `.env` file in the `server/` directory and `client/` directory (for VITE_ variables):

**Server `.env`:**
```env
GEMINI_API_KEY=...
GOOGLE_CIVIC_API_KEY=...
GOOGLE_MAPS_API_KEY=...
FIREBASE_SERVICE_ACCOUNT=...
PORT=5000
```

**Client `.env`:**
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_GOOGLE_MAPS_API_KEY=...
```

### Running Locally
1. **Install Dependencies**:
   ```bash
   npm install # in both client and server folders
   ```
2. **Start Development Servers**:
   - Backend: `cd server && npm run dev`
   - Frontend: `cd client && npm run dev`

## 🧪 Testing
- **Unit Tests**: `npm test` (Uses Vitest and React Testing Library)
- **Accessibility**: `npm run test:a11y` (Uses jest-axe to verify WCAG AA compliance)
- **Manual Verification**: Test keyboard navigation (Tab/Enter) and screen reader compatibility.

## 🚢 Deployment
The project is configured for **Google Cloud Run**.
- **Cloud Build**: Use `gcloud builds submit --config cloudbuild.yaml` to automate the build and deployment.
- **Docker**: A multi-stage `Dockerfile` is included for efficient builds.

## 🛡️ Security & Accessibility
- **Security**: Implements Helmet, Rate Limiting, and Input Sanitization. Server-side proxying ensures no Google API keys are exposed to the client.
- **Accessibility**: Follows WCAG 2.1 AA standards. Includes ARIA labels, semantic HTML, and high-contrast focus indicators.

## 🔮 Future Improvements
- **Live Ballot Tracking**: Integration with state-level ballot tracking systems.
- **SMS Reminders**: Twilio integration for election day alerts.
- **Voice Navigation**: Integration with Google Assistant for hands-free queries.

---
*Non-partisan. For educational purposes only. Always verify with official sources like vote.gov.*
