// about.js - Complete Mobile Optimized JavaScript for About Page

document.addEventListener('DOMContentLoaded', function() {
    console.log('Esports Zone About - Loading Complete Mobile Optimization');
    
    // 1. Mobile Navigation
    initMobileNavigation();
    
    // 2. About Section Animations
    initAboutAnimations();
    
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
    
    // FIX: Mobile menu mein bhi about link ko highlight karo
    const aboutLink = mobileNavLinks.querySelector('a[href="about.html"]');
    if (aboutLink) {
        aboutLink.style.color = 'var(--accent)'; // Mobile mein bhi yellow
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

// ==================== ABOUT SECTION ANIMATIONS ====================
function initAboutAnimations() {
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about-section');
    
    if (heroSection) {
        // Add fade-in animation to hero section
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'all 0.8s ease';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (aboutSection) {
        // Add scroll animation to about section paragraphs
        const paragraphs = aboutSection.querySelectorAll('p');
        
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
        
        paragraphs.forEach((para, index) => {
            para.style.opacity = '0';
            para.style.transform = 'translateY(30px)';
            para.style.transition = `all 0.6s ease ${index * 0.2}s`;
            observer.observe(para);
        });
        
        // Add hover effect for desktop
        if (!isTouchDevice()) {
            aboutSection.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            aboutSection.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
    }
}

// ==================== TOUCH OPTIMIZATION ====================
function initTouchOptimization() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll(
        'a, button, .social-link, .btn'
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
    // Handle navigation auth buttons
    document.querySelectorAll('.auth-buttons a').forEach(button => {
        button.addEventListener('click', function(e) {
            // Just adding visual feedback
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
    
    // Handle social media links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
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

/* About Section Animations */
.hero {
    transition: all 0.8s ease !important;
}

.about-section p {
    transition: all 0.6s ease !important;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }
    
    .nav-links, .auth-buttons {
        display: none;
    }
    
    .hero-content h2 {
        font-size: 1.8rem !important;
    }
    
    .about-section h2 {
        font-size: 1.8rem !important;
    }
    
    .about-section p {
        font-size: 1rem !important;
        line-height: 1.6 !important;
    }
}

/* iOS Specific */
@supports (-webkit-touch-callout: none) {
    .hero, .about-section {
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
}

/* Mobile menu mein active link highlight */
.mobile-nav-links a[href="about.html"] {
    color: var(--accent) !important;
    font-weight: 600;
}
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = mobileStyles;
document.head.appendChild(styleElement);

console.log('Esports Zone About - Complete Mobile Optimization Loaded Successfully!');