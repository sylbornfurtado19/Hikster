# Hikster

Hikster is a static multi-page trekking planner built with HTML, CSS, and vanilla JavaScript.

## Features

- Destination discovery and trek detail pages
- Quiz-based recommendation flow
- Favorites, reviews, and activity history
- Multi-step booking experience
- Login/signup/profile flow using browser localStorage

## Tech

- HTML, CSS, JavaScript
- Tailwind CSS (CDN)
- Font Awesome (CDN)

## Run Locally

Use any static server from the project root.

```bash
python -m http.server 5500
```

Open http://localhost:5500/index.html

## Java Email OTP Verification (New)

A Java backend is included in `backend-java` for email OTP verification.

1. Start the Java server:

```bash
cd backend-java
mvn clean compile exec:java
```

2. Configure SMTP (required for real email sending):

- `HIKSTER_SMTP_HOST`
- `HIKSTER_SMTP_PORT` (default `587`)
- `HIKSTER_SMTP_USER`
- `HIKSTER_SMTP_PASS`
- `HIKSTER_SMTP_FROM`

3. Dev mode (no SMTP):

- Set `HIKSTER_DEV_OTP_LOG=true` to print OTP in terminal.

The frontend calls these Java endpoints:

- `POST /api/auth/request-otp`
- `POST /api/auth/resend-otp`
- `POST /api/auth/verify-otp`

## Main Pages

- index.html, signup.html, home.html
- all-destinations.html, destination.html
- quiz.html, recommendation.html
- book.html, favorites.html, history.html
- reviews.html, profile.html, verify.html

## Core Scripts

- script.js: destinations, cards, scoring, favorites helpers
- navbar.js: shared responsive navigation
- itinerary-modal.js + itinerary-modal.css: itinerary modal UI

## Local Storage Keys

- hiksterUsers
- hiksterUser
- favorites
- hiksterHistory
- hiksterBookings
- hiksterReviews

## Notes

- No backend/database in this version.
- Auth is client-side only (not production secure).
- Data is saved per browser/device.
