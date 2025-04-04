// Define the color palette for skills
const skillColors = [
    '#FFB5B5', // Pastel Red
    '#FFE5B4', // Pastel Orange
    '#98E2C6', // Pastel Turquoise
    '#B5B9FF', // Pastel Purple
    '#B4E4B4', // Pastel Green
    '#FFB5E8', // Pastel Pink
    '#B5D8FF', // Pastel Blue
    '#E2B4FF', // Pastel Violet
    '#FFD1A1', // Pastel Peach
    '#C1FFC1', // Light Mint
    '#D4A5FF', // Light Purple
    '#A5D6FF', // Light Sky Blue
    '#FFC8C8', // Light Coral
    '#E6FFE6', // Light Honeydew
    '#FFE1FF', // Light Pink
    '#B5E6B5', // Mint Green
    '#FFB6C1', // Light Pink
    '#87CEEB', // Sky Blue
    '#DDA0DD', // Plum
    '#98FB98'  // Pale Green
];

// Define icons for floating background
const icons = [
    'fa-code', 'fa-bug', 'fa-cogs', 'fa-robot', 'fa-microchip',
    'fa-server', 'fa-database', 'fa-terminal', 'fa-code-branch',
    'fa-laptop-code', 'fa-network-wired', 'fa-memory', 'fa-microchip',
    'fa-code-branch', 'fa-terminal', 'fa-server', 'fa-database'
];

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to assign random colors to elements
function assignRandomColors() {
    // Get all elements that need colors
    const skills = document.querySelectorAll('.skill');
    const socialLinks = document.querySelectorAll('.social-links a');

    // Calculate total number of elements needing colors
    const totalElements = skills.length + socialLinks.length;

    // Create arrays of repeated colors if needed to cover all elements
    let extendedColors = [];
    while (extendedColors.length < totalElements) {
        extendedColors = extendedColors.concat(skillColors);
    }

    // Shuffle and slice to get exactly the number of colors we need
    const shuffledColors = shuffleArray([...extendedColors]).slice(0, totalElements);
    let colorIndex = 0;

    // Assign unique colors to skills
    skills.forEach(skill => {
        skill.style.setProperty('--skill-bg-color', shuffledColors[colorIndex++]);
    });

    // Assign unique colors to social links
    socialLinks.forEach(link => {
        link.style.setProperty('--link-bg-color', shuffledColors[colorIndex++]);
    });

    // Set fixed colors for nav links matching their section themes
    const aboutNav = document.querySelector('.nav-link[href="#about"]');
    const skillsNav = document.querySelector('.nav-link[href="#skills"]');
    const experienceNav = document.querySelector('.nav-link[href="#experience"]');
    const contactNav = document.querySelector('.nav-link[href="#contact"]');

    aboutNav.style.setProperty('--nav-bg-color', 'var(--skill-color-2)');
    skillsNav.style.setProperty('--nav-bg-color', 'var(--skill-color-5)');
    experienceNav.style.setProperty('--nav-bg-color', 'var(--skill-color-4)');
    contactNav.style.setProperty('--nav-bg-color', 'var(--skill-color-3)');

    // Assign unique colors to experience cards
    const shuffledColorsForExp = shuffleArray([...skillColors]);
    document.querySelectorAll('.experience-item').forEach((card, index) => {
        const uniqueColor = shuffledColorsForExp[index % shuffledColorsForExp.length];
        card.style.setProperty('--exp-bg-color', uniqueColor);
    });
}

// Create floating icons
function createFloatingIcons() {
    const floatingIcons = document.querySelector('.floating-icons');

    // Create 50 floating icons with random properties
    for (let i = 0; i < 50; i++) {
        const icon = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
        const size = Math.random() * 1.5 + 1;
        const opacity = Math.random() * 0.1 + 0.05;

        icon.className = `fas ${randomIcon} floating-icon`;
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.fontSize = `${size}rem`;
        icon.style.opacity = opacity;
        icon.style.color = randomColor;
        icon.style.animationDelay = `${Math.random() * 15}s`;
        icon.style.animationDuration = `${Math.random() * 10 + 10}s`;

        floatingIcons.appendChild(icon);
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    assignRandomColors();
    createFloatingIcons();
});

// Add refresh on click functionality only for individual skill items
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', () => {
        // Generate a new random color just for this skill
        const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
        skill.style.setProperty('--skill-bg-color', randomColor);
        skill.style.borderColor = 'var(--secondary-color)';
    });
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = 20;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Handle mobile menu
            if (window.innerWidth <= 768) {
                const navbarLinks = document.querySelector('.navbar-links');
                navbarLinks.classList.remove('active');
            }
        }
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbarLinks = document.querySelector('.navbar-links');

mobileMenuBtn.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});
