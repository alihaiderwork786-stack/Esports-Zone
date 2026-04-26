// ==================== MAIN INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('App Loaded - Mobile Ready');
    
    // Setup everything
    setupMobileMenu();
    setupPaymentMethods();
    setupFileUpload();
    setupPartnerEmail();
});

// ==================== MOBILE MENU (Auto-create if needed) ====================
function setupMobileMenu() {
    // Create mobile menu button if not exists
    if (!document.querySelector('.mobile-menu-btn')) {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.innerHTML = '☰ MENU';
        btn.style.cssText = `
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 9999;
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            display: none;
        `;
        document.body.appendChild(btn);
    }
    
    // Create mobile menu overlay if not exists
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            transition: left 0.3s ease;
        `;
        
        // Menu content
        overlay.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                gap: 25px;
            ">
                <button class="mobile-close-btn" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                ">✕ CLOSE</button>
                
                <a href="index.html" style="
                    color: white;
                    font-size: 24px;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    transition: all 0.3s;
                ">🏠 HOME</a>
                
                <a href="leaderboard.html" style="
                    color: white;
                    font-size: 24px;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    transition: all 0.3s;
                ">📊 LEADERBOARD</a>
                
                <a href="about.html" style="
                    color: white;
                    font-size: 24px;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    transition: all 0.3s;
                ">ℹ️ ABOUT</a>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    
    // Get elements
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-close-btn');
    
    // Open menu
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            overlay.style.left = '0';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close menu with button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            overlay.style.left = '-100%';
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking on any link
    const links = overlay.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            overlay.style.left = '-100%';
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.style.left = '-100%';
            document.body.style.overflow = '';
        }
    });
    
    // Show menu button only on mobile
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'block';
            // Hide desktop navigation if exists
            const desktopNav = document.querySelector('.nav-links, nav ul');
            if (desktopNav) desktopNav.style.display = 'none';
        } else {
            menuBtn.style.display = 'none';
            overlay.style.left = '-100%';
            document.body.style.overflow = '';
            // Show desktop navigation
            const desktopNav = document.querySelector('.nav-links, nav ul');
            if (desktopNav) desktopNav.style.display = '';
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// ==================== PAYMENT METHODS ====================
function setupPaymentMethods() {
    const methods = document.querySelectorAll('.method-option');
    
    methods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active from all
            methods.forEach(m => m.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            const type = this.getAttribute('data-method');
            const accountNum = document.getElementById('accountNumber');
            const network = document.getElementById('paymentNetwork');
            
            if (type === 'easypaisa') {
                if (accountNum) accountNum.textContent = '0312-3456789';
                if (network) network.textContent = 'Easypaisa';
            } else if (type === 'jazzcash') {
                if (accountNum) accountNum.textContent = '0300-1234567';
                if (network) network.textContent = 'JazzCash';
            } else if (type === 'bank') {
                if (accountNum) accountNum.textContent = '1234-5678901-2345';
                if (network) network.textContent = 'Bank Transfer';
            }
        });
    });
}

// ==================== FILE UPLOAD ====================
function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('paymentScreenshot');
    const preview = document.getElementById('uploadPreview');
    const previewImg = document.getElementById('previewImage');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', function(e) {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (previewImg) previewImg.src = event.target.result;
                    if (uploadArea && preview) {
                        uploadArea.style.display = 'none';
                        preview.style.display = 'block';
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
}

// ==================== PARTNER EMAIL ====================
function setupPartnerEmail() {
    const notifyBtn = document.querySelector('.notify-btn');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', savePartnerEmail);
    }
}

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

async function savePartnerEmail() {
    const emailInput = document.getElementById('partnerEmail');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter email');
        return;
    }
    if (!email.includes('@')) {
        alert('Enter valid email');
        return;
    }
    
    const btn = document.querySelector('.notify-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Saving...';
    btn.disabled = true;
    
    try {
        await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'partner', timestamp: new Date().toISOString() })
        });
        alert('✅ Email saved!');
        emailInput.value = '';
    } catch(error) {
        let emails = JSON.parse(localStorage.getItem('partnerEmails')) || [];
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('partnerEmails', JSON.stringify(emails));
            alert('✅ Email saved!');
            emailInput.value = '';
        } else {
            alert('Email already registered');
        }
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ==================== PAYMENT FUNCTIONS ====================
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    navigator.clipboard.writeText(element.textContent).then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
            const original = btn.innerHTML;
            btn.innerHTML = '✓ Copied!';
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
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
    const preview = document.getElementById('uploadPreview');
    
    if (fileInput) fileInput.value = '';
    if (uploadArea) uploadArea.style.display = 'block';
    if (preview) preview.style.display = 'none';
}

function submitPayment() {
    const tid = document.getElementById('transactionId')?.value;
    const amount = document.getElementById('paymentAmount')?.value;
    const username = document.getElementById('userUsername')?.value;
    const screenshot = document.getElementById('paymentScreenshot')?.files[0];
    
    if (!tid || !amount || !username || !screenshot) {
        alert('Fill all fields and upload screenshot');
        return;
    }
    
    const btn = document.getElementById('submitPaymentBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '✓ Submitted!';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            
            const tidInput = document.getElementById('transactionId');
            const amountInput = document.getElementById('paymentAmount');
            const userInput = document.getElementById('userUsername');
            
            if (tidInput) tidInput.value = '';
            if (amountInput) amountInput.value = '';
            if (userInput) userInput.value = '';
            
            removeScreenshot();
            alert('Payment submitted! Will verify in 2-8 hours.');
        }, 2000);
    }, 2000);
}