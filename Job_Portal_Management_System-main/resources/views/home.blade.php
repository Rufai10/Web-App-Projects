@extends('layouts.app')

@section('content')
<style>
    .hero-section-real {
        /* No background here, using global body background */
        background: transparent;
        min-height: 80vh;
        display: flex;
        align-items: center;
        color: #2c3e50; 
    }
    .hero-section-real h1, .hero-section-real p {
        color: #0f172a;
        text-shadow: 0 2px 4px rgba(255,255,255,0.8);
    }
    .trust-badge {
        background: rgba(255,255,255,0.4);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: 10px;
        padding: 15px;
    }
    .company-logo-grid img {
        height: 40px;
        opacity: 0.6;
        transition: opacity 0.3s;
        filter: grayscale(100%);
    }
    .company-logo-grid img:hover {
        opacity: 1;
        filter: grayscale(0%);
    }
    .feature-icon-box {
        width: 60px;
        height: 60px;
        background: rgba(13, 110, 253, 0.1);
        color: #0d6efd;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        backdrop-filter: blur(5px);
    }
    .testimonial-card {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 15px;
        padding: 2rem;
        border-left: 5px solid #0d6efd;
        backdrop-filter: blur(5px);
    }
</style>

<!-- Modern Realistic Hero -->
<div class="hero-section-real w-100" style="margin-top:-1.5rem">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-7">
                <span class="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold"><i class="fas fa-star me-2"></i>#1 Job Portal</span>
                <h1 class="display-3 fw-bold mb-4" style="line-height: 1.1;">Build Your Career With <span class="text-primary">Top Companies</span></h1>
                <p class="lead mb-5 fw-bold" style="color: #475569;">Connect with 10,000+ top employers. We help you find a job that fits your life and skills.</p>
                
                <div class="bg-white bg-opacity-75 p-3 rounded shadow-lg d-md-flex align-items-center gap-2" style="backdrop-filter: blur(10px);">
                    <div class="flex-grow-1 mb-2 mb-md-0">
                        <div class="input-group">
                            <span class="input-group-text bg-transparent border-0"><i class="fas fa-search text-muted"></i></span>
                            <input type="text" class="form-control border-0 bg-transparent" placeholder="Job title or keyword...">
                        </div>
                    </div>
                    <div class="vr d-none d-md-block mx-2"></div>
                    <div class="flex-grow-1 mb-2 mb-md-0">
                         <div class="input-group">
                            <span class="input-group-text bg-transparent border-0"><i class="fas fa-map-marker-alt text-muted"></i></span>
                            <input type="text" class="form-control border-0 bg-transparent" placeholder="City or zip code">
                        </div>
                    </div>
                    <button class="btn btn-primary btn-lg px-5">Search</button>
                </div>
                <div class="mt-4 small fw-bold" style="color: #475569;">
                    <i class="fas fa-check-circle text-success me-1"></i> Free to join
                    <span class="mx-2">&bullet;</span>
                    <i class="fas fa-check-circle text-success me-1"></i> Verified Companies
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Trusted Companies Section -->
<div class="py-5 border-bottom" style="background: rgba(255,255,255,0.6); backdrop-filter: blur(5px);">
    <div class="container">
        <p class="text-center text-muted fw-bold small text-uppercase mb-4">Trusted by industry leaders</p>
        <div class="row justify-content-center align-items-center text-center company-logo-grid g-4">
            <div class="col-6 col-md-2"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" class="img-fluid"></div>
            <div class="col-6 col-md-2"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" class="img-fluid"></div>
            <div class="col-6 col-md-2"><img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" class="img-fluid"></div>
            <div class="col-6 col-md-2"><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" class="img-fluid"></div>
            <div class="col-6 col-md-2"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" class="img-fluid"></div>
        </div>
    </div>
</div>

<!-- Why Choose Us -->
<div class="py-5" style="background: rgba(248, 249, 250, 0.4);">
    <div class="container py-4">
        <div class="row align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="img-fluid rounded-3 shadow-lg" alt="Office Life" style="opacity: 0.9;">
            </div>
            <div class="col-lg-6 ps-lg-5">
                <h2 class="fw-bold mb-4">Why we are the best choice for your career</h2>
                <p class="text-muted mb-4 lead">We don't just list jobs; we provide a platform for professional growth.</p>
                
                <div class="d-flex mb-4">
                    <div class="feature-icon-box flex-shrink-0">
                        <i class="fas fa-search-dollar"></i>
                    </div>
                    <div class="ms-3">
                        <h5 class="fw-bold">Transparent Salaries</h5>
                        <p class="text-muted">No more guessing. See the salary range upfront for most listings.</p>
                    </div>
                </div>
                
                <div class="d-flex mb-4">
                    <div class="feature-icon-box flex-shrink-0">
                        <i class="fas fa-file-signature"></i>
                    </div>
                    <div class="ms-3">
                        <h5 class="fw-bold">Quick Apply</h5>
                        <p class="text-muted">One click application using your stored profile.</p>
                    </div>
                </div>

                <div class="d-flex">
                    <div class="feature-icon-box flex-shrink-0">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="ms-3">
                        <h5 class="fw-bold">Verified Jobs</h5>
                        <p class="text-muted">We verify every employer to ensure your safety and privacy.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Featured Jobs -->
<div class="container py-5">
    <div class="d-flex justify-content-between align-items-end mb-4">
        <div>
            <h2 class="fw-bold">Latest Job Openings</h2>
            <p class="text-muted mb-0">Explore the most recent opportunities posted by top companies.</p>
        </div>
        <a href="{{ route('jobs.index') }}" class="btn btn-outline-primary shadow-sm bg-white">View All Jobs <i class="fas fa-arrow-right ms-2"></i></a>
    </div>

    <div class="row g-4">
        @foreach($featuredJobs as $job)
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm hover-up">
                <div class="card-body p-4">
                    <div class="d-flex align-items-start justify-content-between mb-3">
                         <div class="bg-light rounded p-2" style="width: 50px; height: 50px; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-building text-primary"></i>
                        </div>
                        <span class="badge bg-light text-dark">{{ $job->type }}</span>
                    </div>
                    <h5 class="fw-bold mb-1">{{ $job->title }}</h5>
                    <p class="text-muted small mb-3">{{ $job->user->company->name ?? 'Company' }} &bull; {{ $job->location }}</p>
                    <div class="d-flex align-items-center mb-4">
                        <span class="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill"><i class="fas fa-money-bill-wave me-2"></i>{{ $job->salary }}</span>
                    </div>
                    <a href="{{ route('jobs.show', $job->id) }}" class="btn btn-primary w-100">Apply Now</a>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>

<!-- Testimonials -->
<div class="py-5" style="background: rgba(248, 249, 250, 0.6);">
    <div class="container">
         <h2 class="fw-bold text-center mb-5">Success Stories</h2>
         <div class="row g-4">
             <div class="col-md-4">
                 <div class="testimonial-card h-100 shadow-sm">
                     <p class="mb-4 fst-italic">"I found my dream job within 2 days. The process was so simple and transparent!"</p>
                     <div class="d-flex align-items-center">
                         <img src="https://ui-avatars.com/api/?name=Sarah+J&background=random" class="rounded-circle me-3" width="40">
                         <div>
                             <h6 class="fw-bold mb-0">Sarah Johnson</h6>
                             <small class="text-muted">Marketing Manager</small>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="col-md-4">
                 <div class="testimonial-card h-100 shadow-sm">
                     <p class="mb-4 fst-italic">"This portal is different. The quality of companies here is unmatched."</p>
                     <div class="d-flex align-items-center">
                         <img src="https://ui-avatars.com/api/?name=Mike+D&background=random" class="rounded-circle me-3" width="40">
                         <div>
                             <h6 class="fw-bold mb-0">Mike Davidson</h6>
                             <small class="text-muted">Software Engineer</small>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="col-md-4">
                 <div class="testimonial-card h-100 shadow-sm">
                     <p class="mb-4 fst-italic">"As an employer, I found the best talent here. Highly recommended!"</p>
                     <div class="d-flex align-items-center">
                         <img src="https://ui-avatars.com/api/?name=Emily+R&background=random" class="rounded-circle me-3" width="40">
                         <div>
                             <h6 class="fw-bold mb-0">Emily Rose</h6>
                             <small class="text-muted">HR Director</small>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
    </div>
</div>

<!-- CTA -->
<div class="container py-5">
    <div class="bg-primary rounded-3 p-5 text-center text-white" style="background: url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover; position:relative;">
        <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,80,200,0.8); border-radius:10px;"></div>
        <div style="position:relative; z-index:2;">
            <h2 class="display-5 fw-bold mb-3">Ready to start your journey?</h2>
            <p class="lead mb-4">Join our community of professionals and companies.</p>
            <div class="d-flex justify-content-center gap-3">
                <a href="{{ route('register') }}" class="btn btn-light btn-lg px-4 fw-bold text-primary">I'm a Job Seeker</a>
                <a href="{{ route('jobs.create') }}" class="btn btn-outline-light btn-lg px-4 fw-bold">I'm an Employer</a>
            </div>
        </div>
    </div>
</div>
@endsection
