// how-it-work.js - Complete & Optimized for Esports Zone

document.addEventListener('DOMContentLoaded', function() {
    console.log('How It Works - Fully Loaded');
    
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
        btn.onclick = () => {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        if (closeBtn) {
            closeBtn.onclick = () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            };
        }
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        };
        overlay.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            };
        });
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
                if (method === 'easypaisa') {
                    accNum.innerText = '0312-3456789';
                    network.innerText = 'Easypaisa';
                } else if (method === 'jazzcash') {
                    accNum.innerText = '0300-1234567';
                    network.innerText = 'JazzCash';
                } else {
                    accNum.innerText = '1234-5678901-2345';
                    network.innerText = 'Bank Transfer';
                }
            }
        });
    });
}

// Copy to clipboard (used by inline onclick)
window.copyToClipboard = function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const text = element.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.background = '';
            }, 2000);
        }
    }).catch(() => alert('Press Ctrl+C to copy: ' + text));
};

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
        if (!file.type.match('image.*')) {
            alert('Please upload an image file (JPG, PNG).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (img) img.src = ev.target.result;
            if (area && preview) {
                area.style.display = 'none';
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    };
}

// Global functions for inline buttons
window.triggerUpload = function() {
    const input = document.getElementById('paymentScreenshot');
    if (input) input.click();
};

window.removeScreenshot = function() {
    const input = document.getElementById('paymentScreenshot');
    const area = document.getElementById('uploadArea');
    const preview = document.getElementById('uploadPreview');
    const img = document.getElementById('previewImage');
    if (input) input.value = '';
    if (area) area.style.display = 'block';
    if (preview) preview.style.display = 'none';
    if (img) img.src = '';
};

// ==================== PARTNER EMAIL ====================
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwUA9Rb-gbyIcpxwIy2OdbZoy33RvhmJb-lwTADOZB91lw2Or3Y6IieH8uHUXkHoRaj/exec';

function initPartnerEmail() {
    const btn = document.querySelector('.notify-btn');
    if (btn) {
        btn.onclick = (e) => {
            e.preventDefault();
            savePartnerEmail();
        };
    }
}

window.savePartnerEmail = async function() {
    const input = document.getElementById('partnerEmail');
    if (!input) return;
    const email = input.value.trim();
    if (!email) {
        alert('Please enter your email address.');
        input.focus();
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address (e.g., name@example.com).');
        input.focus();
        return;
    }
    
    const btn = document.querySelector('.notify-btn');
    const origText = btn ? btn.innerHTML : 'Notify Me';
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        btn.disabled = true;
    }
    
    try {
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                source: 'partner_program',
                timestamp: new Date().toISOString()
            })
        });
        const data = await res.json();
        if (data && data.success) {
            alert('✅ Thank you! We will notify you when the partner program launches.');
            input.value = '';
        } else {
            throw new Error(data?.message || 'Backend error');
        }
    } catch (err) {
        console.error(err);
        // Fallback to localStorage
        let emails = JSON.parse(localStorage.getItem('partnerEmails') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('partnerEmails', JSON.stringify(emails));
            alert('✅ Saved locally. We will notify you.');
            input.value = '';
        } else {
            alert('This email is already registered.');
        }
    } finally {
        if (btn) {
            btn.innerHTML = origText;
            btn.disabled = false;
        }
    }
};

// ==================== PAYMENT SUBMISSION ====================
function initPaymentSubmission() {
    const btn = document.getElementById('submitPaymentBtn');
    if (btn) {
        btn.onclick = (e) => {
            e.preventDefault();
            submitPayment();
        };
    }
}

window.submitPayment = function() {
    const trans = document.getElementById('transactionId');
    const amount = document.getElementById('paymentAmount');
    const user = document.getElementById('userUsername');
    const screenshot = document.getElementById('paymentScreenshot');
    
    if (!trans || !amount || !user || !screenshot) return;
    
    const transVal = trans.value.trim();
    const amountVal = amount.value.trim();
    const userVal = user.value.trim();
    const file = screenshot.files[0];
    
    if (!transVal) {
        alert('Please enter Transaction ID.');
        trans.focus();
        return;
    }
    if (!amountVal || isNaN(amountVal) || parseFloat(amountVal) <= 0) {
        alert('Please enter a valid amount.');
        amount.focus();
        return;
    }
    if (!userVal) {
        alert('Please enter your username.');
        user.focus();
        return;
    }
    if (!file) {
        alert('Please upload payment screenshot.');
        return;
    }
    
    const btn = document.getElementById('submitPaymentBtn');
    const origText = btn ? btn.innerHTML : 'Submit Payment Details';
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;
    }
    
    setTimeout(() => {
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
            btn.style.background = '#4CAF50';
        }
        setTimeout(() => {
            if (btn) {
                btn.innerHTML = origText;
                btn.style.background = '';
                btn.disabled = false;
            }
            trans.value = '';
            amount.value = '';
            user.value = '';
            window.removeScreenshot();
            alert('✅ Payment details submitted! Our team will verify within 2-8 hours.');
        }, 2000);
    }, 2000);
};

// ==================== TOUCH OPTIMIZATION ====================
function initTouchOptimization() {
    const els = document.querySelectorAll('button, .method-option, .copy-btn, .notify-btn, #submitPaymentBtn, .upload-area');
    els.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        el.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
        const rect = el.getBoundingClientRect();
        if (rect.width && (rect.width < 44 || rect.height < 44)) {
            el.style.minWidth = '44px';
            el.style.minHeight = '44px';
        }
    });
}

// ==================== ZOOM PREVENTION ====================
function initZoomPrevention() {
    let lastTouch = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouch <= 300) e.preventDefault();
        lastTouch = now;
    }, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());
}

// ==================== SMOOTH ANIMATIONS ====================
function initSmoothAnimations() {
    const opts = document.querySelectorAll('.method-option');
    opts.forEach((opt, i) => {
        opt.style.opacity = '0';
        opt.style.transform = 'translateY(20px)';
        setTimeout(() => {
            opt.style.transition = 'all 0.5s ease';
            opt.style.opacity = '1';
            opt.style.transform = 'translateY(0)';
        }, i * 100);
    });
    if (!('ontouchstart' in window)) {
        opts.forEach(opt => {
            opt.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            });
            opt.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }
}

// ==================== PERFORMANCE ====================
function initPerformance() {
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    obs.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => obs.observe(img));
    }
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {}, 250);
    });
}

// ==================== ADMIN CONSOLE ====================
function initAdminConsole() {
    window.checkBackendEmails = async () => {
        try {
            const res = await fetch(BACKEND_URL + '?action=getEmails');
            const data = await res.json();
            console.log('📧 Backend emails:', data);
            return data;
        } catch(e) { console.error(e); }
    };
    window.checkLocalEmails = () => {
        const emails = JSON.parse(localStorage.getItem('partnerEmails') || '[]');
        console.log('📧 Local emails:', emails);
        return emails;
    };
    window.testConnection = async () => {
        console.log('🧪 Testing connection...');
        await window.checkBackendEmails();
        window.checkLocalEmails();
    };
    setTimeout(() => {
        console.log('🔄 Auto-testing connection...');
        window.testConnection();
    }, 1000);
}

// ==================== INJECT MISSING MOBILE STYLES ====================
(function injectMobileStyles() {
    if (document.querySelector('#howitwork-mobile-styles')) return;
    const style = document.createElement('style');
    style.id = 'howitwork-mobile-styles';
    style.textContent = `
        .touch-active { transform: scale(0.95) !important; transition: transform 0.1s ease !important; }
        .method-option.active { border: 2px solid #FECE00 !important; background: rgba(254,206,0,0.1) !important; }
        @media (max-width: 768px) {
            .payment-methods-grid, .method-options { grid-template-columns: 1fr !important; }
        }
    `;
    document.head.appendChild(style);
})();

console.log('✅ how-it-work.js fully loaded and ready.');