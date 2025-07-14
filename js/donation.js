// Donation page functionality
// Handles amount selection and payment button

document.addEventListener('DOMContentLoaded', function() {
    // Only run on donation page
    if (!document.getElementById('proceedToPayment')) return;
    
    console.log('Initializing donation functionality');
    
    initAmountSelection();
    initPaymentButton();
});

/**
 * Initialize donation amount selection functionality
 */
function initAmountSelection() {
    const amountButtons = document.querySelectorAll('.amount-button');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountDisplay = document.getElementById('selectedAmount');
    
    if (!amountButtons.length || !selectedAmountDisplay) return;
    
    // Add click event listeners to preset amount buttons
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            selectAmount(amount, this);
        });
    });
    
    // Add input event listener to custom amount field
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const customAmount = this.value;
            if (customAmount && customAmount > 0) {
                selectAmount(customAmount, null);
            }
        });
        
        customAmountInput.addEventListener('focus', function() {
            // Clear preset selection when custom input is focused
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }
}

/**
 * Select donation amount and update UI
 * @param {string|number} amount - Selected amount
 * @param {HTMLElement|null} buttonElement - Button element that was clicked (null for custom amount)
 */
function selectAmount(amount, buttonElement) {
    const selectedAmountDisplay = document.getElementById('selectedAmount');
    const customAmountInput = document.getElementById('customAmount');
    const amountButtons = document.querySelectorAll('.amount-button');
    
    // Update display
    selectedAmountDisplay.textContent = `$${amount}`;
    
    // Update button states
    if (buttonElement) {
        // Preset amount selected
        amountButtons.forEach(btn => btn.classList.remove('active'));
        buttonElement.classList.add('active');
        
        // Clear custom input
        if (customAmountInput) {
            customAmountInput.value = '';
        }
    } else {
        // Custom amount selected
        amountButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    // Store selected amount for payment processing
    window.selectedDonationAmount = amount;
    
    // Announce to screen readers
    window.DogAdoption.announceToScreenReader(`Selected donation amount: $${amount}`);
}

/**
 * Initialize payment button functionality
 */
function initPaymentButton() {
    const paymentButton = document.getElementById('proceedToPayment');
    
    if (!paymentButton) return;
    
    paymentButton.addEventListener('click', function() {
        const amount = window.selectedDonationAmount || 75; // Default to $75
        proceedToPayment(amount);
    });
}

/**
 * Handle proceed to payment action
 * @param {string|number} amount - Donation amount
 */
function proceedToPayment(amount) {
    // Show loading state
    const paymentButton = document.getElementById('proceedToPayment');
    const originalText = paymentButton.innerHTML;
    
    paymentButton.innerHTML = `
        <span class="button-text">processing...</span>
    `;
    paymentButton.disabled = true;
    
    // Simulate payment processing delay
    setTimeout(() => {
        // In a real application, this would redirect to a payment processor
        // For now, we'll show a confirmation message
        showPaymentConfirmation(amount);
        
        // Reset button after delay
        setTimeout(() => {
            paymentButton.innerHTML = originalText;
            paymentButton.disabled = false;
        }, 2000);
    }, 1500);
    
    // Announce to screen readers
    window.DogAdoption.announceToScreenReader(`Processing $${amount} donation`);
}

/**
 * Show payment confirmation message
 * @param {string|number} amount - Donation amount
 */
function showPaymentConfirmation(amount) {
    // Create confirmation modal
    const confirmationHTML = `
        <div class="modal" id="confirmationModal" style="display: block;">
            <div class="modal-content" style="max-width: 500px; text-align: center;">
                <span class="close" onclick="closeConfirmationModal()">&times;</span>
                <div class="modal-body">
                    <h2 style="font-size: 28px; font-weight: 300; color: #333; margin-bottom: 20px; text-transform: lowercase;">thank you!</h2>
                    <p style="font-size: 18px; color: #666; margin-bottom: 30px;">
                        in a real application, you would now be redirected to our secure payment processor to complete your $${amount} donation.
                    </p>
                    <p style="font-size: 16px; color: #666; margin-bottom: 30px;">
                        this is a demonstration website. no actual payment will be processed.
                    </p>
                    <button onclick="closeConfirmationModal()" class="payment-button" style="background-color: #333; color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 16px; cursor: pointer;">
                        close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
    
    // Focus on close button for accessibility
    const closeButton = document.querySelector('#confirmationModal .payment-button');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Announce to screen readers
    window.DogAdoption.announceToScreenReader('Payment confirmation displayed');
}

/**
 * Close confirmation modal
 */
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.remove();
        window.DogAdoption.announceToScreenReader('Payment confirmation closed');
    }
}

/**
 * Format currency for display
 * @param {string|number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Validate donation amount
 * @param {string|number} amount - Amount to validate
 * @returns {boolean} True if valid
 */
function validateAmount(amount) {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount > 0 && numAmount <= 10000;
}

// Make functions globally available
window.closeConfirmationModal = closeConfirmationModal;
window.DonationPage = {
    selectAmount,
    proceedToPayment,
    formatCurrency,
    validateAmount
}; 