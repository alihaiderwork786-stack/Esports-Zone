// how-it-work.js – Esports Zone "How It Works" Page (Corrected)
// Removed override of the partner program email form – HTML native submission restored

document.addEventListener('DOMContentLoaded', function() {
    console.log('How It Works – Page initialised');

    // 1. Mobile Navigation
    initMobileNavigation();

    // 2. Payment Method Switcher
    initPaymentMethodSwitcher();

    // 3. Upload screenshot (open file picker, preview, replace/remove)
    initUploadHandler();

    // 4. Copy account number button
    initCopyButton();

    // 5. Submit payment details (frontend only, shows success message)
    initPaymentSubmission();

    // 6. Touch optimisations
    initTouchOptimisation();

    // 7. Smooth animations
    initSmoothAnimations();

    // NOTE: The partner program email notification form is NOT overridden.
    // It works as defined in the HTML (Web3Forms backend).
});

// ========== 1. MOBILE NAVIGATION ==========
function initMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const mobileAuthBtns = document.querySelectorAll('.mobile-auth-buttons a');

    if (!mobileMenuBtn || !mobileOverlay) return;

    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    mobileAuthBtns.forEach(btn => btn.addEventListener('click', closeMenu));

    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) closeMenu();
    });
}

// ========== 2. PAYMENT METHOD SWITCHER ==========
function initPaymentMethodSwitcher() {
    const methodOptions = document.querySelectorAll('.method-option');
    const accountNumberSpan = document.getElementById('accountNumber');
    const paymentNetworkSpan = document.getElementById('paymentNetwork');

    if (!methodOptions.length || !accountNumberSpan || !paymentNetworkSpan) return;

    const methodDetails = {
        easypaisa: {
            number: '0329-1924919',
            network: 'Easypaisa'
        },
        jazzcash: {
            number: '0329-1924919',
            network: 'JazzCash'
        },
        bank: {
            number: 'PK36 HABB 0000 1234 5678 9',
            network: 'Bank Transfer (HBL)'
        }
    };

    function setActiveMethod(activeElement) {
        methodOptions.forEach(opt => opt.classList.remove('active'));
        activeElement.classList.add('active');

        const method = activeElement.getAttribute('data-method');
        if (method && methodDetails[method]) {
            accountNumberSpan.textContent = methodDetails[method].number;
            paymentNetworkSpan.textContent = methodDetails[method].network;
        }
    }

    methodOptions.forEach(option => {
        option.addEventListener('click', function() {
            setActiveMethod(this);
        });
    });

    const defaultActive = document.querySelector('.method-option.active');
    if (defaultActive) setActiveMethod(defaultActive);
    else if (methodOptions[0]) setActiveMethod(methodOptions[0]);
}

// ========== 3. UPLOAD SCREENSHOT ==========
function initUploadHandler() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('paymentScreenshot');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImg = document.getElementById('previewImage');
    const replaceBtn = document.querySelector('.replace');
    const removeBtn = document.querySelector('.remove');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (previewImg) {
                    previewImg.src = e.target.result;
                    uploadPreview.style.display = 'block';
                    uploadArea.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        } else if (file) {
            alert('Please select a valid image file (JPG, PNG, JPEG).');
            fileInput.value = '';
        }
    });

    if (replaceBtn) {
        replaceBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }

    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            fileInput.value = '';
            if (previewImg) previewImg.src = '';
            uploadPreview.style.display = 'none';
            uploadArea.style.display = 'block';
        });
    }
}

// ========== 4. COPY ACCOUNT NUMBER ==========
function initCopyButton() {
    const copyBtn = document.querySelector('.copy-btn');
    const accountNumberSpan = document.getElementById('accountNumber');

    if (!copyBtn || !accountNumberSpan) return;

    copyBtn.addEventListener('click', function() {
        const textToCopy = accountNumberSpan.textContent;
        if (!textToCopy) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Account number copied!', 'success');
            }).catch(() => {
                fallbackCopy(textToCopy);
            });
        } else {
            fallbackCopy(textToCopy);
        }
    });

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Account number copied!', 'success');
    }

    function showToast(msg, type) {
        let toast = document.querySelector('.payment-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'payment-toast';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
            toast.style.color = 'white';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.zIndex = '9999';
            toast.style.fontWeight = '600';
            toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 2500);
    }
}

// ========== 5. SUBMIT PAYMENT DETAILS (FRONTEND ONLY) ==========
function initPaymentSubmission() {
    const submitBtn = document.getElementById('submitPaymentBtn');
    if (!submitBtn) return;

    const transactionInput = document.getElementById('transactionId');
    const amountInput = document.getElementById('paymentAmount');
    const usernameInput = document.getElementById('userUsername');

    let successMsgDiv = document.querySelector('.payment-success-msg');
    if (!successMsgDiv) {
        successMsgDiv = document.createElement('div');
        successMsgDiv.className = 'payment-success-msg';
        successMsgDiv.style.marginTop = '20px';
        successMsgDiv.style.padding = '12px';
        successMsgDiv.style.borderRadius = '8px';
        successMsgDiv.style.textAlign = 'center';
        successMsgDiv.style.fontWeight = '600';
        successMsgDiv.style.display = 'none';
        submitBtn.parentNode.insertBefore(successMsgDiv, submitBtn.nextSibling);
    }

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const transactionId = transactionInput ? transactionInput.value.trim() : '';
        const amount = amountInput ? amountInput.value.trim() : '';
        const username = usernameInput ? usernameInput.value.trim() : '';

        if (!transactionId || !amount || !username) {
            showFormError('Please fill in all fields (Transaction ID, Amount, Username).');
            return;
        }

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            showFormError('Please enter a valid amount.');
            return;
        }

        successMsgDiv.textContent = '✅ Payment submitted successfully! Our team will verify and add coins within 2-8 hours.';
        successMsgDiv.style.backgroundColor = 'rgba(76, 175, 80, 0.15)';
        successMsgDiv.style.color = '#2e7d32';
        successMsgDiv.style.border = '1px solid #4CAF50';
        successMsgDiv.style.display = 'block';
        successMsgDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            if (successMsgDiv) successMsgDiv.style.display = 'none';
        }, 6000);
    });

    function showFormError(message) {
        let errorDiv = document.querySelector('.payment-error-msg');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'payment-error-msg';
            errorDiv.style.marginTop = '15px';
            errorDiv.style.padding = '10px';
            errorDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
            errorDiv.style.color = '#d32f2f';
            errorDiv.style.borderRadius = '6px';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.fontWeight = '500';
            submitBtn.parentNode.insertBefore(errorDiv, submitBtn.nextSibling);
        }
        errorDiv.textContent = '⚠️ ' + message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            if (errorDiv) errorDiv.style.display = 'none';
        }, 4000);
    }
}

// ========== 6. TOUCH OPTIMISATIONS ==========
function initTouchOptimisation() {
    const interactiveElements = document.querySelectorAll(
        'a, button, .method-option, .tournament-card, .step-detailed, .benefit-card, .support-option, .faq-question'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        el.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    interactiveElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            el.style.minWidth = '44px';
            el.style.minHeight = '44px';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const pos = target.offsetTop - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            }
        });
    });
}

// ========== 7. SMOOTH ANIMATIONS (SCROLL REVEAL) ==========
function initSmoothAnimations() {
    const animatedElements = document.querySelectorAll('.step-detailed, .benefit-card, .support-option, .overview-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    if (!('ontouchstart' in window)) {
        const cards = document.querySelectorAll('.step-detailed, .benefit-card, .overview-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-6px)';
                card.style.boxShadow = '0 12px 25px rgba(0,0,0,0.1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }
}