# Job Portal Management System

A full-featured Job Portal built with Laravel 9, Bootstrap 5, and MySQL.

## Features
- **Frontend**: Responsive Design, Hero Backgrounds, Job Listing Cards.
- **Backend**: Role-based Authentication (Admin, Employer, Seeker).
- **Admin**: Dashboard, User Management, Category Management.
- **Employer**: Post Jobs, Manage Applications.
- **Seeker**: Apply for jobs, Profile Management.

## Setup Instructions

1. **Database Setup**:
   - Create a MySQL database named `job_portal`.
   - Update `.env` (already configured).

2. **Installation**:
   ```bash
   composer install
   npm install && npm run build
   php artisan key:generate
   php artisan migrate --seed
   ```

3. **Running**:
   - `php artisan serve`
   - Visit `http://localhost:8000`

## Default Credentials
- **Admin**: `admin@example.com` / `password`
- **Employer**: `employer@example.com` / `password`
- **Job Seeker**: `seeker@example.com` / `password`

## Database Export
To export the database for phpMyAdmin:
- Run `mysqldump -u root job_portal > job_portal.sql` (if mysqldump is in PATH)
- Or use phpMyAdmin "Export" feature.

## Screenshots
(Generated automatically in browser)
