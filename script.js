// ==========================================
// 1. INITIALIZE AOS (ANIMATE ON SCROLL)
// ==========================================
AOS.init({
    duration: 1000, // Animation duration in ms
    once: true,     // Only animate once
    offset: 100     // Trigger animation 100px before element is visible
});


// ==========================================
// 2. SLIDESHOW LOGIC
// ==========================================
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dotsContainer = document.querySelector(".dots-container");

// Create dots dynamically based on number of slides
for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("onclick", `showSlide(${i + 1})`);
    dotsContainer.appendChild(dot);
}

const dots = document.getElementsByClassName("dot");

// Function to show a specific slide
function showSlide(n) {
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active-dot");
    }
    
    // Show current slide and activate dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active-dot");
}

// Next/Prev functions
function changeSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
}

// Auto-play slideshow (changes every 5 seconds)
let autoSlide = setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
}, 5000);

// Pause auto-play when user hovers over the slideshow
const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.onmouseover = () => clearInterval(autoSlide);
slideshowContainer.onmouseout = () => {
    autoSlide = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000);
};

// Start the slideshow
showSlide(slideIndex = 1);


// ==========================================
// 3. SCROLL TO FORM LOGIC
// ==========================================
function scrollToForm() {
    const formSection = document.getElementById('about-form-section');
    
    // Smooth scroll to the section
    formSection.scrollIntoView({ 
        behavior: 'smooth' 
    });

    // Optional: Add a temporary highlight effect to the form
    setTimeout(() => {
        const form = document.getElementById('serviceForm');
        form.style.boxShadow = "0 0 30px rgba(108, 99, 255, 0.6)";
        
        // Remove highlight after 1.5 seconds
        setTimeout(() => {
            form.style.boxShadow = "var(--shadow)"; // Revert to default shadow
        }, 1500);
    }, 800); // Wait for scroll to finish
}


// ==========================================
// 4. FORM LOGIC (COPIES SELECTION)
// ==========================================
function toggleCustomCopies() {
    const select = document.getElementById('copiesSelect');
    const customInput = document.getElementById('custom-copies-input');
    
    if (select.value === 'custom') {
        customInput.style.display = 'block';
        customInput.required = true;
    } else {
        customInput.style.display = 'none';
        customInput.required = false;
    }
}

// Optional: Form submission alert (prevents actual page reload for demo)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We received your request. We will contact you shortly.');
            form.reset(); // Clear form fields
            toggleCustomCopies(); // Hide custom input if shown
        });
    }
});
