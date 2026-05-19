---
description: How to start the Somalia Weather App (Backend + Frontend)
---

To ensure the app works correctly and avoids "Failed to Fetch" errors, follow these steps:

1. **Start the Backend Server**
   - Open a terminal in the `backend` folder.
   - Run: `node server.js`
   - Wait for the message: `Successfully connected to MongoDB` and `Server is running on http://0.0.0.0:5000`.

2. **Start the Flutter App**
   - Open a new terminal in the project root.
   - Run: `flutter run -d chrome` (or your preferred device).
   - Once the app loads, login with your credentials.

3. **Keep Terminals Open**
   - Both terminals must remain open while you are using the app. If you close the `node server.js` terminal, the app will lose connection.

// turbo
4. Run Backend: `node backend/server.js`
5. Run Frontend: `flutter run -d chrome`
