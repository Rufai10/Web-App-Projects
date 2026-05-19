<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'JobPortal') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Styles -->
    <style>
        :root {
            --primary: #3b82f6; /* Lighter blue for dark mode */
            --secondary: #94a3b8;
            --dark: #f8fafc; /* Inverted for dark mode text */
            --light: #0f172a; /* Dark background */
        }

        body {
            font-family: 'Poppins', sans-serif;
            /* Darker background image */
            background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') no-repeat center center fixed;
            background-size: cover;
            min-height: 100vh;
            color: #e2e8f0; /* Light text */
        }

        /* Dark Overlay for readability */
        body::before {
            content: '';
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.85); /* Dark Slate overlay */
            z-index: -1;
        }

        /* Dark Glassmorphism Containers */
        .bg-white, .bg-light, .card, footer {
            background-color: rgba(30, 41, 59, 0.7) !important; /* Slate 800 transparent */
            backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(255,255,255,0.1);
            color: #e2e8f0;
        }

        /* Translucent Dark Navbar */
        .navbar {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        }

        .navbar-brand {
            font-weight: 800;
            color: #60a5fa !important; /* Blue 400 */
            font-size: 1.5rem;
        }

        .nav-link {
            font-weight: 500;
            color: #cbd5e1 !important; /* Slate 300 */
        }
        
        .nav-link:hover {
            color: #60a5fa !important;
        }

        .dropdown-menu {
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        }
        .dropdown-item { color: #e2e8f0; }
        .dropdown-item:hover { background-color: rgba(255,255,255,0.1); color: white; }

        .card {
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }
        
        .btn-primary {
            background-color: var(--primary);
            border-color: var(--primary);
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        /* Text Overrides for Dark Mode */
        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
            color: #f1f5f9 !important;
        }
        .text-muted {
            color: #94a3b8 !important; /* Slate 400 */
        }
        .text-dark {
            color: #f1f5f9 !important;
        }
        
        /* Dashboard specific */
        .dashboard-header {
             background: rgba(30, 41, 59, 0.8) !important;
             backdrop-filter: blur(10px);
             border-radius: 15px;
             padding: 2rem;
             margin-bottom: 2rem;
             box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        }
    </style>

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body class="d-flex flex-column min-vh-100">
    <div id="app" class="flex-grow-1">
        <nav class="navbar navbar-expand-md fixed-top">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    <i class="fas fa-briefcase me-2"></i>JobPortal
                </a>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span class="fas fa-bars"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto ms-4">
                        <li class="nav-item"><a class="nav-link" href="{{ route('home') }}">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="{{ route('jobs.index') }}">Find Jobs</a></li>
                        @auth
                             <li class="nav-item">
                                @if(Auth::user()->role == 'admin')
                                    <a class="nav-link text-primary" href="{{ route('admin.dashboard') }}">Admin</a>
                                @elseif(Auth::user()->role == 'employer')
                                    <a class="nav-link text-primary" href="{{ route('employer.dashboard') }}">Employer</a>
                                @else
                                    <a class="nav-link text-primary" href="{{ route('seeker.dashboard') }}">Dashboard</a>
                                @endif
                            </li>
                        @endauth
                    </ul>

                    <ul class="navbar-nav ms-auto align-items-center">
                        @guest
                            <li class="nav-item"><a class="nav-link" href="{{ route('login') }}">Login</a></li>
                            <li class="nav-item ms-2"><a class="btn btn-primary text-white rounded-pill px-4" href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                                    <img src="https://ui-avatars.com/api/?name={{ Auth::user()->name }}&background=2563eb&color=fff" class="rounded-circle me-2" width="32" height="32">
                                    {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        <i class="fas fa-sign-out-alt me-2 text-danger"></i> Logout
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4" style="margin-top: 80px;">
            @yield('content')
        </main>
    </div>

    <footer class="py-5 mt-auto border-top">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-muted">
                    <h5 class="fw-bold text-dark">JobPortal</h5>
                    <small>&copy; {{ date('Y') }} All rights reserved.</small>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-muted text-decoration-none me-3">Privacy</a>
                    <a href="#" class="text-muted text-decoration-none">Terms</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
