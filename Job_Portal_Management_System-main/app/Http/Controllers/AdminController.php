<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\User;
use App\Models\Application;
use App\Models\JobCategory;

class AdminController extends Controller
{
    public function index() {
        $stats = [
            'jobs' => Job::count(),
            'employers' => User::where('role', 'employer')->count(),
            'seekers' => User::where('role', 'job_seeker')->count(),
            'applications' => Application::count(),
        ];
        return view('admin.dashboard', compact('stats'));
    }

    public function users() {
        $users = User::latest()->paginate(10);
        return view('admin.users', compact('users'));
    }

    public function categories() {
        $categories = JobCategory::all();
        return view('admin.categories', compact('categories'));
    }

    public function storeCategory(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255|unique:job_categories',
        ]);

        JobCategory::create([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
        ]);

        return back()->with('success', 'Category created successfully.');
    }
}
