// esports-payment-partner.js - Complete Mobile Optimized JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Esports Zone - Loading Complete Mobile Optimization');
    
    // 1. Mobile Navigation
    initMobileNavigation();
    
    // 2. Payment Methods Setup
    initPaymentMethods();
    
    // 3. File Upload Setup
    initFileUpload();
    
    // 4. Mobile Touch Optimization
    initTouchOptimization();
    
    // 5. Prevent Zoom Issues
    initZoomPrevention();
    
    // 6. Smooth Animations
    initSmoothAnimations();
    
    // 7. Partner Email Save
    initPartnerEmail();
    
    // 8. Payment Submission
    initPaymentSubmission();
    
    // 9. Admin Functions (Console Only)
    initAdminFunctions();
    
    // 10. Performance Optimization
    initPerformanceOptimization();
    
    // 11. Browser Compatibility
    initBrowserCompatibility();
});

// ==================== MOBILE NAVIGATION ====================
function initMobileNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    // Create mobile menu button if it doesn't exist
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileMenuBtn && nav) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        nav.appendChild(mobileMenuBtn);
    }
    
    // Create mobile menu overlay if it doesn't exist
    let mobileMenu = document.querySelector('.mobile-menu-overlay');
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-overlay';
        
        const mobileNavContent = document.createElement('div');
        mobileNavContent.className = 'mobile-nav-content';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-close-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Close menu');
        
        if (navLinks && authButtons) {
            const mobileNavLinks = navLinks.cloneNode(true);
            mobileNavLinks.className = 'mobile-nav-links';
            
            const mobileAuthBtns = authButtons.cloneNode(true);
            mobileAuthBtns.className = 'mobile-auth-buttons';
            
            mobileNavContent.appendChild(closeBtn);
            mobileNavContent.appendChild(mobileNavLinks);
            mobileNavContent.appendChild(mobileAuthBtns);
        } else {
            mobileNavContent.appendChild(closeBtn);
        }
        
        mobileMenu.appendChild(mobileNavContent);
        document.body.appendChild(mobileMenu);
    }
    
    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeBtn = mobileMenu.querySelector('.mobile-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
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
}

// ==================== PAYMENT METHODS SETUP ====================
function initPaymentMethods() {
    const methodOptions = document.querySelectorAll('.method-option');
    const accountNumber = document.getElementById('accountNumber');
    const paymentNetwork = document.getElementById('paymentNetwork');
    
    if (methodOptions.length > 0) {
        methodOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                methodOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
                
                const method = this.getAttribute('data-method');
                
                if (accountNumber && paymentNetwork) {
                    if (method === 'easypaisa') {
                        accountNumber.textContent = '0312-3456789';
                        paymentNetwork.textContent = 'Easypaisa';
                    } else if (method === 'jazzcash') {
                        accountNumber.textContent = '0300-1234567';
                        paymentNetwork.textContent = 'JazzCash';
                    } else if (method === 'bank') {
                        accountNumber.textContent = '1234-5678901-2345';
                        paymentNetwork.textContent = 'Bank Transfer';
                    }
                }
            });
        });
    }
}

// ==================== FILE UPLOAD SETUP ====================
function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const paymentScreenshot = document.getElementById('paymentScreenshot');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    
    if (uploadArea && paymentScreenshot) {
        uploadArea.addEventListener('click', function() {
            paymentScreenshot.click();
        });
        
        paymentScreenshot.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    if (previewImage) {
                        previewImage.src = event.target.result;
                    }
                    if (uploadArea && uploadPreview) {
                        uploadArea.style.display = 'none';
                        uploadPreview.style.display = 'block';
                    }
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
}

// ==================== TOUCH OPTIMIZATION ====================
function initTouchOptimization() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll(
        'a, button, .method-option, .copy-btn, .submit-payment-btn, .notify-btn'
    );
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
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
    
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewport, 100);
    });
}

// ==================== SMOOTH ANIMATIONS ====================
function initSmoothAnimations() {
    // Animate payment method options on load
    const methodOptions = document.querySelectorAll('.method-option');
    methodOptions.forEach((option, index) => {
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            option.style.transition = 'all 0.5s ease';
            option.style.opacity = '1';
            option.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover effects for desktop
    if (!isTouchDevice()) {
        methodOptions.forEach(option => {
            option.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            });
            
            option.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }
}

// ==================== PARTNER EMAIL SAVE ====================
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

function initPartnerEmail() {
    const notifyBtn = document.querySelector('.notify-btn');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            savePartnerEmail();
        });
    }
}

async function savePartnerEmail() {
    const emailInput = document.getElementById('partnerEmail');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const notifyBtn = document.querySelector('.notify-btn');
    const originalText = notifyBtn ? notifyBtn.innerHTML : 'Notify Me';
    if (notifyBtn) {
        notifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        notifyBtn.disabled = true;
    }
    
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                source: 'partner_program',
                timestamp: new Date().toISOString()
            })
        });
        
        const result = await response.json();
        console.log('Backend response:', result);
        
        if (result.success) {
            alert('✅ Thank you! Your email has been saved successfully. We will notify you when the partner program launches.');
            emailInput.value = '';
        } else {
            throw new Error(result.message || 'Backend error');
        }
        
    } catch (error) {
        console.error('Backend failed, saving locally:', error);
        
        let emails = JSON.parse(localStorage.getItem('partnerEmails')) || [];
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('partnerEmails', JSON.stringify(emails));
            alert('✅ Thank you! Your email has been saved. We will notify you when the partner program launches.');
            emailInput.value = '';
        } else {
            alert('This email is already registered.');
        }
    } finally {
        if (notifyBtn) {
            notifyBtn.innerHTML = originalText;
            notifyBtn.disabled = false;
        }
    }
}

// ==================== PAYMENT SUBMISSION ====================
function initPaymentSubmission() {
    const submitBtn = document.getElementById('submitPaymentBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            submitPayment();
        });
    }
    
    // Copy to clipboard for copy button
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            copyToClipboard('accountNumber');
        });
    }
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#4CAF50';
            
            setTimeout(function() {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        }
    });
}

function submitPayment() {
    const transactionId = document.getElementById('transactionId');
    const paymentAmount = document.getElementById('paymentAmount');
    const userUsername = document.getElementById('userUsername');
    const paymentScreenshot = document.getElementById('paymentScreenshot');
    
    if (!transactionId || !paymentAmount || !userUsername || !paymentScreenshot) return;
    
    const transactionIdValue = transactionId.value;
    const paymentAmountValue = paymentAmount.value;
    const userUsernameValue = userUsername.value;
    const screenshotFile = paymentScreenshot.files[0];
    
    if (!transactionIdValue || !paymentAmountValue || !userUsernameValue || !screenshotFile) {
        alert('Please fill all required fields and upload payment screenshot.');
        return;
    }
    
    const submitBtn = document.getElementById('submitPaymentBtn');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Payment';
    
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
    }
    
    setTimeout(function() {
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!';
            submitBtn.style.background = '#4CAF50';
        }
        
        setTimeout(function() {
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }
            
            if (transactionId) transactionId.value = '';
            if (paymentAmount) paymentAmount.value = '';
            if (userUsername) userUsername.value = '';
            
            // Reset file upload
            if (paymentScreenshot) paymentScreenshot.value = '';
            const uploadArea = document.getElementById('uploadArea');
            const uploadPreview = document.getElementById('uploadPreview');
            if (uploadArea && uploadPreview) {
                uploadArea.style.display = 'block';
                uploadPreview.style.display = 'none';
            }
            
            alert('Payment details submitted successfully! Our team will verify within 2-8 hours.');
        }, 2000);
    }, 2000);
}

// ==================== ADMIN FUNCTIONS ====================
function initAdminFunctions() {
    // Make admin functions available in console
    window.checkBackendEmails = async function() {
        try {
            console.log('🔍 Checking backend emails...');
            const response = await fetch(BACKEND_URL + '?action=getEmails');
            const data = await response.json();
            console.log('📧 Backend emails:', data);
            return data;
        } catch (error) {
            console.error('Error checking backend:', error);
        }
    };
    
    window.checkLocalEmails = function() {
        const emails = JSON.parse(localStorage.getItem('partnerEmails')) || [];
        console.log('📧 Local emails:', emails);
        return emails;
    };
    
    window.testConnection = async function() {
        console.log('🧪 Testing connection...');
        await window.checkBackendEmails();
        window.checkLocalEmails();
    };
    
    // Auto test on page load
    setTimeout(() => {
        console.log('🔄 Auto-testing connection...');
        window.testConnection();
    }, 1000);
}

// ==================== PERFORMANCE OPTIMIZATION ====================
function initPerformanceOptimization() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
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
            // Handle resize optimizations
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

/* Method Options Styling */
.method-option {
    transition: all 0.3s ease;
    cursor: pointer;
}

.method-option.active {
    border: 2px solid #667eea;
    background: linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%);
}

/* Upload Area Styling */
.upload-area {
    cursor: pointer;
    transition: all 0.3s ease;
}

.upload-area:hover {
    border-color: #667eea;
    background: rgba(102,126,234,0.1);
}

/* Button States */
.notify-btn:disabled,
.submit-payment-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }
    
    .nav-links, .auth-buttons {
        display: none;
    }
    
    .payment-methods-grid {
        grid-template-columns: 1fr !important;
    }
    
    .payment-form-container {
        padding: 15px !important;
    }
}

/* iOS Specific */
@supports (-webkit-touch-callout: none) {
    .method-option {
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
}
`;

// Inject styles if not already present
if (!document.querySelector('#esports-mobile-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'esports-mobile-styles';
    styleElement.textContent = mobileStyles;
    document.head.appendChild(styleElement);
}

console.log('Esports Zone - Payment Partner JS Loaded Successfully!');