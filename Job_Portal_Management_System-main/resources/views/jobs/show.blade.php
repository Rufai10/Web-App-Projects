@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <div class="row">
        <div class="col-md-8">
            <div class="card mb-4 shadow-sm">
                <div class="card-body p-5">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="fw-bold mb-0">{{ $job->title }}</h2>
                        <span class="badge bg-primary fs-6">{{ $job->type }}</span>
                    </div>

                    <div class="mb-4 text-muted">
                        <i class="fas fa-building me-2"></i> {{ $job->user->company->name ?? 'Company Name' }} &nbsp;|&nbsp;
                        <i class="fas fa-map-marker-alt me-2"></i> {{ $job->location }} &nbsp;|&nbsp;
                        <i class="fas fa-dollar-sign me-2"></i> {{ $job->salary ?? 'Negotiable' }}
                    </div>

                    <hr>

                    <h4 class="mt-4">Job Description</h4>
                    <p class="mb-4">{!! nl2br(e($job->description)) !!}</p>

                    @if(auth()->check() && auth()->user()->role == 'job_seeker')
                        <form action="{{ route('jobs.apply', $job->id) }}" method="POST">
                            @csrf
                            <button class="btn btn-primary btn-lg w-100 mt-3" onclick="return confirm('Apply for this job?')">Apply Now</button>
                        </form>
                    @elseif(auth()->check() && auth()->user()->role == 'employer')
                        <div class="alert alert-info">Identified as Employer. Cannot apply.</div>
                    @else
                        <a href="{{ route('login') }}" class="btn btn-primary btn-lg w-100 mt-3">Login to Apply</a>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card mb-4">
                <div class="card-header bg-dark text-white">Company Info</div>
                <div class="card-body text-center">
                    <img src="https://ui-avatars.com/api/?name={{ urlencode($job->user->company->name ?? 'C') }}&size=100" class="rounded-circle mb-3" alt="Logo">
                    <h5>{{ $job->user->company->name ?? 'Company' }}</h5>
                    <p class="text-muted">{{ $job->user->company->location ?? '' }}</p>
                    <a href="#" class="btn btn-outline-secondary btn-sm">Visit Website</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
