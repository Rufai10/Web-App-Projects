<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class JobSeekerController extends Controller
{
    public function index() {
        $applications = auth()->user()->applications()->with('job.user.company')->latest()->get();
        return view('seeker.dashboard', compact('applications'));
    }

    public function edit() {
        $profile = auth()->user()->profile;
        return view('seeker.profile', compact('profile'));
    }

    public function update(Request $request) {
        $data = $request->validate([
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'skills' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);
        
        if ($request->hasFile('resume')) {
            $path = $request->file('resume')->store('resumes', 'public');
            $data['resume'] = $path;
        } else {
            unset($data['resume']);
        }

        auth()->user()->profile()->update($data);
        return back()->with('success', 'Profile updated successfully.');
    }
}
