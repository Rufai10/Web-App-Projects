@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Applications for: <strong>{{ $job->title }}</strong>
                    <a href="{{ route('employer.dashboard') }}" class="btn btn-sm btn-outline-secondary float-end">Back</a>
                </div>

                <div class="card-body">
                    @if($job->applications->count() > 0)
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Skills</th>
                                <th>Resume</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($job->applications as $app)
                            <tr>
                                <td>{{ $app->user->name }}</td>
                                <td>{{ $app->user->email }}</td>
                                <td>{{ $app->user->profile->skills ?? 'N/A' }}</td>
                                <td>
                                    @if($app->user->profile && $app->user->profile->resume)
                                        <a href="{{ $app->user->profile->resume }}" target="_blank">View Resume</a>
                                    @else
                                        N/A
                                    @endif
                                </td>
                                <td>{{ $app->created_at->diffForHumans() }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                    @else
                        <p class="text-center text-muted">No applications yet.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
