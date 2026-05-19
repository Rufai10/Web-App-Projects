@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Edit Profile') }}</div>
                <div class="card-body">
                    <form method="POST" action="{{ route('profile.update') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <label>Skills</label>
                            <input type="text" name="skills" class="form-control" value="{{ $profile->skills ?? '' }}" placeholder="e.g PHP, Laravel, React">
                        </div>
                        <div class="mb-3">
                            <label>Bio</label>
                            <textarea name="bio" class="form-control" rows="3">{{ $profile->bio ?? '' }}</textarea>
                        </div>
                        <div class="mb-3">
                            <label>Resume (PDF/Doc)</label>
                            <input type="file" name="resume" class="form-control">
                            @if($profile->resume)
                                <small class="text-success">Current Resume: <a href="{{ asset('storage/' . $profile->resume) }}" target="_blank">View</a></small>
                            @endif
                        </div>
                        <button class="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
