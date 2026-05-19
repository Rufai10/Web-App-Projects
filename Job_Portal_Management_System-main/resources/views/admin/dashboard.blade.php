@extends('layouts.app')

@section('content')
<div class="container-fluid px-5">
    <div class="dashboard-header d-flex justify-content-between align-items-center">
        <div>
            <h2 class="fw-bold text-primary">Admin Dashboard</h2>
            <p class="text-muted mb-0">Overview of system performance.</p>
        </div>
        <div>
            <a href="{{ route('admin.categories') }}" class="btn btn-outline-primary me-2"><i class="fas fa-folder me-2"></i>Categories</a>
            <a href="{{ route('admin.users') }}" class="btn btn-outline-dark"><i class="fas fa-users me-2"></i>Manage Users</a>
        </div>
    </div>

    <div class="row mb-5">
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card stat-card bg-gradient-primary h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Total Jobs</div>
                            <div class="h3 mb-0 font-weight-bold">{{ $stats['jobs'] }}</div>
                        </div>
                    </div>
                    <i class="fas fa-briefcase"></i>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card stat-card bg-gradient-success h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Employers</div>
                            <div class="h3 mb-0 font-weight-bold">{{ $stats['employers'] }}</div>
                        </div>
                    </div>
                    <i class="fas fa-building"></i>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card stat-card bg-gradient-info h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Job Seekers</div>
                            <div class="h3 mb-0 font-weight-bold">{{ $stats['seekers'] }}</div>
                        </div>
                    </div>
                    <i class="fas fa-user-graduate"></i>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card stat-card bg-gradient-warning h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Total Applications</div>
                            <div class="h3 mb-0 font-weight-bold">{{ $stats['applications'] }}</div>
                        </div>
                    </div>
                    <i class="fas fa-file-alt"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional sections like Recent Activity could go here -->
    <div class="row">
        <div class="col-12">
            <div class="alert alert-light border shadow-sm">
                <h4 class="alert-heading"><i class="fas fa-info-circle me-2"></i>Welcome Back!</h4>
                <p>Use the buttons above to manage system categories and users. System is currently running smoothly.</p>
            </div>
        </div>
    </div>
</div>
@endsection
