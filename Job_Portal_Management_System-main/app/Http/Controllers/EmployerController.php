<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmployerController extends Controller
{
    public function index() {
        $jobs = auth()->user()->jobs()->withCount('applications')->latest()->get();
        return view('employer.dashboard', compact('jobs'));
    }
}
