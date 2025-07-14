// Main JavaScript for Homeless Dog Adoption Website
// Basic functionality and utilities

document.addEventListener('DOMContentLoaded', function() {
    console.log('Homeless Dog Adoption Website loaded');
    
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initAccessibility();
    loadRecentUpdates();
});

/**
 * Load and display recent updates from JSON file
 */
async function loadRecentUpdates() {
    const updatesGrid = document.getElementById('updatesGrid');
    
    // Only run on homepage
    if (!updatesGrid) return;
    
    try {
        showLoading(updatesGrid);
        
        const response = await fetch('data/updates.json');
        if (!response.ok) {
            throw new Error('Failed to load updates data');
        }
        
        const updates = await response.json();
        
        // Sort by priority and limit to first 3 updates
        const recentUpdates = updates.sort((a, b) => a.priority - b.priority).slice(0, 3);
        
        displayUpdates(recentUpdates);
        announceToScreenReader(`${recentUpdates.length} recent updates loaded`);
        
    } catch (error) {
        console.error('Error loading updates:', error);
        updatesGrid.innerHTML = `
            <div class="error-message">
                <p>unable to load recent updates at this time. please try again later.</p>
                <button onclick="loadRecentUpdates()" class="retry-button">retry</button>
            </div>
        `;
    }
}

/**
 * Display updates in the grid
 * @param {Array} updates - Array of update objects
 */
function displayUpdates(updates) {
    const updatesGrid = document.getElementById('updatesGrid');
    
    if (!updatesGrid) return;
    
    if (updates.length === 0) {
        updatesGrid.innerHTML = `
            <div class="no-updates">
                <p>no recent updates available.</p>
            </div>
        `;
        return;
    }
    
    const updatesHTML = updates.map(update => createUpdateCard(update)).join('');
    updatesGrid.innerHTML = updatesHTML;
}

/**
 * Create HTML for a single update card
 * @param {Object} update - Update object
 * @returns {string} HTML string for update card
 */
function createUpdateCard(update) {
    return `
        <div class="update-card" data-update-id="${update.id}" data-type="${update.type}">
            <div class="update-date">${update.date}</div>
            <h4 class="update-title">${update.title}</h4>
            <p class="update-description">${update.description}</p>
        </div>
    `;
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add scroll effect to navigation
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, false);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize fade-in animations on scroll
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const animateElements = document.querySelectorAll('.update-card, .step, .impact-item, .dog-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            closeAllModals();
        }
        
        // Enter/Space for button-like elements
        if ((e.key === 'Enter' || e.key === ' ') && e.target.hasAttribute('role')) {
            const role = e.target.getAttribute('role');
            if (role === 'button') {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add screen reader announcements for dynamic content
    addScreenReaderAnnouncements();
}

/**
 * Close all open modals
 */
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Add screen reader announcements
 */
function addScreenReaderAnnouncements() {
    // Create announcement element
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(announcer);
    
    // Store reference for use in other scripts
    window.screenReaderAnnouncer = announcer;
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    if (window.screenReaderAnnouncer) {
        window.screenReaderAnnouncer.textContent = message;
    }
}

/**
 * Show loading state
 * @param {HTMLElement} element - Element to show loading state
 */
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading">loading...</div>';
        element.setAttribute('aria-busy', 'true');
    }
}

/**
 * Hide loading state
 * @param {HTMLElement} element - Element to hide loading state
 */
function hideLoading(element) {
    if (element) {
        element.removeAttribute('aria-busy');
    }
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Utility function to format text
 * @param {string} text - Text to format
 * @returns {string} Formatted text
 */
function formatText(text) {
    return text.toLowerCase().trim();
}

/**
 * Utility function to capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Make utility functions globally available
window.DogAdoption = {
    announceToScreenReader,
    showLoading,
    hideLoading,
    debounce,
    formatText,
    capitalizeFirst,
    closeAllModals,
    loadRecentUpdates
}; 