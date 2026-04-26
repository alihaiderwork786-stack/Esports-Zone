// COMPLETE FIXED JAVASCRIPT - Works on ALL devices

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    fixAllNavigationLinksGlobally();  // MOST IMPORTANT - Call first
    setupMobileNavigation();
    setupPaymentMethods();
    setupFileUpload();
}

// ==================== GLOBAL NAVIGATION FIX ====================
// Yeh function HAR type ke link ko find karega - desktop OR mobile
function fixAllNavigationLinksGlobally() {
    console.log('🔍 Searching for all navigation links...');
    
    // Method 1: Find ALL links in the entire document
    const allLinks = document.querySelectorAll('a');
    
    // Filter only navigation links (Home, Leaderboard, About)
    const navLinks = [];
    
    allLinks.forEach(link => {
        const text = link.textContent.toLowerCase().trim();
        const href = link.getAttribute('href');
        
        // Check if it's a navigation link
        if (text === 'home' || 
            text === 'leaderboard' || 
            text === 'about' ||
            text === '🏠 home' ||
            text === '📊 leaderboard' ||
            text === 'ℹ️ about' ||
            link.classList.contains('nav-link') ||
            link.closest('nav') ||
            link.closest('.mobile-menu-overlay') ||
            link.closest('.nav-links') ||
            link.closest('.mobile-nav-links')) {
            
            navLinks.push(link);
            console.log('✅ Found navigation link:', text, '| href:', href);
        }
    });
    
    // Fix each navigation link
    navLinks.forEach(link => {
        // Remove old click handlers
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add new click handler
        newLink.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const text = this.textContent.trim();
            
            console.log('🖱️ Link clicked on:', text, '| href:', href);
            
            // Handle missing files
            if (href && href.includes('tournament')) {
                e.preventDefault();
                alert('Tournament page coming soon!');
                return;
            }
            
            // Close mobile menu if open
            const mobileOverlay = document.querySelector('.mobile-menu-overlay');
            if (mobileOverlay && mobileOverlay.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                console.log('📱 Closed mobile menu');
            }
            
            // Let navigation happen
            return true;
        });
    });
    
    console.log(`📊 Total navigation links fixed: ${navLinks.length}`);
}

// ==================== MOBILE NAVIGATION SETUP ====================
function setupMobileNavigation() {
    console.log('📱 Setting up mobile navigation...');
    
    // Find mobile menu elements (try multiple selectors)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn') || 
                          document.querySelector('.menu-btn') ||
                          document.querySelector('.hamburger');
    
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay') || 
                              document.querySelector('.mobile-menu') ||
                              document.querySelector('.side-menu');
    
    const mobileCloseBtn = document.querySelector('.mobile-close-btn') || 
                           document.querySelector('.close-btn') ||
                           document.querySelector('.menu-close');
    
    // If no mobile elements found, check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && (!mobileMenuBtn || !mobileMenuOverlay)) {
        console.warn('⚠️ Mobile menu elements not found! Creating them dynamically...');
        createMobileMenuDynamically();
        return;
    }
    
    // Setup open button
    if (mobileMenuBtn) {
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const overlay = document.querySelector('.mobile-menu-overlay') || 
                           document.querySelector('.mobile-menu');
            
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                console.log('📱 Mobile menu opened');
            }
        });
    }
    
    // Setup close button
    if (mobileCloseBtn) {
        const newCloseBtn = mobileCloseBtn.cloneNode(true);
        mobileCloseBtn.parentNode.replaceChild(newCloseBtn, mobileCloseBtn);
        
        newCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const overlay = document.querySelector('.mobile-menu-overlay, .mobile-menu');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                console.log('📱 Mobile menu closed');
            }
        });
    }
    
    // Close menu when any link inside is clicked
    if (mobileMenuOverlay) {
        const linksInMenu = mobileMenuOverlay.querySelectorAll('a');
        linksInMenu.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function() {
                const overlay = document.querySelector('.mobile-menu-overlay, .mobile-menu');
                if (overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                }
            });
        });
    }
    
    // Close on overlay click
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
        });
    }
}

// Dynamic mobile menu creator - agar HTML mein nahi hai to create kar dega
function createMobileMenuDynamically() {
    console.log('🔧 Creating mobile menu dynamically...');
    
    // Check if mobile menu already exists
    if (document.querySelector('.mobile-menu-overlay')) {
        return;
    }
    
    // Create mobile menu button if not exists
    if (!document.querySelector('.mobile-menu-btn')) {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.innerHTML = '☰ Menu';
        btn.style.cssText = 'position:fixed; top:10px; right:10px; z-index:9999; padding:10px; background:#333; color:white; border:none; border-radius:5px;';
        document.body.appendChild(btn);
        
        btn.addEventListener('click', function() {
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) overlay.classList.add('active');
        });
    }
    
    // Create mobile menu overlay if not exists
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = 'position:fixed; top:0; left:-100%; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:10000; transition:left 0.3s ease;';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-close-btn';
        closeBtn.innerHTML = '✕ Close';
        closeBtn.style.cssText = 'position:absolute; top:20px; right:20px; padding:10px; background:#ff4444; color:white; border:none; border-radius:5px;';
        
        const linksContainer = document.createElement('div');
        linksContainer.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:30px;';
        
        // Create navigation links
        const links = [
            { text: '🏠 Home', href: 'index.html' },
            { text: '📊 Leaderboard', href: 'leaderboard.html' },
            { text: 'ℹ️ About', href: 'about.html' }
        ];
        
        links.forEach(link => {
            const a = document.createElement('a');
            a.textContent = link.text;
            a.href = link.href;
            a.style.cssText = 'color:white; font-size:24px; text-decoration:none; padding:10px;';
            a.addEventListener('click', function(e) {
                // Close menu on click
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
            });
            linksContainer.appendChild(a);
        });
        
        overlay.appendChild(closeBtn);
        overlay.appendChild(linksContainer);
        document.body.appendChild(overlay);
        
        // Close button handler
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
        });
        
        // Click outside to close
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
        });
    }
}

// ==================== YOUR EXISTING FUNCTIONS (Keep as is) ====================

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
                if(accountNumber) accountNumber.textContent = '0312-3456789';
                if(paymentNetwork) paymentNetwork.textContent = 'Easypaisa';
            } else if (method === 'jazzcash') {
                if(accountNumber) accountNumber.textContent = '0300-1234567';
                if(paymentNetwork) paymentNetwork.textContent = 'JazzCash';
            } else if (method === 'bank') {
                if(accountNumber) accountNumber.textContent = '1234-5678901-2345';
                if(paymentNetwork) paymentNetwork.textContent = 'Bank Transfer';
            }
        });
    });
}

function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const paymentScreenshot = document.getElementById('paymentScreenshot');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    
    if (uploadArea && paymentScreenshot) {
        uploadArea.addEventListener('click', () => paymentScreenshot.click());
        paymentScreenshot.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    if(previewImage) previewImage.src = event.target.result;
                    if(uploadArea && uploadPreview) {
                        uploadArea.style.display = 'none';
                        uploadPreview.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Backend and other functions remain the same...
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

async function savePartnerEmail() {
    const emailInput = document.getElementById('partnerEmail');
    if(!emailInput) return;
    const email = emailInput.value.trim();
    if(!email) { alert('Please enter email'); return; }
    if(!email.includes('@')) { alert('Valid email required'); return; }
    
    const notifyBtn = document.querySelector('.notify-btn');
    if(!notifyBtn) return;
    const originalText = notifyBtn.innerHTML;
    notifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    notifyBtn.disabled = true;
    
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, source: 'partner_program', timestamp: new Date().toISOString() })
        });
        const result = await response.json();
        if(result.success) {
            alert('✅ Email saved!');
            emailInput.value = '';
        } else throw new Error('Backend error');
    } catch(error) {
        let emails = JSON.parse(localStorage.getItem('partnerEmails')) || [];
        if(!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('partnerEmails', JSON.stringify(emails));
            alert('✅ Email saved locally!');
            emailInput.value = '';
        } else alert('Already registered');
    } finally {
        notifyBtn.innerHTML = originalText;
        notifyBtn.disabled = false;
    }
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if(!element) return;
    navigator.clipboard.writeText(element.textContent).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        if(copyBtn) {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#4CAF50';
            setTimeout(() => {
                copyBtn.innerHTML = original;
                copyBtn.style.background = '';
            }, 2000);
        }
    });
}

function triggerUpload() {
    document.getElementById('paymentScreenshot')?.click();
}

function removeScreenshot() {
    const fileInput = document.getElementById('paymentScreenshot');
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    if(fileInput) fileInput.value = '';
    if(uploadArea) uploadArea.style.display = 'block';
    if(uploadPreview) uploadPreview.style.display = 'none';
}

function submitPayment() {
    const tid = document.getElementById('transactionId')?.value;
    const amt = document.getElementById('paymentAmount')?.value;
    const user = document.getElementById('userUsername')?.value;
    const file = document.getElementById('paymentScreenshot')?.files[0];
    
    if(!tid || !amt || !user || !file) {
        alert('Please fill all fields and upload screenshot');
        return;
    }
    
    const btn = document.getElementById('submitPaymentBtn');
    if(!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
        btn.style.background = '#4CAF50';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
            if(document.getElementById('transactionId')) document.getElementById('transactionId').value = '';
            if(document.getElementById('paymentAmount')) document.getElementById('paymentAmount').value = '';
            if(document.getElementById('userUsername')) document.getElementById('userUsername').value = '';
            removeScreenshot();
            alert('Payment submitted! Will verify within 2-8 hours.');
        }, 2000);
    }, 2000);
}