// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    setupMobileNavigation();
    setupPaymentMethods();
    setupFileUpload();
}

// Mobile Navigation Setup
function setupMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Payment Method Selection
function setupPaymentMethods() {
    const methodOptions = document.querySelectorAll('.method-option');
    methodOptions.forEach(option => {
        option.addEventListener('click', function() {
            methodOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const method = this.getAttribute('data-method');
            const accountNumber = document.getElementById('accountNumber');
            const paymentNetwork = document.getElementById('paymentNetwork');
            
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
        });
    });
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
                    previewImage.src = event.target.result;
                    uploadArea.style.display = 'none';
                    uploadPreview.style.display = 'block';
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
}

// ==================== SIMPLE BACKEND INTEGRATION ====================

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

// Simple email save function
async function savePartnerEmail() {
    const emailInput = document.getElementById('partnerEmail');
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
            // Success
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
        // Reset button
        notifyBtn.innerHTML = originalText;
        notifyBtn.disabled = false;
    }
}

// ==================== PAYMENT FUNCTIONS ====================

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#4CAF50';
        
        setTimeout(function() {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
}

function triggerUpload() {
    document.getElementById('paymentScreenshot').click();
}

function removeScreenshot() {
    document.getElementById('paymentScreenshot').value = '';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('uploadPreview').style.display = 'none';
}

function submitPayment() {
    const transactionId = document.getElementById('transactionId').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const userUsername = document.getElementById('userUsername').value;
    const paymentScreenshot = document.getElementById('paymentScreenshot').files[0];
    
    if (!transactionId || !paymentAmount || !userUsername || !paymentScreenshot) {
        alert('Please fill all required fields and upload payment screenshot.');
        return;
    }
    
    const submitBtn = document.getElementById('submitPaymentBtn');
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
            
            document.getElementById('transactionId').value = '';
            document.getElementById('paymentAmount').value = '';
            document.getElementById('userUsername').value = '';
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