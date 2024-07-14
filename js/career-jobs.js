// Function to fetch jobs from the API
async function fetchJobs() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/career/jobs/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}

// Function to create HTML for a single job
function createJobHTML(job) {
    return `
        <div class="mil-accordion-group mil-up">
            <div class="mil-accordion-menu">
                <p id="career-title" class="mil-accordion-head">${job.title}</p>
            </div>
            <p id="career-description" class="mil-mb-30">${job.description}</p>
            <p class="mil"><strong>Location:</strong> ${job.location}</p>
            <p class="mil"><strong>Type:</strong> ${job.type}</p>
            <p class="mil-mb-30"><strong>Expiry:</strong> ${job.expiry}</p>
            <div class="mil-up mil-mb-30">
                <a href="apply.html?id=${job.id}" class="mil-link mil-dark mil-arrow-place">
                    <span>Apply Now</span>
                </a>
            </div>
        </div>
    `;
}

// Function to render all jobs
function renderJobs(jobs) {
    const jobsContainer = document.getElementById('jobs-container');
    jobsContainer.innerHTML = jobs.map(createJobHTML).join('');
}

// Function to initialize the career page
async function initCareerPage() {
    const jobs = await fetchJobs();
    renderJobs(jobs);
}

