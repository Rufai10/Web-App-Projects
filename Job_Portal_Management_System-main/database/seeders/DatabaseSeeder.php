<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\JobCategory;
use App\Models\Job;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Employer
        $emp = User::create([
            'name' => 'Tech Corp',
            'email' => 'employer@example.com',
            'password' => Hash::make('password'),
            'role' => 'employer',
        ]);
        $emp->company()->create(['name' => 'Tech Corp Inc.', 'location' => 'San Francisco, CA']);

        // Job Seeker
        $seeker = User::create([
            'name' => 'John Doe',
            'email' => 'seeker@example.com',
            'password' => Hash::make('password'),
            'role' => 'job_seeker',
        ]);
        $seeker->profile()->create(['skills' => 'PHP, Laravel']);

        // Categories
        $cats = ['Software Development', 'Marketing', 'Design', 'Customer Support'];
        foreach($cats as $c) {
            JobCategory::create([
                'name' => $c,
                'slug' => \Illuminate\Support\Str::slug($c),
            ]);
        }

        // Jobs
        Job::create([
            'user_id' => $emp->id,
            'job_category_id' => 1,
            'title' => 'Senior Laravel Developer',
            'description' => 'We are looking for an experienced Laravel developer to join our team.',
            'salary' => '$100k - $120k',
            'location' => 'Remote',
            'type' => 'Full Time',
            'status' => 'active'
        ]);
    }
}
