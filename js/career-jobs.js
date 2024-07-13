document.addEventListener('DOMContentLoaded', function() {
    fetchCareerPosts();
});

function fetchCareerPosts() {
    fetch('http://127.0.0.1:8000/api/v1/career/jobs/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayCareerPosts(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayCareerPosts(posts) {
    const container = document.getElementById('career-posts-container');
    container.innerHTML = ''; // Clear existing content

    posts.forEach(post => {
        const postHtml = `
            <div class="mil-accordion-group mil-up">
                <div class="mil-accordion-menu">
                    <p id="career-title" class="mil-accordion-head">${post.title}</p>
                </div>
               
                    <p id="career-description" class="mil-mb-30">${post.description}</p>
                    <p class="mil"><strong>Location:</strong> ${post.location}</p>
                    <p class="mil"><strong>Type:</strong> ${post.type}</p>
                    <p class="mil-mb-"><strong>Expiry:</strong> ${new Date(post.expiry).toLocaleDateString()}</p>
                    <div class="mil-up mil-mb-30">
                        <a href="#" class="mil-link mil-dark mil-arrow-place">
                            <span>Apply Now</span>
                        </a>
                    </div>
                
            </div>
        `;
        container.innerHTML += postHtml;
    });

    // Reinitialize accordion functionality
    initAccordion();
}

function initAccordion() {
    const accordions = document.querySelectorAll('.mil-accordion-menu');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            // Toggle active class
            const isActive = this.parentNode.classList.contains('mil-active');
            document.querySelectorAll('.mil-accordion-group').forEach(group => {
                group.classList.remove('mil-active');
            });
            if (!isActive) {
                this.parentNode.classList.add('mil-active');
            }
        });
    });
}
