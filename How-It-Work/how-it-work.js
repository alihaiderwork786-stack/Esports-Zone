// ==================== HOW IT WORKS - COMPLETE JS ====================
// Mobile navigation & all interactive features

document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle (Fixes link clicks on touch devices)
    initMobileMenu();
    
    // 2. Payment Method Selection
    initPaymentMethods();
    
    // 3. File Upload Preview
    initFileUpload();
    
    // 4. Smooth scrolling for anchor links (optional)
    initSmoothScroll();
    
    // 5. Ensure all buttons have proper touch targets
    ensureTouchTargets();
});

// ==================== MOBILE MENU (FIXED FOR TOUCH) ====================
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-close-btn');
    
    if (!mobileBtn || !overlay) return;
    
    // Open menu
    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close via close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close when clicking outside the content box
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // CRITICAL: Make all mobile links work and close menu after navigation
    const mobileLinks = overlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            // Let the browser navigate naturally – no e.preventDefault()
        });
    });
    
    // Prevent body scroll when menu is open (touchmove)
    overlay.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}

// ==================== PAYMENT METHOD SELECTION ====================
function initPaymentMethods() {
    const methodOptions = document.querySelectorAll('.method-option');
    const accountNumberSpan = document.getElementById('accountNumber');
    const paymentNetworkSpan = document.getElementById('paymentNetwork');
    
    if (!methodOptions.length) return;
    
    methodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all
            methodOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update account details based on selected method
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
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
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

// ==================== SMOOTH SCROLL (for in-page links) ====================
function initSmoothScroll() {
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

// ==================== ENSURE TOUCH TARGETS (minimum 44x44px) ====================
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
        alert('❌ Please fill all fields (Transaction ID, Amount, Username).');
        return;
    }
    if (!fileInput || !fileInput.files.length) {
        alert('❌ Please upload a payment screenshot.');
        return;
    }
    
    // Simulate submission (you can replace with actual AJAX)
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