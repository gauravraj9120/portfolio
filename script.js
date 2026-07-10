/* ==========================================
   PORTFOLIO INTERACTIVE LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // 2. THEME SWITCHER (DARK / LIGHT)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 3. TYPING ANIMATION (HERO)
    const typingText = document.getElementById('typing-text');
    const professions = [
        'MERN Stack Developer',
        'MCA Student',
        'Cybersecurity Specialist',
        'Team Leader & Problem Solver'
    ];
    let profIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function typeEffect() {
        if (!typingText) return;
        
        const currentProf = professions[profIndex];
        
        if (isDeleting) {
            typingText.textContent = currentProf.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Deletes faster
        } else {
            typingText.textContent = currentProf.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 120; // Typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentProf.length) {
            isDeleting = true;
            typeDelay = 2000; // Pause at end of text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            profIndex = (profIndex + 1) % professions.length;
            typeDelay = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeDelay);
    }

    // Start typing
    setTimeout(typeEffect, 1000);

    // 4. PROJECT FILTERS
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    // Retrigger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. ANIMATING SKILLS BARS ON SCROLL
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.dataset.targetWidth = bar.style.width;
        bar.style.width = '0%';
    });

    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.width = bar.dataset.targetWidth;
                });
                // Once loaded, stop observing
                observer.unobserve(entry.target);
            }
        });
    };

    if (skillsSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver(animateSkills, {
            threshold: 0.15
        });
        skillsObserver.observe(skillsSection);
    }

    // 6. SCROLL LINKED NAV-LINKS
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActiveLink);

    // 7. CONTACT FORM SUBMISSION & TOAST NOTIFICATION
    const contactForm = document.getElementById('portfolio-contact-form');
    const toast = document.getElementById('contact-toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin icon-right"></i>';

            // Simulate form sub (e.g. email service)
            setTimeout(() => {
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Show dynamic toast
                if (toast) {
                    toast.classList.remove('hidden');
                    // Hide after 5 seconds
                    setTimeout(() => {
                        toast.classList.add('hidden');
                    }, 5000);
                }

                // Reset form
                contactForm.reset();
            }, 1500);
        });
    }
});
