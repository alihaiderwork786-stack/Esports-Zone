// tournaments.js - Complete Mobile Optimized JavaScript for Tournaments Page

document.addEventListener('DOMContentLoaded', function() {
    console.log('Esports Zone Tournaments - Loading Complete Mobile Optimization');
    
    // 1. Mobile Navigation
    initMobileNavigation();
    
    // 2. Access Card Animations
    initAccessAnimations();
    
    // 3. Mobile Touch Optimization
    initTouchOptimization();
    
    // 4. Prevent Zoom Issues
    initZoomPrevention();
    
    // 5. Button Handlers
    initButtonHandlers();
    
    // 6. Performance Optimization
    initPerformanceOptimization();
    
    // 7. Browser Compatibility
    initBrowserCompatibility();
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

// ==================== ACCESS CARD ANIMATIONS ====================
function initAccessAnimations() {
    const accessCard = document.querySelector('.access-card');
    
    if (accessCard) {
        // Add hover effect for desktop
        if (!isTouchDevice()) {
            accessCard.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            accessCard.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            });
        }
        
        // Add pulse animation to login button
        const loginBtn = document.querySelector('.login-redirect-btn');
        if (loginBtn) {
            setInterval(() => {
                loginBtn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    loginBtn.style.transform = 'scale(1)';
                }, 500);
            }, 3000);
        }
    }
}

// ==================== TOUCH OPTIMIZATION ====================
function initTouchOptimization() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll(
        'a, button, .access-card, .login-redirect-btn, .social-link'
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
    
    // Smooth scrolling for anchor links
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

// ==================== BUTTON HANDLERS ====================
function initButtonHandlers() {
    // Handle login redirect button
    const loginRedirectBtn = document.querySelector('.login-redirect-btn');
    if (loginRedirectBtn) {
        loginRedirectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                window.location.href = 'Login/login.html';
            }, 500);
        });
    }
    
    // Handle register link
    const registerLink = document.querySelector('.register-link a');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'Register/Sign Up/signup.html';
        });
    }
    
    // Handle navigation auth buttons
    document.querySelectorAll('.auth-buttons a').forEach(button => {
        button.addEventListener('click', function(e) {
            // No need for preventDefault as these are regular links
            // Just adding visual feedback
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
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
            // Handle responsive adjustments if needed
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

/* Button Loading State */
.login-redirect-btn.loading {
    pointer-events: none;
    opacity: 0.8;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }
    
    .nav-links, .auth-buttons {
        display: none;
    }
    
    .access-card {
        margin: 0 10px;
        padding: 1.5rem !important;
    }
    
    .tournaments-hero h1 {
        font-size: 2.2rem !important;
    }
    
    .tournaments-hero p {
        font-size: 1.1rem !important;
    }
}

/* iOS Specific */
@supports (-webkit-touch-callout: none) {
    .access-card {
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
}

/* Animation for access card */
.access-card {
    transition: all 0.3s ease !important;
}

.login-redirect-btn {
    transition: all 0.3s ease !important;
}
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = mobileStyles;
document.head.appendChild(styleElement);

console.log('Esports Zone Tournaments - Complete Mobile Optimization Loaded Successfully!');