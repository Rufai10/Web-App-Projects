@extends('layouts.app')

@section('content')
<div class="container px-4">
    <div class="dashboard-header d-flex justify-content-between align-items-center">
        <div>
            <h2 class="fw-bold text-dark">Welcome, {{ auth()->user()->name }}!</h2>
            <p class="text-muted mb-0">Track your applications and update your profile.</p>
        </div>
        <a href="{{ route('profile.edit') }}" class="btn btn-dark btn-lg rounded-pill shadow-sm">
            <i class="fas fa-user-edit me-2"></i>Edit Profile
        </a>
    </div>

    <div class="row">
        <div class="col-md-4 mb-4">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body text-center p-5">
                    @if(auth()->user()->profile && auth()->user()->profile->resume) 
                        <div class="mb-3 text-success">
                            <i class="fas fa-check-circle fa-3x"></i>
                        </div>
                        <h4 class="fw-bold">Profile Active</h4>
                        <p class="text-muted">Your CV is uploaded and ready for employers.</p>
                    @else
                        <div class="mb-3 text-warning">
                            <i class="fas fa-exclamation-circle fa-3x"></i>
                        </div>
                        <h4 class="fw-bold">Profile Incomplete</h4>
                        <p class="text-muted">Please upload your CV to improve your chances.</p>
                        <a href="{{ route('profile.edit') }}" class="btn btn-primary btn-sm rounded-pill">Update Now</a>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <h4 class="mb-3 fw-bold text-dark border-start border-4 border-info ps-3">Application History</h4>
            <div class="table-responsive">
                <table class="table table-custom w-100">
                    <thead>
                        <tr>
                            <th>Job Details</th>
                            <th>Company</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($applications as $app)
                        <tr>
                            <td>
                                <div class="fw-bold text-dark">{{ $app->job->title }}</div>
                                <span class="badge bg-light text-muted border">{{ $app->job->type }}</span>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="bg-light rounded-circle p-2 me-2 d-flex align-items-center justify-content-center" style="width:40px;height:40px">
                                        <i class="fas fa-building text-secondary"></i>
                                    </div>
                                    <div>{{ $app->job->user->company->name ?? 'Company' }}</div>
                                </div>
                            </td>
                            <td>{{ $app->created_at->format('M d, Y') }}</td>
                            <td>
                                @if($app->status == 'pending')
                                    <span class="badge bg-warning text-dark rounded-pill px-3"><i class="fas fa-clock me-1"></i> Pending</span>
                                @elseif($app->status == 'accepted')
                                    <span class="badge bg-success rounded-pill px-3"><i class="fas fa-check me-1"></i> Accepted</span>
                                @else
                                    <span class="badge bg-danger rounded-pill px-3"><i class="fas fa-times me-1"></i> {{ ucfirst($app->status) }}</span>
                                @endif
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="4" class="text-center py-5">
                                <img src="https://illustrations.popsy.co/gray/magnifying-glass.svg" height="100" class="mb-3 opacity-50">
                                <p class="text-muted mb-2">You haven't applied to any jobs yet.</p>
                                <a href="{{ route('jobs.index') }}" class="btn btn-primary rounded-pill px-4">Find Jobs Now</a>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
