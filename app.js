// DOM Elements
const rideForm = document.querySelector('form');
const pickupInput = document.querySelector('input[placeholder="Pickup location"]');
const dropoffInput = document.querySelector('input[placeholder="Dropoff location"]');

// Mock data for ride estimates
const mockRideEstimates = {
    'UberX': { price: '25-30', time: '5' },
    'UberXL': { price: '35-40', time: '8' },
    'UberBLACK': { price: '45-50', time: '10' }
};

// Handle ride form submission
rideForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pickup = pickupInput.value.trim();
    const dropoff = dropoffInput.value.trim();
    
    if (!pickup || !dropoff) {
        alert('Please enter both pickup and dropoff locations');
        return;
    }

    // Simulate loading state
    const submitButton = rideForm.querySelector('button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Loading...';
    submitButton.disabled = true;

    // Simulate API call with setTimeout
    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show mock ride options
        showRideOptions(pickup, dropoff);
    }, 1500);
});

// Function to display ride options
function showRideOptions(pickup, dropoff) {
    const rideOptionsHTML = Object.entries(mockRideEstimates)
        .map(([type, data]) => `
            <div class="bg-white p-4 rounded-lg shadow-sm mb-2 flex justify-between items-center">
                <div>
                    <h3 class="font-semibold">${type}</h3>
                    <p class="text-sm text-gray-600">${data.time} mins away</p>
                </div>
                <div class="text-right">
                    <p class="font-semibold">$${data.price}</p>
                </div>
            </div>
        `).join('');

    // Create modal for ride options
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Available rides</h2>
                <button class="text-gray-500 hover:text-black" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-2">
                ${rideOptionsHTML}
            </div>
            <button class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mt-4">
                Choose ${Object.keys(mockRideEstimates)[0]}
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

// Handle authentication buttons
function handleAuth(type) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">${type === 'login' ? 'Log in' : 'Sign up'}</h2>
                <button class="text-gray-500 hover:text-black" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" required class="mt-1 w-full p-3 border rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" required class="mt-1 w-full p-3 border rounded-lg">
                </div>
                <button type="submit" class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                    ${type === 'login' ? 'Log in' : 'Sign up'}
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
}

// Add click handlers for auth buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(button => {
        const buttonText = button.textContent.trim().toLowerCase();
        if (buttonText === 'log in' || buttonText === 'log in to your account') {
            button.addEventListener('click', () => handleAuth('login'));
        } else if (buttonText === 'sign up') {
            button.addEventListener('click', () => handleAuth('signup'));
        }
    });
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href !== '#') {
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
