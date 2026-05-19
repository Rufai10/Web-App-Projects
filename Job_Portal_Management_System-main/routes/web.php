<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobSeekerController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Auth::routes();

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show')->where('job', '[0-9]+');

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->as('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
    Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
});

// Employer Routes
Route::middleware(['auth', 'role:employer'])->prefix('employer')->group(function () {
    Route::get('/dashboard', [EmployerController::class, 'index'])->name('employer.dashboard');
    // Job management for employer
    Route::get('/jobs/{job}/applications', [JobController::class, 'showApplications'])->name('jobs.applications');
    Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
    Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
    Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
    Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
});

// Job Seeker Routes
Route::middleware(['auth', 'role:job_seeker'])->prefix('seeker')->group(function () {
    Route::get('/dashboard', [JobSeekerController::class, 'index'])->name('seeker.dashboard');
    Route::get('/profile', [JobSeekerController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [JobSeekerController::class, 'update'])->name('profile.update');
    Route::post('/apply/{job}', [JobController::class, 'apply'])->name('jobs.apply');
});
