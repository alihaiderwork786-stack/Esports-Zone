// STRONG PASSWORD HASHING WITH PBKDF2
async function hashPassword(password) {
    // Convert password to Uint8Array
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // Generate a random salt
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Import the password as a key
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    
    // Derive key using PBKDF2
    const derivedKey = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        256
    );
    
    // Convert to hexadecimal
    const hashArray = Array.from(new Uint8Array(derivedKey));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Return salt + hash for storage
    return `${saltHex}:${hashHex}`;
}

// Verify password against stored hash
async function verifyPassword(password, storedHash) {
    try {
        const [saltHex, originalHash] = storedHash.split(':');
        
        // Convert hex salt back to Uint8Array
        const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        );
        
        const derivedKey = await crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            256
        );
        
        const hashArray = Array.from(new Uint8Array(derivedKey));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex === originalHash;
    } catch (error) {
        console.error('Password verification error:', error);
        return false;
    }
}

// UNIQUE EZ ID GENERATOR
class EZIDGenerator {
    static getNextEZID() {
        // Get current users to determine next ID
        const users = JSON.parse(localStorage.getItem('esports_users') || '[]');
        const ezUsers = users.filter(user => user.ezID && user.ezID.startsWith('EZ'));
        
        if (ezUsers.length === 0) {
            return 'EZ0001'; // First user
        }
        
        // Get the highest EZ ID
        const highestID = ezUsers.reduce((max, user) => {
            const num = parseInt(user.ezID.replace('EZ', ''));
            return num > max ? num : max;
        }, 0);
        
        // Generate next ID
        const nextNum = highestID + 1;
        return `EZ${nextNum.toString().padStart(4, '0')}`;
    }
}

// COMPLETE DATABASE SYSTEM
const Database = {
    init() {
        if (!localStorage.getItem('esports_users')) {
            localStorage.setItem('esports_users', JSON.stringify([]));
        }
        if (!localStorage.getItem('esports_verifications')) {
            localStorage.setItem('esports_verifications', JSON.stringify([]));
        }
        if (!localStorage.getItem('esports_ez_counter')) {
            localStorage.setItem('esports_ez_counter', '1'); // Start from 1
        }
    },

    users: {
        getAll() {
            return JSON.parse(localStorage.getItem('esports_users') || '[]');
        },

        findByEmail(email) {
            const users = this.getAll();
            return users.find(user => user.email === email);
        },

        findByEZID(ezID) {
            const users = this.getAll();
            return users.find(user => user.ezID === ezID);
        },

        findByMobile(mobile) {
            if (!mobile) return null;
            const users = this.getAll();
            return users.find(user => user.mobile === mobile);
        },

        async create(userData) {
            const users = this.getAll();
            
            // Check if user already exists
            if (this.findByEmail(userData.email)) {
                return { success: false, message: 'User with this email already exists' };
            }
            
            if (userData.mobile && this.findByMobile(userData.mobile)) {
                return { success: false, message: 'User with this mobile number already exists' };
            }

            // Generate unique EZ ID
            const ezID = EZIDGenerator.getNextEZID();
            
            // Hash the password before storing
            const hashedPassword = await hashPassword(userData.password);

            const newUser = {
                id: Date.now().toString(),
                ezID: ezID, // UNIQUE ESPORTS ZONE ID
                ...userData,
                password: hashedPassword, // Store hashed password
                isVerified: false,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lastLogin: null,
                loginCount: 0
            };

            users.push(newUser);
            localStorage.setItem('esports_users', JSON.stringify(users));
            
            console.log(`✅ New user registered: ${ezID} - ${userData.email}`);
            
            return { 
                success: true, 
                user: newUser,
                message: `Account created successfully! Your EZ ID: ${ezID}`
            };
        },

        update(email, updates) {
            const users = this.getAll();
            const userIndex = users.findIndex(user => user.email === email);
            
            if (userIndex === -1) {
                return { success: false, message: 'User not found' };
            }

            users[userIndex] = {
                ...users[userIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            localStorage.setItem('esports_users', JSON.stringify(users));
            return { success: true, user: users[userIndex] };
        },

        verifyEmail(email) {
            return this.update(email, { 
                isVerified: true,
                verifiedAt: new Date().toISOString()
            });
        },

        recordLogin(email) {
            const user = this.findByEmail(email);
            if (user) {
                return this.update(email, {
                    lastLogin: new Date().toISOString(),
                    loginCount: (user.loginCount || 0) + 1
                });
            }
            return { success: false, message: 'User not found' };
        }
    },

    verifications: {
        getAll() {
            return JSON.parse(localStorage.getItem('esports_verifications') || '[]');
        },

        createCode(email, type = 'register') {
            const codes = this.getAll();
            
            this.clearCodes(email);
            
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const verification = {
                id: Date.now().toString(),
                email,
                code,
                type,
                expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
                createdAt: new Date().toISOString(),
                attempts: 0,
                maxAttempts: 5
            };

            codes.push(verification);
            localStorage.setItem('esports_verifications', JSON.stringify(codes));
            
            console.log(`📧 Verification code created for ${email}: ${code}`);
            
            return code;
        },

        verifyCode(email, code, type = 'register') {
            const codes = this.getAll();
            const now = new Date();
            
            const verification = codes.find(v => 
                v.email === email && 
                v.type === type &&
                new Date(v.expiresAt) > now
            );

            if (!verification) {
                return { success: false, message: 'Verification code expired or not found' };
            }

            // Check attempts
            if (verification.attempts >= verification.maxAttempts) {
                this.clearCodes(email);
                return { success: false, message: 'Too many attempts. Please request a new code.' };
            }

            // Increment attempts
            verification.attempts++;
            const updatedCodes = codes.map(v => 
                v.email === email && v.type === type ? verification : v
            );
            localStorage.setItem('esports_verifications', JSON.stringify(updatedCodes));

            if (verification.code === code) {
                this.clearCodes(email);
                console.log(`✅ Email verified successfully: ${email}`);
                return { success: true, message: 'Email verified successfully' };
            } else {
                const remainingAttempts = verification.maxAttempts - verification.attempts;
                return { 
                    success: false, 
                    message: `Invalid code. ${remainingAttempts} attempts remaining.` 
                };
            }
        },

        clearCodes(email) {
            const codes = this.getAll();
            const filteredCodes = codes.filter(v => v.email !== email);
            localStorage.setItem('esports_verifications', JSON.stringify(filteredCodes));
        }
    }
};

// EMAIL SERVICE
const EmailService = {
    sentEmails: JSON.parse(localStorage.getItem('esports_sent_emails') || '[]'),

    async sendVerificationEmail(email, verificationCode, type = 'register', ezID = null) {
        const subject = type === 'register' 
            ? 'Verify Your Esports Zone Account' 
            : 'Your Login Verification Code';

        const greeting = type === 'register' 
            ? `Welcome to Esports Zone${ezID ? ` (${ezID})` : ''}!` 
            : 'Login Verification';

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #191B2D, #FECE00); padding: 30px; text-align: center; color: white;">
                    <h1 style="margin: 0; font-size: 2rem;">🎮 Esports Zone</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Gaming Community</p>
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #191B2D; margin-bottom: 20px;">${greeting}</h2>
                    
                    ${type === 'register' && ezID ? `
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #FECE00;">
                        <p style="margin: 0; color: #191B2D; font-weight: bold;">
                            Your EZ ID: <span style="color: #FECE00;">${ezID}</span>
                        </p>
                    </div>
                    ` : ''}
                    
                    <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                        ${type === 'register' 
                            ? 'Thank you for registering with Esports Zone! To complete your registration and secure your account, please use the verification code below:' 
                            : 'For your security, please use the verification code below to login to your account:'}
                    </p>
                    
                    <div style="background: linear-gradient(135deg, #FECE00, #ffd93b); padding: 25px; margin: 25px 0; text-align: center; border-radius: 10px; box-shadow: 0 4px 15px rgba(254, 206, 0, 0.3);">
                        <h1 style="color: #191B2D; font-size: 2.5rem; letter-spacing: 8px; margin: 0; font-weight: bold;">
                            ${verificationCode}
                        </h1>
                    </div>
                    
                    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeaa7;">
                        <p style="color: #856404; margin: 0; font-size: 0.9rem;">
                            <strong>⚠️ Important:</strong> This code will expire in 30 minutes.
                            ${type === 'register' 
                                ? 'If you didn\'t create an account with Esports Zone, please ignore this email.' 
                                : 'If you didn\'t request this login code, please secure your account immediately.'}
                        </p>
                    </div>
                </div>
                <div style="background: #191B2D; padding: 20px; text-align: center; color: white;">
                    <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">
                        &copy; 2024 Esports Zone. All rights reserved.<br>
                        <span style="font-size: 0.8rem;">This is an automated message, please do not reply.</span>
                    </p>
                </div>
            </div>
        `;

        const emailRecord = {
            id: Date.now().toString(),
            to: email,
            subject,
            html,
            verificationCode,
            type,
            ezID,
            sentAt: new Date().toISOString(),
            status: 'sent'
        };

        this.sentEmails.push(emailRecord);
        localStorage.setItem('esports_sent_emails', JSON.stringify(this.sentEmails));

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log(`📧 Email sent to ${email}`);
        console.log(`🔐 Verification Code: ${verificationCode}`);
        if (ezID) console.log(`🎮 EZ ID Assigned: ${ezID}`);
        
        return { 
            success: true, 
            code: verificationCode,
            emailRecord 
        };
    },

    getLastVerificationCode(email) {
        const emails = this.sentEmails.filter(e => e.to === email);
        return emails.length > 0 ? emails[emails.length - 1].verificationCode : null;
    }
};

// AUTHENTICATION SERVICE
const authService = {
    async register(firstName, lastName, email, mobile, password, confirmPassword, game) {
        try {
            // Validation
            if (password !== confirmPassword) {
                return { success: false, message: 'Passwords do not match' };
            }

            if (password.length < 6) {
                return { success: false, message: 'Password must be at least 6 characters long' };
            }

            // Mobile validation (optional)
            if (mobile && !/^[0-9]{10}$/.test(mobile)) {
                return { success: false, message: 'Please enter a valid 10-digit mobile number' };
            }

            // Create user in database
            const userResult = await Database.users.create({
                firstName,
                lastName,
                email,
                mobile: mobile || '',
                password,
                game: game || '',
                username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`
            });

            if (!userResult.success) {
                return userResult;
            }

            // Send verification email with EZ ID
            const verificationCode = Database.verifications.createCode(email, 'register');
            const emailResult = await EmailService.sendVerificationEmail(
                email, 
                verificationCode, 
                'register', 
                userResult.user.ezID
            );

            return { 
                success: true, 
                message: `Account created successfully! Verification code sent to ${email}. Your EZ ID: ${userResult.user.ezID}`,
                userId: userResult.user.id,
                ezID: userResult.user.ezID
            };

        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Registration failed. Please try again.' };
        }
    },

    async verifyEmail(email, code) {
        try {
            const result = Database.verifications.verifyCode(email, code, 'register');
            
            if (!result.success) {
                return result;
            }

            // Update user verification status
            const verifyResult = Database.users.verifyEmail(email);
            
            if (verifyResult.success) {
                const user = Database.users.findByEmail(email);
                return { 
                    success: true, 
                    message: 'Email verified successfully! Your account is now active.',
                    user: user 
                };
            } else {
                return { success: false, message: 'Failed to verify email' };
            }
        } catch (error) {
            console.error('Email verification error:', error);
            return { success: false, message: 'Verification failed. Please try again.' };
        }
    },

    async login(email, password) {
        try {
            const user = Database.users.findByEmail(email);
            
            if (!user) {
                return { success: false, message: 'User not found' };
            }

            // Verify password
            const isPasswordValid = await verifyPassword(password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Invalid password' };
            }

            if (!user.isVerified) {
                const verificationCode = Database.verifications.createCode(email, 'login');
                await EmailService.sendVerificationEmail(email, verificationCode, 'login', user.ezID);
                
                return { 
                    success: false, 
                    message: 'Account not verified. Verification code sent to your email.',
                    requiresVerification: true 
                };
            }

            // Record login and create session
            Database.users.recordLogin(email);
            const session = {
                userId: user.id,
                ezID: user.ezID,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                game: user.game,
                loggedInAt: new Date().toISOString()
            };
            localStorage.setItem('esports_session', JSON.stringify(session));

            return { 
                success: true, 
                message: 'Login successful!',
                user: {
                    id: user.id,
                    ezID: user.ezID,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobile: user.mobile,
                    game: user.game,
                    username: user.username
                }
            };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    },

    async verifyLogin(email, code) {
        try {
            const result = Database.verifications.verifyCode(email, code, 'login');
            
            if (!result.success) {
                return result;
            }

            const user = Database.users.findByEmail(email);
            Database.users.recordLogin(email);
            
            const session = {
                userId: user.id,
                ezID: user.ezID,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                game: user.game,
                loggedInAt: new Date().toISOString()
            };
            localStorage.setItem('esports_session', JSON.stringify(session));

            return { 
                success: true, 
                message: 'Login successful!',
                user: {
                    id: user.id,
                    ezID: user.ezID,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobile: user.mobile,
                    game: user.game,
                    username: user.username
                }
            };
        } catch (error) {
            console.error('Login verification error:', error);
            return { success: false, message: 'Login verification failed.' };
        }
    },

    isLoggedIn() {
        const session = localStorage.getItem('esports_session');
        return session ? JSON.parse(session) : null;
    },

    logout() {
        localStorage.removeItem('esports_session');
        return { success: true, message: 'Logged out successfully' };
    },

    // Get user profile
    getProfile() {
        const session = this.isLoggedIn();
        if (!session) return null;
        
        const user = Database.users.findByEmail(session.email);
        return user;
    }
};

// Initialize database when script loads
Database.init();

// DOM Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const registerBtn = document.getElementById('registerBtn');
            const btnText = registerBtn.querySelector('.btn-text');
            const btnLoader = registerBtn.querySelector('.btn-loader');
            
            // Show loading state
            btnText.textContent = 'Creating Account...';
            btnLoader.classList.remove('hidden');
            registerBtn.disabled = true;
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const mobile = document.getElementById('mobile').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const game = document.getElementById('gameSelect').value;
            
            try {
                const result = await authService.register(
                    firstName, 
                    lastName, 
                    email, 
                    mobile, 
                    password, 
                    confirmPassword, 
                    game
                );
                
                if (result.success) {
                    showMessage('successMessage', result.message);
                    // Store registration info temporarily for verification page
                    localStorage.setItem('pending_verification', JSON.stringify({
                        email: email,
                        ezID: result.ezID,
                        timestamp: new Date().toISOString()
                    }));
                    
                    // Redirect to verification page after delay
                    setTimeout(() => {
                        window.location.href = `verify-email.html?email=${encodeURIComponent(email)}&type=register&ezid=${result.ezID}`;
                    }, 3000);
                } else {
                    showMessage('errorMessage', result.message);
                }
            } catch (error) {
                console.error('Registration error:', error);
                showMessage('errorMessage', 'An unexpected error occurred. Please try again.');
            } finally {
                btnText.textContent = 'Create Account';
                btnLoader.classList.add('hidden');
                registerBtn.disabled = false;
            }
        });

        // Password toggle functionality
        document.getElementById('togglePassword').addEventListener('click', function() {
            togglePasswordVisibility('password', this);
        });

        document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
            togglePasswordVisibility('confirmPassword', this);
        });

        function togglePasswordVisibility(inputId, iconElement) {
            const passwordInput = document.getElementById(inputId);
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            iconElement.classList.toggle('fa-eye');
            iconElement.classList.toggle('fa-eye-slash');
        }

        // Game select styling
        document.getElementById('gameSelect').addEventListener('change', function() {
            if (this.value === '') {
                this.style.color = '#999';
            } else {
                this.style.color = '#000';
            }
        });
    }
});

function showMessage(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 7000);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { authService, Database, EmailService };
}