const backToTopButton = document.getElementById('backToTop');

// Show or hide the button when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
        backToTopButton.classList.remove('active');
    }
});

// Toggling active class
backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.classList.add('active');
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.classList.remove('active');
});

// Scroll smoothly on click
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});