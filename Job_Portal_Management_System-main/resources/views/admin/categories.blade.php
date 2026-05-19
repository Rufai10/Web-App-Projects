@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Job Categories</h2>
    <!-- Add form (mockup) -->
    <div class="card mb-4 p-3">
        <h5>Add New Category</h5>
        <form action="{{ route('admin.categories.store') }}" method="POST">
            @csrf
            <div class="input-group">
                <input type="text" name="name" class="form-control" placeholder="Category Name" required>
                <button class="btn btn-success">Add</button>
            </div>
        </form>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $cat)
            <tr>
                <td>{{ $cat->id }}</td>
                <td>{{ $cat->name }}</td>
                <td>{{ $cat->slug }}</td>
                <td>{{ $cat->status ? 'Active' : 'Inactive' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
