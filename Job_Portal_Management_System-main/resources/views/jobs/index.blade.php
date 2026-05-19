@extends('layouts.app')

@section('content')
<div class="page-header text-center">
    <h1 class="fw-bold">Browse All Jobs</h1>
    <p class="lead">Success is just one application away.</p>
</div>

<div class="container">
    <div class="row">
        @foreach($jobs as $job)
        <div class="col-md-10 offset-md-1 mb-4">
            <div class="card p-3">
                <div class="row g-0 align-items-center">
                    <div class="col-md-2 text-center">
                        <img src="https://ui-avatars.com/api/?name={{ urlencode($job->user->company->name ?? 'Company') }}&background=random" class="rounded-circle" width="80" alt="Logo">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title mb-1">
                                <a href="{{ route('jobs.show', $job->id) }}" class="text-decoration-none text-dark">{{ $job->title }}</a>
                            </h5>
                            <p class="card-text text-muted small mb-2">
                                <i class="fas fa-building me-1"></i> {{ $job->user->company->name ?? 'Company' }} &bull; 
                                <i class="fas fa-map-marker-alt ms-2 me-1"></i> {{ $job->location ?? 'Remote' }}
                            </p>
                            <span class="badge bg-secondary">{{ $job->category->name ?? 'General' }}</span>
                            <span class="badge bg-success">{{ $job->type }}</span>
                        </div>
                    </div>
                    <div class="col-md-3 text-end px-3">
                        <a href="{{ route('jobs.show', $job->id) }}" class="btn btn-outline-primary rounded-pill px-4">Apply Now</a>
                        <p class="text-muted small mt-2">{{ $job->created_at->diffForHumans() }}</p>
                    </div>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    
    <div class="d-flex justify-content-center mt-4">
        {{ $jobs->links() }}
    </div>
</div>
@endsection
