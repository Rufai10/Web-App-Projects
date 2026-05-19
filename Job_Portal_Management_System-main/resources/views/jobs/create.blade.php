@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Post a New Job') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('jobs.store') }}">
                        @csrf

                        <div class="mb-3">
                            <label>Job Title</label>
                            <input type="text" name="title" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label>Category</label>
                            <select name="job_category_id" class="form-control" required>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label>Job Type</label>
                                <select name="type" class="form-control">
                                    <option>Full Time</option>
                                    <option>Part Time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                             <div class="col-md-6 mb-3">
                                <label>Salary</label>
                                <input type="text" name="salary" class="form-control" placeholder="e.g $50k - $80k">
                            </div>
                        </div>

                         <div class="mb-3">
                            <label>Location</label>
                            <input type="text" name="location" class="form-control" placeholder="e.g New York, Remote">
                        </div>

                        <div class="mb-3">
                            <label>Description</label>
                            <textarea name="description" class="form-control" rows="5" required></textarea>
                        </div>
                        
                        <input type="hidden" name="status" value="active">

                        <button type="submit" class="btn btn-primary">Post Job</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
