<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Employer
            $table->foreignId('job_category_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('salary')->nullable();
            $table->string('location')->nullable();
            $table->string('type')->default('Full Time');
            $table->enum('status', ['active', 'inactive', 'closed'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};
