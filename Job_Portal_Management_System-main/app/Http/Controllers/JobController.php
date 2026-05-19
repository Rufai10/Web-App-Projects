<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\Application;

class JobController extends Controller
{
    public function index() {
        $jobs = Job::with(['user.company', 'category'])->where('status', 'active')->latest()->paginate(10);
        return view('jobs.index', compact('jobs'));
    }

    public function show($id) {
        $job = Job::with(['user.company', 'category'])->where('status', 'active')->findOrFail($id);
        return view('jobs.show', compact('job'));
    }

    public function create() {
        $categories = JobCategory::where('status', 1)->get();
        return view('jobs.create', compact('categories'));
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'job_category_id' => 'required',
            'type' => 'required',
            'status' => 'required'
        ]);

        auth()->user()->jobs()->create($data);
        return redirect()->route('employer.dashboard')->with('success', 'Job posted!');
    }

    public function destroy($id) {
        $job = auth()->user()->jobs()->findOrFail($id);
        $job->delete();
        return back()->with('success', 'Job deleted.');
    }

    public function showApplications($id) {
        $job = auth()->user()->jobs()->with('applications.user.profile')->findOrFail($id);
        return view('employer.applications', compact('job'));
    }

    public function apply($id) {
        $job = Job::findOrFail($id);
        
        // Check if already applied
        if(Application::where('job_id', $id)->where('user_id', auth()->id())->exists()) {
            return back()->with('error', 'You have already applied!');
        }

        Application::create([
            'job_id' => $id,
            'user_id' => auth()->id(),
            'status' => 'pending'
        ]);

        return back()->with('success', 'Application submitted!');
    }
}
