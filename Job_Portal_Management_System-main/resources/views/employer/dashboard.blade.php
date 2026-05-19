@extends('layouts.app')

@section('content')
<div class="container-fluid bg-light min-vh-100 p-0">
    <div class="d-flex">
        <!-- Sidebar Navigation (Responsive) -->
        <div class="bg-white border-end d-none d-md-block" style="width: 280px; min-height: 90vh;">
            <div class="p-4">
                <div class="d-flex align-items-center mb-4">
                     <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width:50px; height:50px;">
                        <i class="fas fa-building fa-lg"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-0 text-dark">{{ auth()->user()->company->name ?? 'Company' }}</h6>
                        <small class="text-muted">Employer Panel</small>
                    </div>
                </div>
                
                <h6 class="text-uppercase text-muted small fw-bold mb-3">Main Menu</h6>
                <ul class="nav flex-column gap-2">
                    <li class="nav-item">
                        <a href="{{ route('employer.dashboard') }}" class="nav-link active bg-primary text-white rounded">
                            <i class="fas fa-th-large me-2"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('jobs.create') }}" class="nav-link text-dark hover-bg-light rounded">
                            <i class="fas fa-plus-circle me-2"></i> Post a Job
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link text-dark hover-bg-light rounded">
                            <i class="fas fa-users me-2"></i> Candidates <span class="badge bg-danger rounded-pill float-end">New</span>
                        </a>
                    </li>
                     <li class="nav-item">
                        <a href="#" class="nav-link text-dark hover-bg-light rounded">
                            <i class="fas fa-cog me-2"></i> Settings
                        </a>
                    </li>
                </ul>

                <div class="mt-5 p-3 bg-light rounded border">
                    <h6 class="fw-bold mb-2">Need Help?</h6>
                    <p class="small text-muted mb-2">Contact our support team for any issues.</p>
                    <button class="btn btn-sm btn-outline-dark w-100" onclick="alert('Support System:\n\nThis would open a Live Chat widget (like Intercom or Tawk.to) or a Support Ticket form where you can submit your issue to the admin team.')">Contact Support</button>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-grow-1 p-4">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="fw-bold text-dark mb-0">Overview</h2>
                    <p class="text-muted">Welcome back, here's what's happening with your jobs.</p>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-white border shadow-sm"><i class="fas fa-bell text-muted"></i></button>
                    <a href="{{ route('jobs.create') }}" class="btn btn-primary shadow-sm"><i class="fas fa-plus me-2"></i>Create New Job</a>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="row g-4 mb-5">
                <div class="col-md-3">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <p class="text-muted mb-0 small text-uppercase fw-bold">Total Jobs</p>
                                    <h3 class="fw-bold mb-0 text-dark">{{ $jobs->count() }}</h3>
                                </div>
                                <div class="bg-primary bg-opacity-10 text-primary p-2 rounded">
                                    <i class="fas fa-briefcase"></i>
                                </div>
                            </div>
                            <small class="text-success"><i class="fas fa-arrow-up me-1"></i> 12% increase</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <p class="text-muted mb-0 small text-uppercase fw-bold">Total Applications</p>
                                    <h3 class="fw-bold mb-0 text-dark">{{ $jobs->sum('applications_count') }}</h3>
                                </div>
                                <div class="bg-success bg-opacity-10 text-success p-2 rounded">
                                    <i class="fas fa-users"></i>
                                </div>
                            </div>
                             <small class="text-success"><i class="fas fa-arrow-up me-1"></i> 5 new today</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <p class="text-muted mb-0 small text-uppercase fw-bold">Views</p>
                                    <h3 class="fw-bold mb-0 text-dark">1.2k</h3> <!-- Mock data -->
                                </div>
                                <div class="bg-info bg-opacity-10 text-info p-2 rounded">
                                    <i class="fas fa-eye"></i>
                                </div>
                            </div>
                             <small class="text-muted">Last 30 days</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card border-0 shadow-sm h-100 bg-primary text-white" style="background: linear-gradient(135deg, #0d6efd, #0a58ca);">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3">Verification</h5>
                            <p class="small opacity-75 mb-4">Verify your company to attract 3x more candidates.</p>
                            <button class="btn btn-light btn-sm w-100 text-primary fw-bold" onclick="alert('Verification Process:\n\nSubmit your business license and tax documents. Our team will review them within 24-48 hours. Verified companies get a blue tick and higher ranking.')">Get Verified</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Area: Job List -->
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold mb-0">Recent Job Postings</h5>
                    <div class="input-group w-auto">
                        <input type="text" class="form-control form-control-sm" placeholder="Search jobs...">
                        <button class="btn btn-outline-secondary btn-sm"><i class="fas fa-filter"></i></button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th class="ps-4">Job Details</th>
                                <th>Applicants</th>
                                <th>Status</th>
                                <th>Posted Date</th>
                                <th class="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($jobs as $job)
                            <tr>
                                <td class="ps-4">
                                    <div class="d-flex align-items-center">
                                        <div class="bg-light rounded p-2 me-3 text-secondary">
                                            <i class="fas fa-code"></i>
                                        </div>
                                        <div>
                                            <h6 class="fw-bold text-dark mb-0">{{ $job->title }}</h6>
                                            <small class="text-muted">{{ $job->location }}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex me-2">
                                            <!-- Mock avatars -->
                                            <div class="bg-secondary rounded-circle border border-white" style="width:30px;height:30px; margin-right:-10px;"></div>
                                            <div class="bg-info rounded-circle border border-white" style="width:30px;height:30px; margin-right:-10px;"></div>
                                            <div class="bg-success rounded-circle border border-white d-flex align-items-center justify-content-center text-white small" style="width:30px;height:30px; font-size:10px;">+{{ $job->applications_count }}</div>
                                        </div>
                                        <a href="{{ route('jobs.applications', $job->id) }}" class="text-decoration-none small ms-2 fw-bold">View All</a>
                                    </div>
                                </td>
                                <td>
                                    @if($job->status == 'active')
                                        <span class="badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill">Active</span>
                                    @else
                                        <span class="badge bg-secondary bg-opacity-10 text-secondary px-3 py-1 rounded-pill">Closed</span>
                                    @endif
                                </td>
                                <td>{{ $job->created_at->format('M d, Y') }}</td>
                                <td class="text-end pe-4">
                                    <div class="dropdown">
                                        <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                            <li><a class="dropdown-item" href="{{ route('jobs.show', $job->id) }}"><i class="fas fa-eye me-2 text-primary"></i> View Public</a></li>
                                            <li><a class="dropdown-item" href="{{ route('jobs.applications', $job->id) }}"><i class="fas fa-users me-2 text-info"></i> Manage Applicants</a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li>
                                                <form action="{{ route('jobs.destroy', $job->id) }}" method="POST">
                                                    @csrf @method('DELETE')
                                                    <button class="dropdown-item text-danger"><i class="fas fa-trash me-2"></i> Delete Job</button>
                                                </form>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="5" class="text-center py-5">
                                    <p class="text-muted">No jobs posted yet.</p>
                                    <a href="{{ route('jobs.create') }}" class="btn btn-primary btn-sm">Create First Job</a>
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
