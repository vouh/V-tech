// Payment form handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    const phoneInput = document.getElementById('phone');
    const amountInput = document.getElementById('amount');

    // Phone number formatting and validation
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 9) {
            value = value.slice(0, 9);
        }
        e.target.value = value;
    });

    // Amount validation
    amountInput.addEventListener('input', function(e) {
        let value = parseInt(e.target.value);
        if (value < 1) {
            e.target.value = '';
        }
        if (value > 150000) { // M-Pesa transaction limit
            e.target.value = '150000';
        }
    });

    // Form submission
    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const formData = {
            phone: phoneInput.value,
            amount: amountInput.value,
            paymentType: document.getElementById('paymentType').value,
            email: document.getElementById('email').value
        };

        // Validate phone number format
        if (formData.phone.length !== 9) {
            showError('Please enter a valid 9-digit phone number');
            return;
        }

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Simulate M-Pesa API call (replace with actual M-Pesa integration)
            await simulateMpesaPayment(formData);
            
            // Show success message
            showSuccess();
            
            // Reset form
            paymentForm.reset();
        } catch (error) {
            showError(error.message);
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    });
});

// Simulate M-Pesa payment (replace with actual M-Pesa integration)
async function simulateMpesaPayment(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90%) or failure (10%)
            if (Math.random() > 0.1) {
                resolve({
                    success: true,
                    message: 'Payment request sent successfully'
                });
            } else {
                reject(new Error('Payment request failed. Please try again.'));
            }
        }, 2000); // Simulate network delay
    });
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3 animate__animated animate__fadeIn';
    errorDiv.textContent = message;
    
    const form = document.getElementById('paymentForm');
    form.insertAdjacentElement('beforebegin', errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show success message
function showSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
    successDiv.innerHTML = `
        <div class="success-checkmark">
            <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
            </div>
        </div>
        <div class="text-center mt-3">
            <h4>Payment Request Sent!</h4>
            <p>Please check your phone for the M-Pesa prompt to complete the payment.</p>
        </div>
    `;
    
    const form = document.getElementById('paymentForm');
    form.insertAdjacentElement('beforebegin', successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Add M-Pesa logo placeholder if image fails to load
document.addEventListener('DOMContentLoaded', function() {
    const mpesaLogo = document.querySelector('.mpesa-logo');
    mpesaLogo.addEventListener('error', function() {
        this.style.display = 'none';
        const logoText = document.createElement('h3');
        logoText.className = 'text-primary mb-3';
        logoText.textContent = 'M-PESA';
        this.parentNode.insertBefore(logoText, this);
    });
});
