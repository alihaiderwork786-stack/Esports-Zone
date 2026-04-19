// esports-zone-complete.js - Fixed Mobile Optimized JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Esports Zone - Loading Complete Mobile Optimization');
    
    // 1. Mobile Navigation
    initMobileNavigation();
    
    // 2. Tournament Countdown Timers
    initTournamentTimers();
    
    // 3. Mobile Touch Optimization
    initTouchOptimization();
    
    // 4. Prevent Zoom Issues
    initZoomPrevention();
    
    // 5. Smooth Animations
    initSmoothAnimations();
    
    // 6. Tournament Filters
    initTournamentFilters();
    
    // 7. Game Selector
    initGameSelector();
    
    // 8. Performance Optimization
    initPerformanceOptimization();
    
    // 9. Browser Compatibility
    initBrowserCompatibility();
    
    // 10. Button Handlers (NEW - Fixed)
    initButtonHandlers();
});

// ==================== MOBILE NAVIGATION ====================
function initMobileNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Open menu');
    nav.appendChild(mobileMenuBtn);
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu-overlay';
    
    // Mobile menu content
    const mobileNavContent = document.createElement('div');
    mobileNavContent.className = 'mobile-nav-content';
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-close-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label', 'Close menu');
    
    // Clone navigation links
    const mobileNavLinks = navLinks.cloneNode(true);
    mobileNavLinks.className = 'mobile-nav-links';
    
    // Clone auth buttons
    const mobileAuthBtns = authButtons.cloneNode(true);
    mobileAuthBtns.className = 'mobile-auth-buttons';
    
    // Build mobile menu
    mobileNavContent.appendChild(closeBtn);
    mobileNavContent.appendChild(mobileNavLinks);
    mobileNavContent.appendChild(mobileAuthBtns);
    mobileMenu.appendChild(mobileNavContent);
    document.body.appendChild(mobileMenu);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==================== TOURNAMENT TIMERS ====================
function initTournamentTimers() {
    const tournamentDates = {
        'ff': new Date('2025-09-28T15:00:00Z').getTime(),
        'squad': new Date('2025-10-05T17:00:00Z').getTime(),
        'pro': new Date('2025-10-15T16:00:00Z').getTime()
    };
    
    function updateAllTimers() {
        const now = new Date().getTime();
        
        for (const [id, targetTime] of Object.entries(tournamentDates)) {
            const distance = targetTime - now;
            
            if (distance < 0) {
                resetTimer(id);
                continue;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            updateTimerDisplay(id, days, hours, minutes, seconds);
        }
    }
    
    function updateTimerDisplay(id, days, hours, minutes, seconds) {
        const elements = {
            days: document.getElementById(`${id}-days`),
            hours: document.getElementById(`${id}-hours`),
            minutes: document.getElementById(`${id}-minutes`),
            seconds: document.getElementById(`${id}-seconds`)
        };
        
        if (elements.days) elements.days.textContent = days.toString().padStart(2, '0');
        if (elements.hours) elements.hours.textContent = hours.toString().padStart(2, '0');
        if (elements.minutes) elements.minutes.textContent = minutes.toString().padStart(2, '0');
        if (elements.seconds) elements.seconds.textContent = seconds.toString().padStart(2, '0');
    }
    
    function resetTimer(id) {
        updateTimerDisplay(id, 0, 0, 0, 0);
    }
    
    // Initialize timers
    updateAllTimers();
    setInterval(updateAllTimers, 1000);
}

// ==================== TOUCH OPTIMIZATION ====================
function initTouchOptimization() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll(
        'a, button, .tournament-card, .filter-btn, .btn, .feature-card'
    );
    
    touchElements.forEach(element => {
        // Touch start effect
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        // Touch end effect
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
        
        // Ensure minimum touch target size
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            element.style.minWidth = '44px';
            element.style.minHeight = '44px';
        }
    });
    
    // Smooth scrolling for anchor links (including # for top)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') {
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const targetPosition = target.offsetTop - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==================== ZOOM PREVENTION ====================
function initZoomPrevention() {
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    // Prevent pinch zoom
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    });
    
    // Fix viewport for mobile
    function setViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    setViewport();
    
    // Reset viewport on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewport, 100);
    });
}

// ==================== SMOOTH ANIMATIONS ====================
function initSmoothAnimations() {
    // Animate tournament cards on load
    const tournamentCards = document.querySelectorAll('.tournament-card');
    
    tournamentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover effects for desktop
    if (!isTouchDevice()) {
        tournamentCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ==================== TOURNAMENT FILTERS ====================
function initTournamentFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn:not(select)');
    const tournamentCards = document.querySelectorAll('.tournament-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            
            // Filter tournament cards
            tournamentCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardText = card.textContent.toLowerCase();
                    card.style.display = cardText.includes(filter) ? 'block' : 'none';
                }
            });
        });
    });
}

// ==================== GAME SELECTOR ====================
function initGameSelector() {
    const gameSelect = document.getElementById('gameSelect');
    if (gameSelect) {
        gameSelect.addEventListener('change', function() {
            // Show loading state
            const tournamentGrid = document.querySelector('.tournament-grid');
            const originalContent = tournamentGrid.innerHTML;
            
            tournamentGrid.innerHTML = `
                <div class="loading-tournaments">
                    <div class="loading-spinner"></div>
                    <p>Loading ${this.options[this.selectedIndex].text} tournaments...</p>
                </div>
            `;
            
            // Simulate API call
            setTimeout(() => {
                tournamentGrid.innerHTML = originalContent;
                initTournamentTimers(); // Reinitialize timers
                initTournamentFilters(); // Reinitialize filters
                console.log(`Switched to ${this.options[this.selectedIndex].text} tournaments`);
            }, 1000);
        });
    }
}

// ==================== PERFORMANCE OPTIMIZATION ====================
function initPerformanceOptimization() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Only performance optimizations remain
        }, 250);
    });
}

// ==================== BROWSER COMPATIBILITY ====================
function initBrowserCompatibility() {
    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScroll = function(target) {
            const start = window.pageYOffset;
            const distance = target - start;
            const duration = 500;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, start, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        };
        
        // Override smooth scroll behavior
        const originalScrollTo = window.scrollTo;
        window.scrollTo = function(options) {
            if (options && options.behavior === 'smooth') {
                smoothScroll(options.top);
            } else {
                originalScrollTo.apply(this, arguments);
            }
        };
    }
}

// ==================== BUTTON HANDLERS (FIXED) ====================
function initButtonHandlers() {
    // For register buttons - using data attributes (recommended)
    document.querySelectorAll('[data-action="register"]').forEach(button => {
        button.addEventListener('click', function(e) {
            const isLoggedIn = false; // This would come from your auth system
            if (!isLoggedIn) {
                e.preventDefault();
                window.location.href = 'Register/Sign Up/signup.html';
            }
        });
    });
    
    // For login buttons - using data attributes  
    document.querySelectorAll('[data-action="login"]').forEach(button => {
        button.addEventListener('click', function(e) {
            const isLoggedIn = false; // This would come from your auth system
            if (!isLoggedIn) {
                e.preventDefault();
                window.location.href = 'Login/login.html';
            }
        });
    });
    
    // Fallback for buttons without data attributes (using text content) but not in navigation
    document.querySelectorAll('.btn-primary:not([data-action])').forEach(button => {
        // Skip buttons that are inside the navigation
        if (button.closest('nav')) {
            return;
        }
        
        button.addEventListener('click', function(e) {
            const buttonText = button.textContent.trim().toLowerCase();
            const isLoggedIn = false; // This would come from your auth system
            
            if (!isLoggedIn) {
                e.preventDefault();
                
                if (buttonText.includes('register') || buttonText.includes('join') || buttonText.includes('notify me')) {
                    // Redirect to register page for register/join buttons
                    window.location.href = 'Register/Sign Up/signup.html';
                } else if (buttonText.includes('login') || buttonText.includes('sign in')) {
                    // Redirect to login page for login buttons
                    window.location.href = 'Login/login.html';
                }
            }
        });
    });
}

// ==================== UTILITY FUNCTIONS ====================
function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// ==================== INJECT MOBILE STYLES ====================
const mobileStyles = `
/* Mobile Menu Styles */
.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
    z-index: 1001;
}

.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

.mobile-nav-content {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    position: relative;
    max-width: 90%;
    width: 400px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.mobile-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
}

.mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
}

.mobile-nav-links li {
    list-style: none;
}

.mobile-nav-links a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 12px 20px;
    border-radius: 8px;
    transition: background 0.3s;
    display: block;
}

.mobile-nav-links a:hover {
    background: rgba(255,255,255,0.1);
}

.mobile-auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* Touch Optimization */
.touch-active {
    transform: scale(0.95) !important;
    transition: transform 0.1s ease !important;
}

/* Loading States */
.loading-tournaments {
    text-align: center;
    padding: 3rem;
    color: white;
}

.loading-spinner {
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top: 3px solid #667eea;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }
    
    .nav-links, .auth-buttons {
        display: none;
    }
    
    .tournament-grid {
        grid-template-columns: 1fr !important;
    }
    
    .features-grid {
        grid-template-columns: 1fr !important;
    }
    
    .tournament-card {
        margin: 0 10px;
    }
}

/* iOS Specific */
@supports (-webkit-touch-callout: none) {
    .tournament-card {
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
}
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = mobileStyles;
document.head.appendChild(styleElement);

console.log('Esports Zone - Complete Mobile Optimization Loaded Successfully! (Button Issues Fixed)');