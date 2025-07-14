// Dog filtering and display functionality for adoption page
// Handles loading dogs, filtering, and modal interactions

let allDogs = [];
let filteredDogs = [];

document.addEventListener('DOMContentLoaded', function() {
    // Only run on adoption page
    if (!document.getElementById('dogsGrid')) return;
    
    console.log('Initializing dog adoption functionality');
    
    loadDogs();
    initFilters();
    initModal();
});

/**
 * Load dog data from JSON file
 */
async function loadDogs() {
    const dogsGrid = document.getElementById('dogsGrid');
    
    try {
        window.DogAdoption.showLoading(dogsGrid);
        
        const response = await fetch('../data/dogs.json');
        if (!response.ok) {
            throw new Error('Failed to load dog data');
        }
        
        allDogs = await response.json();
        filteredDogs = [...allDogs];
        
        displayDogs(filteredDogs);
        window.DogAdoption.announceToScreenReader(`${allDogs.length} dogs loaded and available for adoption`);
        
    } catch (error) {
        console.error('Error loading dogs:', error);
        dogsGrid.innerHTML = `
            <div class="error-message">
                <p>unable to load dogs at this time. please try again later.</p>
                <button onclick="loadDogs()" class="retry-button">retry</button>
            </div>
        `;
    }
}

/**
 * Display dogs in the grid
 * @param {Array} dogs - Array of dog objects to display
 */
function displayDogs(dogs) {
    const dogsGrid = document.getElementById('dogsGrid');
    
    if (dogs.length === 0) {
        dogsGrid.innerHTML = `
            <div class="no-results">
                <p>no dogs match your criteria. try adjusting your filters.</p>
            </div>
        `;
        return;
    }
    
    const dogsHTML = dogs.map(dog => createDogCard(dog)).join('');
    dogsGrid.innerHTML = dogsHTML;
    
    // Add click event listeners to dog cards
    const dogCards = dogsGrid.querySelectorAll('.dog-card');
    dogCards.forEach((card, index) => {
        card.addEventListener('click', () => showDogModal(dogs[index]));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showDogModal(dogs[index]);
            }
        });
        
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `view details for ${dog.name}`);
    });
}

/**
 * Create HTML for a single dog card
 * @param {Object} dog - Dog object
 * @returns {string} HTML string for dog card
 */
function createDogCard(dog) {
    const goodWithIcons = [];
    if (dog.good_with_kids) goodWithIcons.push('👶 kids');
    if (dog.good_with_dogs) goodWithIcons.push('🐕 dogs');
    if (dog.good_with_cats) goodWithIcons.push('🐱 cats');
    
    return `
        <div class="dog-card" data-dog-id="${dog.id}">
            <div class="dog-image" style="background-image: url('${dog.image !== 'placeholder' ? dog.image : ''}')">
                ${dog.image === 'placeholder' ? 'photo coming soon' : ''}
            </div>
            <div class="dog-info">
                <h3 class="dog-name">${dog.name}</h3>
                <div class="dog-details">${dog.age} • ${dog.breed} • ${dog.size}</div>
                <div class="dog-details">${dog.weight} • ${dog.gender}</div>
                ${goodWithIcons.length > 0 ? `<div class="dog-details">good with: ${goodWithIcons.join(', ')}</div>` : ''}
                <p class="dog-description">${dog.description}</p>
            </div>
        </div>
    `;
}

/**
 * Initialize filter functionality
 */
function initFilters() {
    const sizeFilter = document.getElementById('sizeFilter');
    const ageFilter = document.getElementById('ageFilter');
    const breedFilter = document.getElementById('breedFilter');
    
    if (!sizeFilter || !ageFilter || !breedFilter) return;
    
    // Add event listeners for filters
    [sizeFilter, ageFilter, breedFilter].forEach(filter => {
        filter.addEventListener('change', window.DogAdoption.debounce(applyFilters, 300));
    });
}

/**
 * Apply filters to dog list
 */
function applyFilters() {
    const sizeFilter = document.getElementById('sizeFilter').value;
    const ageFilter = document.getElementById('ageFilter').value;
    const breedFilter = document.getElementById('breedFilter').value;
    
    filteredDogs = allDogs.filter(dog => {
        const sizeMatch = !sizeFilter || dog.size === sizeFilter;
        const ageMatch = !ageFilter || dog.ageCategory === ageFilter;
        const breedMatch = !breedFilter || dog.breed.includes(breedFilter) || dog.breed === breedFilter;
        
        return sizeMatch && ageMatch && breedMatch;
    });
    
    displayDogs(filteredDogs);
    
    // Announce filter results to screen readers
    const resultCount = filteredDogs.length;
    const message = resultCount === 1 
        ? '1 dog matches your filters' 
        : `${resultCount} dogs match your filters`;
    window.DogAdoption.announceToScreenReader(message);
}

/**
 * Initialize modal functionality
 */
function initModal() {
    const modal = document.getElementById('dogModal');
    const closeBtn = modal?.querySelector('.close');
    
    if (!modal || !closeBtn) return;
    
    // Close modal when clicking X button
    closeBtn.addEventListener('click', closeDogModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeDogModal();
        }
    });
    
    // Close modal with Escape key (handled in main.js)
}

/**
 * Show dog details in modal
 * @param {Object} dog - Dog object to display
 */
function showDogModal(dog) {
    const modal = document.getElementById('dogModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const goodWithList = [];
    if (dog.good_with_kids) goodWithList.push('children');
    if (dog.good_with_dogs) goodWithList.push('other dogs');
    if (dog.good_with_cats) goodWithList.push('cats');
    
    const modalContent = `
        <div class="modal-dog-image" style="background-image: url('${dog.image !== 'placeholder' ? dog.image : ''}'); height: 300px; background-size: cover; background-position: center; border-radius: 8px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; color: #999; background-color: #f0f0f0;">
            ${dog.image === 'placeholder' ? 'photo coming soon' : ''}
        </div>
        <h2 class="modal-dog-name" style="font-size: 32px; font-weight: 300; color: #333; margin-bottom: 20px; text-transform: lowercase;">${dog.name}</h2>
        
        <div class="modal-dog-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div>
                <strong style="color: #333;">Age:</strong> ${dog.age}<br>
                <strong style="color: #333;">Breed:</strong> ${dog.breed}<br>
                <strong style="color: #333;">Size:</strong> ${dog.size}
            </div>
            <div>
                <strong style="color: #333;">Weight:</strong> ${dog.weight}<br>
                <strong style="color: #333;">Gender:</strong> ${dog.gender}<br>
                <strong style="color: #333;">Energy:</strong> ${dog.energy_level}
            </div>
        </div>
        
        <div style="margin-bottom: 30px;">
            <h3 style="font-size: 20px; font-weight: 400; color: #333; margin-bottom: 15px; text-transform: lowercase;">about ${dog.name}</h3>
            <p style="font-size: 16px; color: #666; line-height: 1.6;">${dog.fullDescription}</p>
        </div>
        
        ${goodWithList.length > 0 ? `
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 18px; font-weight: 400; color: #333; margin-bottom: 10px; text-transform: lowercase;">good with:</h3>
                <p style="color: #666;">${goodWithList.join(', ')}</p>
            </div>
        ` : ''}
        
        ${dog.special_needs !== 'none' ? `
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 18px; font-weight: 400; color: #333; margin-bottom: 10px; text-transform: lowercase;">special considerations:</h3>
                <p style="color: #666;">${dog.special_needs}</p>
            </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 40px;">
            <a href="application.html" class="apply-button" style="display: inline-flex; align-items: center; justify-content: center; padding: 20px 40px; background-color: #333; color: white; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: 400; text-transform: lowercase; letter-spacing: 0.5px; transition: all 0.3s ease; gap: 15px; min-width: 200px;">
                <span class="button-text">apply for ${dog.name}</span>
                <span class="button-arrow">→</span>
            </a>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modal.style.display = 'block';
    
    // Focus management for accessibility
    const firstFocusable = modal.querySelector('.close');
    if (firstFocusable) {
        firstFocusable.focus();
    }
    
    // Announce to screen readers
    window.DogAdoption.announceToScreenReader(`Viewing details for ${dog.name}`);
}

/**
 * Close dog modal
 */
function closeDogModal() {
    const modal = document.getElementById('dogModal');
    if (modal) {
        modal.style.display = 'none';
        window.DogAdoption.announceToScreenReader('Dog details closed');
    }
}

/**
 * Search dogs by name or description
 * @param {string} searchTerm - Search term
 */
function searchDogs(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    filteredDogs = allDogs.filter(dog => {
        return dog.name.toLowerCase().includes(term) ||
               dog.description.toLowerCase().includes(term) ||
               dog.breed.toLowerCase().includes(term);
    });
    
    displayDogs(filteredDogs);
    
    const resultCount = filteredDogs.length;
    const message = `Search results: ${resultCount} dog${resultCount !== 1 ? 's' : ''} found`;
    window.DogAdoption.announceToScreenReader(message);
}

// Make functions available globally if needed
window.DogAdoption.searchDogs = searchDogs; 