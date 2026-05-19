# Somalia Weather Information System (SWIS)
**Course Project for University Flutter Course**
**Lecturer:** SHARMAKE ALI KAHIE

## Project Context
A full-stack weather information system designed to provide real-time weather data and forecasts for Somali cities. The system includes a secure backend and a modern Flutter mobile application with separate dashboards for Administrators and regular Users.

## Features
### Admin Dashboard
- **User Management**: View and delete registered users.
- **City Management**: Full CRUD for Somali cities and regions.
- **Weather Management**: Full CRUD for historical and current weather data.
- **Statistics Overview**: Centralized control panel for system monitoring.

### User Dashboard
- **City Selection**: Select any registered Somali city to view weather.
- **Real-time Data**: Temperature, Condition, Humidity, Wind Speed.
- **5-Day Forecast**: Predictive weather patterns for the selected city.
- **Profile Management**: Account settings and theme customization.

## Technical Architecture
- **Frontend**: Flutter (Mobile Only)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: Provider

## Jira Task Breakdown (Project Management)

| Task ID | Component | Task Description | Assigned To | Status |
|---------|-----------|------------------|-------------|--------|
| **SWIS-1** | Backend | Project Architecture & MongoDB Connection Setup | Mohamed | Done |
| **SWIS-2** | Backend | Core Authentication System (JWT & Hashing) | Mohamed | Done |
| **SWIS-3** | Backend | Express Middleware & Security Implementation | Mohamed | Done |
| **SWIS-4** | Backend | Resource APIs (City, User, & Weather CRUD) | Ahmed | Done |
| **SWIS-5** | Backend | Statistical Data Generation & API Optimization | Ahmed | Done |
| **SWIS-6** | Backend | Database Seeding (50+ Cities & Records) | Ahmed | Done |
| **SWIS-7** | Frontend | Premium UI Redesign (Glassmorphism & Gradients) | Yasuu | Done |
| **SWIS-8** | Frontend | Advanced Scroll Animations & Weather Icons | Yasuu | Done |
| **SWIS-9** | Frontend | Responsive Weather Dashboard & Forecast Cards | Yasuu | Done |
| **SWIS-10**| Frontend | Role-Based Navigation & Access Control | Mohamed | Done |
| **SWIS-11**| Frontend | Admin Management Screens (Users/Cities) | Ahmed | Done |
| **SWIS-12**| Frontend | Statistics Visualization & Reporting UI | Yasuu | Done |

## Setup Instructions
### Backend
1. `cd backend`
2. `npm install`
3. Configure `.env` (use `.env.example` as template)
4. `node server.js`

### Frontend
1. Ensure Flutter is installed.
2. `flutter pub get`
3. `flutter run`

---
*Developed for academic evaluation compliance.*
