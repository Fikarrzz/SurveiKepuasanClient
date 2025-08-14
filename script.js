// Current step tracking
let currentStep = 1;
const totalSteps = 4;

// DOM Elements
const progress = document.getElementById('progress');
const prevButtons = document.querySelectorAll('.btn-prev');
const nextButtons = document.querySelectorAll('.btn-next');
const formSteps = document.querySelectorAll('.form-step');
const circles = document.querySelectorAll('.circle');
const surveyForm = document.getElementById('survey-form');
const thankYou = document.getElementById('thank-you');

// Star rating functionality
document.querySelectorAll('.star-rating i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        const starContainer = this.parentElement;
        const hiddenInput = starContainer.nextElementSibling;
        
        // Set active class and color for stars
        starContainer.querySelectorAll('i').forEach((s, index) => {
            if (index < rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        // Update hidden input value
        hiddenInput.value = rating;
    });
});

// Next step function
function nextStep(step) {
    // Validate current step before proceeding
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    
    // Update summary if going to step 4
    if (step === 3) {
        updateSummary();
    }
    
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Update current step
    currentStep++;
    
    // Show next step
    document.getElementById(`step-${currentStep}`).classList.add('active');
    
    // Update progress bar
    updateProgress();
}

// Previous step function
function prevStep(step) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Update current step
    currentStep--;
    
    // Show previous step
    document.getElementById(`step-${currentStep}`).classList.add('active');
    
    // Update progress bar
    updateProgress();
}

// Update progress bar and circles
function updateProgress() {
    // Update progress bar width
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update circle states
    circles.forEach((circle, index) => {
        if (index < currentStep) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });
}

// Form validation functions
function validateStep1() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name) {
        alert('Silakan masukkan nama lengkap Anda');
        return false;
    }
    
    if (!email) {
        alert('Silakan masukkan alamat email Anda');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        alert('Silakan masukkan alamat email yang valid');
        return false;
    }
    
    return true;
}

function validateStep2() {
    const serviceRating = document.getElementById('service-rating').value;
    const responseRating = document.getElementById('response-rating').value;
    const processRating = document.getElementById('process-rating').value;
    
    if (serviceRating === '0' || responseRating === '0' || processRating === '0') {
        alert('Silakan beri rating untuk semua aspek pelayanan');
        return false;
    }
    
    return true;
}

function validateStep3() {
    // No validation needed for step 3 (comments are optional)
    return true;
}

// Update summary page
function updateSummary() {
    document.getElementById('summary-name').textContent = document.getElementById('name').value;
    document.getElementById('summary-email').textContent = document.getElementById('email').value;
    document.getElementById('summary-phone').textContent = document.getElementById('phone').value || '-';
    
    // Convert ratings to stars
    document.getElementById('summary-service').textContent = '★'.repeat(document.getElementById('service-rating').value) + '☆'.repeat(5 - document.getElementById('service-rating').value);
    document.getElementById('summary-response').textContent = '★'.repeat(document.getElementById('response-rating').value) + '☆'.repeat(5 - document.getElementById('response-rating').value);
    document.getElementById('summary-process').textContent = '★'.repeat(document.getElementById('process-rating').value) + '☆'.repeat(5 - document.getElementById('process-rating').value);
}

// Form submission
surveyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate consent checkbox
    if (!document.getElementById('consent').checked) {
        alert('Anda harus menyetujui penggunaan data untuk melanjutkan');
        return;
    }
    
    // In a real application, you would send the data to a server here
    // For this demo, we'll just show the thank you message
    
    // Hide form and show thank you message
    surveyForm.style.display = 'none';
    thankYou.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
});

// Restart survey
function restartSurvey() {
    // Reset form
    surveyForm.reset();
    
    // Reset star ratings
    document.querySelectorAll('.star-rating i').forEach(star => {
        star.classList.remove('active');
    });
    document.querySelectorAll('input[type="hidden"]').forEach(input => {
        input.value = '0';
    });
    
    // Reset steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step-1').classList.add('active');
    
    // Reset progress
    currentStep = 1;
    updateProgress();
    
    // Show form and hide thank you message
    surveyForm.style.display = 'block';
    thankYou.style.display = 'none';
}