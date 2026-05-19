@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Manage Users</h2>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>
                    <span class="badge bg-{{ $user->role=='admin'?'danger':($user->role=='employer'?'primary':'secondary') }}">
                        {{ $user->role }}
                    </span>
                </td>
                <td>{{ $user->created_at->format('Y-m-d') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    {{ $users->links() }}
</div>
@endsection
