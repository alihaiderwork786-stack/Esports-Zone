// ==================== HOW IT WORKS PAGE - COMPLETE JS ====================
// Mobile optimized with payment guide and partner program features

document.addEventListener('DOMContentLoaded', function() {
    console.log('How It Works - Loading Complete');
    
    // 1. Mobile Navigation (FIXED for touch)
    initMobileNavigation();
    
    // 2. Mobile Touch Optimization
    initTouchOptimization();
    
    // 3. Prevent Zoom Issues
    initZoomPrevention();
    
    // 4. Smooth Animations
    initSmoothAnimations();
    
    // 5. Payment Method Selection
    initPaymentMethods();
    
    // 6. File Upload Preview
    initFileUpload();
    
    // 7. Button Handlers (Register/Login)
    initButtonHandlers();
    
    // 8. Ensure all interactive elements have proper touch targets
    ensureTouchTargets();
});

// ==================== MOBILE NAVIGATION (FIXED) ====================
function initMobileNavigation() {
    // Check if mobile menu elements already exist in HTML
    let mobileBtn = document.querySelector('.mobile-menu-btn');
    let overlay = document.querySelector('.mobile-menu-overlay');
    let closeBtn = document.querySelector('.mobile-close-btn');
    
    // If not found, create them dynamically (fallback)
    if (!mobileBtn) {
        const nav = document.querySelector('nav');
        if (!nav) return;
        mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileBtn.setAttribute('aria-label', 'Open menu');
        nav.appendChild(mobileBtn);
    }
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        const mobileNavContent = document.createElement('div');
        mobileNavContent.className = 'mobile-nav-content';
        closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-close-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Clone desktop nav links
        const desktopNavLinks = document.querySelector('.nav-links');
        const mobileNavLinks = desktopNavLinks ? desktopNavLinks.cloneNode(true) : document.createElement('ul');
        mobileNavLinks.className = 'mobile-nav-links';
        
        // Clone auth buttons
        const desktopAuth = document.querySelector('.auth-buttons');
        const mobileAuth = desktopAuth ? desktopAuth.cloneNode(true) : document.createElement('div');
        mobileAuth.className = 'mobile-auth-buttons';
        
        mobileNavContent.appendChild(closeBtn);
        mobileNavContent.appendChild(mobileNavLinks);
        mobileNavContent.appendChild(mobileAuth);
        overlay.appendChild(mobileNavContent);
        document.body.appendChild(overlay);
    }
    
    if (!mobileBtn || !overlay) return;
    
    // Open menu
    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close via close button
    const closeButton = overlay.querySelector('.mobile-close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close when clicking outside content
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Ensure all mobile links work and close menu after click
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            // Let navigation happen naturally
        });
    });
    
    // Prevent body scroll when menu open on touch
    overlay.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}

// ==================== TOUCH OPTIMIZATION ====================
function initTouchOptimization() {
    const touchElements = document.querySelectorAll('a, button, .btn, .method-option, .upload-area');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ==================== ZOOM PREVENTION ====================
function initZoomPrevention() {
    function setViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
    }
    setViewport();
    document.documentElement.style.webkitTextSizeAdjust = '100%';
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewport, 100);
    });
}

// ==================== SMOOTH ANIMATIONS ====================
function initSmoothAnimations() {
    // Animate overview cards on load
    const cards = document.querySelectorAll('.overview-card, .step-detailed');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ==================== PAYMENT METHOD SELECTION ====================
function initPaymentMethods() {
    const methodOptions = document.querySelectorAll('.method-option');
    const accountNumberSpan = document.getElementById('accountNumber');
    const paymentNetworkSpan = document.getElementById('paymentNetwork');
    
    if (!methodOptions.length) return;
    
    methodOptions.forEach(option => {
        option.addEventListener('click', function() {
            methodOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const method = this.getAttribute('data-method');
            if (method === 'easypaisa') {
                if (accountNumberSpan) accountNumberSpan.textContent = '0312-3456789';
                if (paymentNetworkSpan) paymentNetworkSpan.textContent = 'Easypaisa';
            } else if (method === 'jazzcash') {
                if (accountNumberSpan) accountNumberSpan.textContent = '0300-1234567';
                if (paymentNetworkSpan) paymentNetworkSpan.textContent = 'JazzCash';
            } else if (method === 'bank') {
                if (accountNumberSpan) accountNumberSpan.textContent = '1234-5678901-2345';
                if (paymentNetworkSpan) paymentNetworkSpan.textContent = 'Bank Transfer';
            }
        });
    });
}

// ==================== FILE UPLOAD PREVIEW ====================
function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('paymentScreenshot');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    
    if (!uploadArea || !fileInput) return;
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                if (previewImage) previewImage.src = event.target.result;
                if (uploadArea) uploadArea.style.display = 'none';
                if (uploadPreview) uploadPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

// ==================== BUTTON HANDLERS (Register/Login) ====================
function initButtonHandlers() {
    // Register buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const isLoggedIn = false; // Replace with actual auth check
            if (!isLoggedIn) {
                e.preventDefault();
                window.location.href = '../Register/Sign Up/signup.html';
            }
        });
    });
    
    // Login buttons
    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const isLoggedIn = false;
            if (!isLoggedIn) {
                e.preventDefault();
                window.location.href = '../Login/login.html';
            }
        });
    });
}

// ==================== ENSURE TOUCH TARGETS (min 44x44px) ====================
function ensureTouchTargets() {
    const interactive = document.querySelectorAll('a, button, .btn, .method-option, .upload-area');
    interactive.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            el.style.minWidth = '44px';
            el.style.minHeight = '44px';
            el.style.display = 'inline-flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
        }
    });
}

// ==================== GLOBAL FUNCTIONS (called from HTML) ====================
window.copyToClipboard = function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
        } else {
            alert('Copied: ' + text);
        }
    }).catch(() => {
        alert('Copy failed. Please copy manually: ' + text);
    });
};

window.removeScreenshot = function() {
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    const fileInput = document.getElementById('paymentScreenshot');
    if (uploadArea) uploadArea.style.display = 'block';
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (fileInput) fileInput.value = '';
};

window.submitPayment = function() {
    const transactionId = document.getElementById('transactionId')?.value.trim();
    const paymentAmount = document.getElementById('paymentAmount')?.value.trim();
    const username = document.getElementById('userUsername')?.value.trim();
    const fileInput = document.getElementById('paymentScreenshot');
    
    if (!transactionId || !paymentAmount || !username) {
        alert('❌ Please fill all fields: Transaction ID, Amount, and Username.');
        return;
    }
    if (!fileInput || !fileInput.files.length) {
        alert('❌ Please upload a payment screenshot.');
        return;
    }
    
    // Simulate submission (replace with actual AJAX if needed)
    alert('✅ Payment details submitted successfully!\nOur team will verify within 2-8 hours.');
    
    // Clear form
    document.getElementById('transactionId').value = '';
    document.getElementById('paymentAmount').value = '';
    document.getElementById('userUsername').value = '';
    window.removeScreenshot();
};

window.savePartnerEmail = function() {
    const email = document.getElementById('partnerEmail')?.value.trim();
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }
    alert(`✅ Thanks! We'll notify you at ${email} when the partner program launches.`);
    document.getElementById('partnerEmail').value = '';
};

// ==================== TOUCH DEVICE DETECTION ====================
function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}