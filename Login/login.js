// Example: simple form submit prevent
document.querySelector('.login-box form').addEventListener('submit', e=>{
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login process
            const loginButton = document.querySelector('.login-button');
            loginButton.textContent = 'Signing in...';
            loginButton.disabled = true;
            
            setTimeout(() => {
                alert('Login successful! Redirecting...');
                loginButton.textContent = 'Sign In';
                loginButton.disabled = false;
            }, 1500);
        });