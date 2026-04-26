// payment-partner-optimized.js - Final Mobile Optimized Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment Partner System - Fully Optimized');
    
    initMobileNavigation();
    initPaymentMethods();
    initFileUpload();
    initPartnerEmail();
    initPaymentSubmission();
    initTouchOptimization();
    initZoomPrevention();
    initSmoothAnimations();
    initPerformance();
    initAdminConsole();
});

// ==================== MOBILE NAVIGATION ====================
function initMobileNavigation() {
    const btn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-close-btn');
    
    if (btn && overlay) {
        btn.onclick = () => { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
        if (closeBtn) closeBtn.onclick = () => { overlay.classList.remove('active'); document.body.style.overflow = ''; };
        overlay.onclick = (e) => { if (e.target === overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; } };
        overlay.querySelectorAll('a').forEach(link => link.onclick = () => { overlay.classList.remove('active'); document.body.style.overflow = ''; });
    }
}

// ==================== PAYMENT METHODS ====================
function initPaymentMethods() {
    const options = document.querySelectorAll('.method-option');
    const accNum = document.getElementById('accountNumber');
    const network = document.getElementById('paymentNetwork');
    if (!options.length) return;
    
    options.forEach(opt => {
        opt.addEventListener('click', function() {
            options.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            const method = this.dataset.method;
            if (accNum && network) {
                if (method === 'easypaisa') { accNum.innerText = '0312-3456789'; network.innerText = 'Easypaisa'; }
                else if (method === 'jazzcash') { accNum.innerText = '0300-1234567'; network.innerText = 'JazzCash'; }
                else { accNum.innerText = '1234-5678901-2345'; network.innerText = 'Bank Transfer'; }
            }
        });
    });
    
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) copyBtn.onclick = () => copyToClipboard('accountNumber');
}

function copyToClipboard(id) {
    const text = document.getElementById(id)?.innerText;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = '#4CAF50';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
        }
    }).catch(() => alert('Press Ctrl+C to copy: ' + text));
}

// ==================== FILE UPLOAD ====================
function initFileUpload() {
    const area = document.getElementById('uploadArea');
    const input = document.getElementById('paymentScreenshot');
    const preview = document.getElementById('uploadPreview');
    const img = document.getElementById('previewImage');
    if (!area || !input) return;
    
    area.onclick = () => input.click();
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.match('image.*')) { alert('Please upload an image file.'); return; }
        if (file.size > 5 * 1024 * 1024) { alert('File must be < 5MB.'); return; }
        const reader = new FileReader();
        reader.onload = (ev) => { if (img) img.src = ev.target.result; if (area && preview) { area.style.display = 'none'; preview.style.display = 'block'; } };
        reader.readAsDataURL(file);
    };
}

function removeScreenshot() {
    const input = document.getElementById('paymentScreenshot');
    const area = document.getElementById('uploadArea');
    const preview = document.getElementById('uploadPreview');
    if (input) input.value = '';
    if (area) area.style.display = 'block';
    if (preview) preview.style.display = 'none';
}

// ==================== PARTNER EMAIL ====================
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

function initPartnerEmail() {
    const btn = document.querySelector('.notify-btn');
    if (btn) btn.onclick = (e) => { e.preventDefault(); savePartnerEmail(); };
}

async function savePartnerEmail() {
    const input = document.getElementById('partnerEmail');
    if (!input) return;
    const email = input.value.trim();
    if (!email) { alert('Please enter email.'); input.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Enter a valid email address.'); input.focus(); return; }
    
    const btn = document.querySelector('.notify-btn');
    const origText = btn?.innerHTML || 'Notify Me';
    if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'; btn.disabled = true; }
    
    try {
        const res = await fetch(BACKEND_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'partner_program', timestamp: new Date().toISOString() }) });
        const data = await res.json();
        if (data?.success) {
            alert('✅ Saved! We will notify you.');
            input.value = '';
        } else throw new Error(data?.message || 'Backend error');
    } catch (err) {
        console.error(err);
        let emails = JSON.parse(localStorage.getItem('partnerEmails') || '[]');
        if (!emails.includes(email)) { emails.push(email); localStorage.setItem('partnerEmails', JSON.stringify(emails)); alert('✅ Saved locally.'); input.value = ''; }
        else alert('Email already registered.');
    } finally {
        if (btn) { btn.innerHTML = origText; btn.disabled = false; }
    }
}

// ==================== PAYMENT SUBMISSION ====================
function initPaymentSubmission() {
    const btn = document.getElementById('submitPaymentBtn');
    if (btn) btn.onclick = (e) => { e.preventDefault(); submitPayment(); };
}

function submitPayment() {
    const trans = document.getElementById('transactionId');
    const amount = document.getElementById('paymentAmount');
    const user = document.getElementById('userUsername');
    const screenshot = document.getElementById('paymentScreenshot');
    if (!trans || !amount || !user || !screenshot) return;
    
    const transVal = trans.value.trim();
    const amountVal = amount.value.trim();
    const userVal = user.value.trim();
    const file = screenshot.files[0];
    
    if (!transVal) { alert('Transaction ID required'); trans.focus(); return; }
    if (!amountVal || isNaN(amountVal) || parseFloat(amountVal) <= 0) { alert('Valid amount required'); amount.focus(); return; }
    if (!userVal) { alert('Username required'); user.focus(); return; }
    if (!file) { alert('Screenshot required'); return; }
    
    const btn = document.getElementById('submitPaymentBtn');
    const orig = btn?.innerHTML || 'Submit';
    if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'; btn.disabled = true; }
    
    setTimeout(() => {
        if (btn) { btn.innerHTML = '<i class="fas fa-check"></i> Submitted!'; btn.style.background = '#4CAF50'; }
        setTimeout(() => {
            if (btn) { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }
            trans.value = ''; amount.value = ''; user.value = '';
            removeScreenshot();
            alert('✅ Payment submitted! Verification within 2-8 hours.');
        }, 2000);
    }, 2000);
}

// ==================== TOUCH & ZOOM OPTIMIZATION ====================
function initTouchOptimization() {
    const els = document.querySelectorAll('button, .method-option, .copy-btn, .notify-btn, #submitPaymentBtn, .upload-area');
    els.forEach(el => {
        el.addEventListener('touchstart', function() { this.classList.add('touch-active'); }, { passive: true });
        el.addEventListener('touchend', function() { this.classList.remove('touch-active'); }, { passive: true });
        const rect = el.getBoundingClientRect();
        if (rect.width && (rect.width < 44 || rect.height < 44)) { el.style.minWidth = '44px'; el.style.minHeight = '44px'; }
    });
}

function initZoomPrevention() {
    let last = 0;
    document.addEventListener('touchend', (e) => { const now = Date.now(); if (now - last <= 300) e.preventDefault(); last = now; }, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());
}

// ==================== ANIMATIONS & PERFORMANCE ====================
function initSmoothAnimations() {
    const opts = document.querySelectorAll('.method-option');
    opts.forEach((opt, i) => {
        opt.style.opacity = '0';
        opt.style.transform = 'translateY(20px)';
        setTimeout(() => { opt.style.transition = 'all 0.5s ease'; opt.style.opacity = '1'; opt.style.transform = 'translateY(0)'; }, i * 100);
    });
    if (!('ontouchstart' in window)) {
        opts.forEach(opt => {
            opt.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-5px)'; this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'; });
            opt.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; this.style.boxShadow = ''; });
        });
    }
}

function initPerformance() {
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { const img = e.target; if (img.dataset.src) img.src = img.dataset.src; obs.unobserve(img); } });
        });
        document.querySelectorAll('img[data-src]').forEach(img => obs.observe(img));
    }
    let timeout;
    window.addEventListener('resize', () => { clearTimeout(timeout); timeout = setTimeout(() => {}, 250); });
}

// ==================== ADMIN CONSOLE ====================
function initAdminConsole() {
    window.checkBackendEmails = async () => { try { const res = await fetch(BACKEND_URL + '?action=getEmails'); const data = await res.json(); console.log('📧 Backend:', data); return data; } catch(e) { console.error(e); } };
    window.checkLocalEmails = () => { const emails = JSON.parse(localStorage.getItem('partnerEmails') || '[]'); console.log('📧 Local:', emails); return emails; };
    window.testConnection = async () => { console.log('🧪 Testing...'); await window.checkBackendEmails(); window.checkLocalEmails(); };
    setTimeout(() => { console.log('🔄 Auto-testing...'); window.testConnection(); }, 1000);
}

// ==================== INJECT MOBILE STYLES ====================
const mobileStyles = `
.mobile-menu-btn { display: none; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 10px; z-index: 1001; }
.mobile-menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
.mobile-menu-overlay.active { opacity: 1; visibility: visible; }
.mobile-nav-content { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 2rem; border-radius: 15px; text-align: center; position: relative; max-width: 90%; width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.mobile-close-btn { position: absolute; top: 15px; right: 15px; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 5px; }
.mobile-nav-links { display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0; }
.mobile-nav-links li { list-style: none; }
.mobile-nav-links a { color: white; text-decoration: none; font-size: 1.1rem; padding: 12px 20px; border-radius: 8px; display: block; }
.mobile-nav-links a:hover { background: rgba(255,255,255,0.1); }
.mobile-auth-buttons { display: flex; flex-direction: column; gap: 1rem; }
.touch-active { transform: scale(0.95) !important; transition: transform 0.1s ease !important; }
.method-option.active { border: 2px solid #667eea; background: linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%); }
@media (max-width: 768px) { .mobile-menu-btn { display: block; } .nav-links, .auth-buttons { display: none; } .payment-methods-grid { grid-template-columns: 1fr !important; } }
`;
if (!document.querySelector('#payment-mobile-styles')) {
    const style = document.createElement('style');
    style.id = 'payment-mobile-styles';
    style.textContent = mobileStyles;
    document.head.appendChild(style);
}

console.log('✅ Final optimized JS loaded.');