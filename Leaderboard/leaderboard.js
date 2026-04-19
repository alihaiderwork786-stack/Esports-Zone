// leaderboard.js - Complete Mobile Optimized JavaScript for Leaderboard Page

document.addEventListener('DOMContentLoaded', function() {
    console.log('Esports Zone Leaderboard - Loading Complete Mobile Optimization');
    
    // 1. Mobile Navigation (With Leaderboard Highlight)
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

// ==================== MOBILE NAVIGATION (WITH HIGHLIGHT) ====================
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
    
    // FIX: Add leaderboard highlight in mobile menu
    const leaderboardLink = mobileNavLinks.querySelector('a[href*="leaderboard"]');
    if (leaderboardLink) {
        leaderboardLink.classList.add('active');
    }
    
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
}

// ==================== BROWSER COMPATIBILITY ====================
function initBrowserCompatibility() {
    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill code here
    }
}

// ==================== UTILITY FUNCTIONS ====================
function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

console.log('Esports Zone Leaderboard - Complete Mobile Optimization Loaded Successfully!');