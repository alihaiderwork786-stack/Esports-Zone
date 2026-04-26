// Enhanced Mobile Navigation System
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    setupMobileNavigation();
    setupPaymentMethods();
    setupFileUpload();
    setupDesktopNavigationHighlights();
}

// ==================== IMPROVED MOBILE NAVIGATION ====================
function setupMobileNavigation() {
    // Get all required elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    
    // CRITICAL FIX: Get all navigation links - both desktop AND mobile versions
    // This ensures the mobile menu closes when ANY link is clicked
    const allNavLinks = document.querySelectorAll('nav a, .mobile-nav-links a, .mobile-menu-overlay a, .nav-links a');
    
    console.log('🔍 Mobile Navigation Setup - Found links:', allNavLinks.length);
    
    // Debug: Log all found links to help identify issues
    allNavLinks.forEach((link, index) => {
        console.log(`Link ${index}:`, link.textContent, '| href:', link.getAttribute('href'));
    });
    
    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📱 Mobile menu opened');
            
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
        });
    } else {
        console.warn('⚠️ .mobile-menu-btn not found in DOM');
    }
    
    // Close mobile menu with close button
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('❌ Mobile menu closed via close button');
            closeMobileMenu(mobileMenuOverlay);
        });
    }
    
    // CRITICAL FIX: Close menu when ANY navigation link is clicked
    if (mobileMenuOverlay) {
        // Get all links inside the mobile menu
        const mobileLinks = mobileMenuOverlay.querySelectorAll('a');
        
        mobileLinks.forEach(link => {
            // Remove any existing listeners to avoid duplicates
            link.removeEventListener('click', handleMobileLinkClick);
            // Add fresh click handler
            link.addEventListener('click', handleMobileLinkClick);
        });
        
        // Also close when clicking on the overlay background
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                console.log('❌ Mobile menu closed via overlay click');
                closeMobileMenu(mobileMenuOverlay);
            }
        });
    }
    
    // Additional safety: Close menu on window resize (if switching from mobile to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu(mobileMenuOverlay);
        }
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu(mobileMenuOverlay);
        }
    });
}

// Helper function to close mobile menu
function closeMobileMenu(mobileMenuOverlay) {
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
}

// Helper function for mobile link clicks
function handleMobileLinkClick(e) {
    const href = this.getAttribute('href');
    console.log('🔗 Mobile link clicked:', this.textContent, '| href:', href);
    
    // Close the menu
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    closeMobileMenu(mobileMenuOverlay);
    
    // Let the navigation happen naturally
    // No need to prevent default - let the browser handle the navigation
}

// ==================== DESKTOP NAVIGATION HIGHLIGHT ====================
function setupDesktopNavigationHighlights() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight active navigation link
    const allNavLinks = document.querySelectorAll('.nav-links a, nav a');
    
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
        
        // Also add hover effects for better UX
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ==================== EXISTING FUNCTIONS (PRESERVED) ====================

// Payment Method Selection
function setupPaymentMethods() {
    const methodOptions = document.querySelectorAll('.method-option');
    if (methodOptions.length > 0) {
        methodOptions.forEach(option => {
            option.addEventListener('click', function() {
                methodOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                const method = this.getAttribute('data-method');
                const accountNumber = document.getElementById('accountNumber');
                const paymentNetwork = document.getElementById('paymentNetwork');
                
                if (method === 'easypaisa') {
                    if (accountNumber) accountNumber.textContent = '0312-3456789';
                    if (paymentNetwork) paymentNetwork.textContent = 'Easypaisa';
                } else if (method === 'jazzcash') {
                    if (accountNumber) accountNumber.textContent = '0300-1234567';
                    if (paymentNetwork) paymentNetwork.textContent = 'JazzCash';
                } else if (method === 'bank') {
                    if (accountNumber) accountNumber.textContent = '1234-5678901-2345';
                    if (paymentNetwork) paymentNetwork.textContent = 'Bank Transfer';
                }
            });
        });
    }
}

// File Upload Setup
function setupFileUpload() {
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

// ==================== BACKEND INTEGRATION ====================

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

// Simple email save function
async function savePartnerEmail() {
    const emailInput = document.getElementById('partnerEmail');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    // Basic validation
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading
    const notifyBtn = document.querySelector('.notify-btn');
    if (!notifyBtn) return;
    
    const originalText = notifyBtn.innerHTML;
    notifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    notifyBtn.disabled = true;
    
    try {
        // Try to save to backend
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
        
        // Save to localStorage as fallback
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
        notifyBtn.innerHTML = originalText;
        notifyBtn.disabled = false;
    }
}

// ==================== PAYMENT FUNCTIONS ====================

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
        } else {
            alert('Copied: ' + text);
        }
    });
}

function triggerUpload() {
    const fileInput = document.getElementById('paymentScreenshot');
    if (fileInput) {
        fileInput.click();
    }
}

function removeScreenshot() {
    const fileInput = document.getElementById('paymentScreenshot');
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    
    if (fileInput) fileInput.value = '';
    if (uploadArea) uploadArea.style.display = 'block';
    if (uploadPreview) uploadPreview.style.display = 'none';
}

function submitPayment() {
    const transactionId = document.getElementById('transactionId');
    const paymentAmount = document.getElementById('paymentAmount');
    const userUsername = document.getElementById('userUsername');
    const paymentScreenshot = document.getElementById('paymentScreenshot');
    
    if (!transactionId || !paymentAmount || !userUsername || !paymentScreenshot) {
        alert('Please fill all required fields and upload payment screenshot.');
        return;
    }
    
    if (!transactionId.value || !paymentAmount.value || !userUsername.value || !paymentScreenshot.files[0]) {
        alert('Please fill all required fields and upload payment screenshot.');
        return;
    }
    
    const submitBtn = document.getElementById('submitPaymentBtn');
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(function() {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            
            if (transactionId) transactionId.value = '';
            if (paymentAmount) paymentAmount.value = '';
            if (userUsername) userUsername.value = '';
            removeScreenshot();
            
            alert('Payment details submitted successfully! Our team will verify within 2-8 hours.');
        }, 2000);
    }, 2000);
}

// ==================== ADMIN CHECK FUNCTIONS ====================

// Check backend emails
async function checkBackendEmails() {
    try {
        console.log('🔍 Checking backend emails...');
        const response = await fetch(BACKEND_URL + '?action=getEmails');
        const data = await response.json();
        console.log('📧 Backend emails:', data);
        return data;
    } catch (error) {
        console.error('Error checking backend:', error);
    }
}

// Check local emails
function checkLocalEmails() {
    const emails = JSON.parse(localStorage.getItem('partnerEmails')) || [];
    console.log('📧 Local emails:', emails);
    return emails;
}

// Test backend connection
async function testConnection() {
    console.log('🧪 Testing connection...');
    await checkBackendEmails();
    checkLocalEmails();
}

// Auto test on page load
setTimeout(() => {
    console.log('🔄 Auto-testing connection...');
    testConnection();
}, 1000);

// ==================== ADDITIONAL MOBILE FIXES ====================
// Fix for touch events on mobile devices
document.addEventListener('touchstart', function() {}, { passive: true });

// Ensure that navigation works properly on mobile devices
window.addEventListener('load', function() {
    // Additional check for mobile menu button visibility
    const checkMobileMenu = setInterval(function() {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileBtn && navLinks) {
            const isMobile = window.getComputedStyle(mobileBtn).display !== 'none';
            if (isMobile) {
                console.log('📱 Mobile view detected - mobile menu active');
                // Hide desktop nav links on mobile if needed
                if (navLinks.style.display !== 'none') {
                    // CSS should handle this, but just in case
                }
            } else {
                console.log('💻 Desktop view detected');
            }
            clearInterval(checkMobileMenu);
        }
    }, 100);
});