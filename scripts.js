// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Create close button
            if (!document.querySelector('.close-menu')) {
                const closeButton = document.createElement('button');
                closeButton.className = 'close-menu';
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                closeButton.setAttribute('aria-label', 'Close menu');
                mainNav.appendChild(closeButton);
                
                closeButton.addEventListener('click', function() {
                    closeMenu();
                });
            }
            
            // Toggle menu
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (body.classList.contains('menu-open') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-menu-toggle')) {
            closeMenu();
        }
    });

    function closeMenu() {
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Close menu when a nav link is clicked (for single page navigation)
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current item if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // Term calendar navigation
    const prevTermBtn = document.getElementById('prev-term');
    const nextTermBtn = document.getElementById('next-term');
    const currentTermText = document.getElementById('current-term');
    const termCalendars = document.querySelectorAll('.term-calendar');
    
    if (prevTermBtn && nextTermBtn) {
        let currentTerm = 0; // Start with Term 1 (index 0)
        
        // Initialize
        updateTermDisplay();
        
        prevTermBtn.addEventListener('click', () => {
            if (currentTerm > 0) {
                currentTerm--;
                updateTermDisplay();
            }
        });
        
        nextTermBtn.addEventListener('click', () => {
            if (currentTerm < termCalendars.length - 1) {
                currentTerm++;
                updateTermDisplay();
            }
        });
        
        function updateTermDisplay() {
            // Update active term calendar
            termCalendars.forEach((calendar, index) => {
                if (index === currentTerm) {
                    calendar.classList.add('active');
                } else {
                    calendar.classList.remove('active');
                }
            });
            
            // Update term text
            const termNames = ['Term 1 - 2025', 'Term 2 - 2025', 'Term 3 - 2025'];
            currentTermText.textContent = termNames[currentTerm];
            
            // Update button states
            prevTermBtn.disabled = currentTerm === 0;
            nextTermBtn.disabled = currentTerm === termCalendars.length - 1;
        }
    }
    
    // News and events filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            if (filterValue === 'all') {
                document.querySelectorAll('.news-item, .event-card').forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                document.querySelectorAll('.news-item, .event-card').forEach(item => {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message about "${subject}" has been received. We'll contact you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
            
            newsletterForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});