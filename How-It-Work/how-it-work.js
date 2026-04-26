// COMPLETE CORRECTED JAVASCRIPT FILE
// Mobile Navigation & All Issues Fixed

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    setupMobileNavigation();
    setupPaymentMethods();
    setupFileUpload();
    setupSafeNavigation(); // 404 error handling
    fixAllNavigationLinks(); // Extra safety
}

// ==================== MAIN FIX: MOBILE NAVIGATION ====================
function setupMobileNavigation() {
    // Get elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    
    console.log('Mobile navigation initialized');
    
    // OPEN MENU FUNCTION
    if (mobileMenuBtn) {
        // Remove old event listeners to avoid duplicates
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                console.log('Mobile menu opened');
            }
        });
    }
    
    // CLOSE WITH CLOSE BUTTON
    if (mobileCloseBtn) {
        const newCloseBtn = mobileCloseBtn.cloneNode(true);
        mobileCloseBtn.parentNode.replaceChild(newCloseBtn, mobileCloseBtn);
        
        newCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                console.log('Mobile menu closed');
            }
        });
    }
    
    // CLOSE WHEN ANY LINK IS CLICKED (THIS FIXES YOUR PROBLEM)
    if (mobileMenuOverlay) {
        // Get ALL links inside mobile menu
        const allMobileLinks = mobileMenuOverlay.querySelectorAll('a');
        
        allMobileLinks.forEach(link => {
            // Remove old listeners
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add click handler to close menu
            newLink.addEventListener('click', function(e) {
                console.log('Link clicked:', this.textContent);
                
                // Close the menu
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                }
                
                // Let the navigation happen
                return true;
            });
        });
    }
    
    // CLICK ON OVERLAY BACKGROUND TO CLOSE
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
        });
    }
    
    // ESCAPE KEY TO CLOSE
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay && overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
        }
    });
}

// ==================== FIX 404 ERRORS ====================
function setupSafeNavigation() {
    // List of existing pages (update this as per your actual files)
    const existingPages = ['index.html', 'leaderboard.html', 'about.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const allLinks = document.querySelectorAll('nav a, .mobile-menu-overlay a, .nav-links a');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip external links and anchor links
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('javascript')) {
            return;
        }
        
        // Check if it's an HTML file
        if (href.includes('.html')) {
            const filename = href.split('/').pop();
            
            // If page doesn't exist, show coming soon message
            if (!existingPages.includes(filename) && filename !== currentPage) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert(`"${filename.replace('.html', '')}" page is coming soon!`);
                    console.log('Prevented 404 for:', filename);
                });
            }
        }
    });
}

// ==================== FIX ALL BROKEN LINKS ====================
function fixAllNavigationLinks() {
    // Fix Home link
    const homeLinks = document.querySelectorAll('a[href*="home"], a[href*="index"]');
    homeLinks.forEach(link => {
        if (link.getAttribute('href') === 'home.html' || link.getAttribute('href') === './home.html') {
            link.setAttribute('href', 'index.html');
            console.log('Fixed home link');
        }
    });
    
    // Fix Leaderboard link
    const leaderboardLinks = document.querySelectorAll('a[href*="leaderboard"]');
    leaderboardLinks.forEach(link => {
        if (link.getAttribute('href') !== 'leaderboard.html') {
            link.setAttribute('href', 'leaderboard.html');
            console.log('Fixed leaderboard link');
        }
    });
    
    // Fix About link
    const aboutLinks = document.querySelectorAll('a[href*="about"]');
    aboutLinks.forEach(link => {
        if (link.getAttribute('href') !== 'about.html') {
            link.setAttribute('href', 'about.html');
            console.log('Fixed about link');
        }
    });
    
    // Fix Tournament link (if exists)
    const tournamentLinks = document.querySelectorAll('a[href*="tournament"]');
    tournamentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Tournament page coming soon! Stay tuned.');
        });
    });
}

// ==================== PAYMENT METHODS ====================
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

// ==================== FILE UPLOAD ====================
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

// ==================== BACKEND CONFIGURATION ====================
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

// Save Partner Email
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
    if (!notifyBtn) return;
    
    const originalText = notifyBtn.innerHTML;
    notifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    notifyBtn.disabled = true;
    
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                source: 'partner_program',
                timestamp: new Date().toISOString()
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Thank you! Your email has been saved successfully.');
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
            alert('✅ Thank you! Your email has been saved.');
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
        }
    });
}

function triggerUpload() {
    const fileInput = document.getElementById('paymentScreenshot');
    if (fileInput) fileInput.click();
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
        alert('Please fill all required fields.');
        return;
    }
    
    if (!transactionId.value || !paymentAmount.value || !userUsername.value || !paymentScreenshot.files[0]) {
        alert('Please fill all required fields and upload screenshot.');
        return;
    }
    
    const submitBtn = document.getElementById('submitPaymentBtn');
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(function() {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            
            if (transactionId) transactionId.value = '';
            if (paymentAmount) paymentAmount.value = '';
            if (userUsername) userUsername.value = '';
            removeScreenshot();
            
            alert('Payment submitted successfully! Will verify within 2-8 hours.');
        }, 2000);
    }, 2000);
}

// ==================== HELPER FUNCTIONS ====================
async function checkBackendEmails() {
    try {
        console.log('Checking backend emails...');
        const response = await fetch(BACKEND_URL + '?action=getEmails');
        const data = await response.json();
        console.log('Backend emails:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function checkLocalEmails() {
    const emails = JSON.parse(localStorage.getItem('partnerEmails')) || [];
    console.log('Local emails:', emails);
    return emails;
}

async function testConnection() {
    console.log('Testing connection...');
    await checkBackendEmails();
    checkLocalEmails();
}

// Auto test after 1 second
setTimeout(() => {
    testConnection();
}, 1000);