<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct() {
    //     $this->middleware('auth'); 
    // } // Removed auth requirement for Home to allow public access

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $featuredJobs = Job::with('user.company')->where('status', 'active')->latest()->take(6)->get();
        $categories = \App\Models\JobCategory::where('status', true)->take(8)->get();
        return view('home', compact('featuredJobs', 'categories'));
    }
}
