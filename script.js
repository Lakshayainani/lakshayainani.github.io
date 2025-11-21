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
    'fa-laptop-code', 'fa-network-wired', 'fa-memory', 'fa-vial',
    'fa-flask', 'fa-check-double', 'fa-mobile', 'fa-magic', 'fa-rocket',
    'fa-star', 'fa-heart', 'fa-bolt', 'fa-fire', 'fa-cloud'
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

    const projectsNav = document.querySelector('.nav-link[href="#projects"]');
    if (projectsNav) {
        projectsNav.style.setProperty('--nav-bg-color', 'var(--skill-color-6)');
    }

    // Assign unique colors to experience cards
    const shuffledColorsForExp = shuffleArray([...skillColors]);
    document.querySelectorAll('.experience-item').forEach((card, index) => {
        const uniqueColor = shuffledColorsForExp[index % shuffledColorsForExp.length];
        card.style.setProperty('--exp-bg-color', uniqueColor);
    });

    // Assign unique colors to project cards
    const shuffledColorsForProjects = shuffleArray([...skillColors]);
    document.querySelectorAll('.project-card').forEach((card, index) => {
        const uniqueColor = shuffledColorsForProjects[index % shuffledColorsForProjects.length];
        card.style.setProperty('--project-bg-color', uniqueColor);
    });
}

// Create floating icons
function createFloatingIcons() {
    const floatingIcons = document.querySelector('.floating-icons');

    // Create 60 floating icons with random properties
    for (let i = 0; i < 60; i++) {
        const icon = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
        const size = Math.random() * 2 + 1.2;
        const opacity = Math.random() * 0.15 + 0.08;

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

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger once on load

// Typing Effect
const text = "Senior Software Development Engineer in Test";
const typingText = document.querySelector(".typing-text");
let index = 0;

function type() {
    if (index < text.length) {
        typingText.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(type, 100);
    }
}

// Start typing effect after a small delay
setTimeout(() => {
    typingText.textContent = "";
    type();
}, 1000);

// Mouse Trail Effect
let lastMouseX = 0;
let lastMouseY = 0;
let throttleTimer = false;

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
    particle.style.backgroundColor = randomColor;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

document.addEventListener('mousemove', (e) => {
    // Throttle particle creation for performance
    if (!throttleTimer) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only create particles if mouse moved enough
        if (distance > 10) {
            createMouseParticle(e.clientX, e.clientY);
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }

        throttleTimer = true;
        setTimeout(() => {
            throttleTimer = false;
        }, 50);
    }
});

// ==================== EASTER EGGS ====================

// Randomize bug positions on page load
function randomizeBugPositions() {
    document.querySelectorAll('.hidden-bug').forEach(bug => {
        // Random position within safe bounds (10-90% to avoid edges)
        const top = Math.random() * 80 + 10; // 10-90%
        const left = Math.random() * 80 + 10; // 10-90%

        bug.style.top = `${top}%`;
        bug.style.left = `${left}%`;
    });
}

// Call on page load
randomizeBugPositions();

// Console Easter Egg
console.log('%c🐛 Bug Hunter Mode Activated! 🐛', 'font-size: 20px; font-weight: bold; color: #98E2C6;');
console.log('%cWelcome, fellow tester! 👋', 'font-size: 14px; color: #FFB5E8;');
console.log('%cThere are 5 hidden bugs on this page. Can you find them all?', 'font-size: 12px; color: #B5D8FF;');
console.log('%cHint: They might be wiggling... 👀', 'font-size: 12px; color: #FFE5B4;');
console.log('%c\nAlso try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #E2B4FF;');
console.log('%c\nPsst... try clicking the title 10 times 😉', 'font-size: 10px; color: #FFB5B5; font-style: italic;');

// Easter Egg: Secret Click Counter on Title
let titleClicks = 0;
const title = document.querySelector('h1');
title.style.cursor = 'pointer';
title.addEventListener('click', function () {
    titleClicks++;

    if (titleClicks === 10) {
        const overlay = document.createElement('div');
        overlay.className = 'celebration-overlay';
        overlay.innerHTML = `
            <div class="celebration-content">
                <h2>🎯 Achievement Unlocked! 🎯</h2>
                <p>You found the secret click counter!</p>
                <p style="font-size: 3rem; margin: 1rem 0;">🖱️✨🖱️</p>
                <p>"Persistence is the key to quality testing!"</p>
                <button onclick="this.parentElement.parentElement.remove()">Nice!</button>
            </div>
        `;
        document.body.appendChild(overlay);
        titleClicks = 0; // Reset
    }
});

// Easter Egg: Time-based greeting in console
const hour = new Date().getHours();
let greeting = '';
if (hour < 6) greeting = '🌙 Burning the midnight oil? Respect!';
else if (hour < 12) greeting = '☀️ Good morning, early bird!';
else if (hour < 18) greeting = '🌤️ Good afternoon!';
else if (hour < 22) greeting = '🌆 Good evening!';
else greeting = '🌃 Night owl detected!';
console.log(`%c${greeting}`, 'font-size: 14px; color: #98E2C6;');

// Bug Hunter Easter Egg
let bugsFound = new Set();
const totalBugs = 5;
const bugCounter = document.getElementById('bugCounter');
const bugCount = document.getElementById('bugCount');

// Show bug counter when first bug is found
document.querySelectorAll('.hidden-bug').forEach(bug => {
    bug.addEventListener('click', function () {
        const bugId = this.getAttribute('data-bug');

        if (!bugsFound.has(bugId)) {
            bugsFound.add(bugId);
            bugCounter.style.display = 'flex';
            bugCount.textContent = bugsFound.size;

            // Squash animation
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'scale(0) rotate(180deg)';
            this.style.opacity = '0';

            setTimeout(() => {
                this.remove();
            }, 300);

            // Check if all bugs found
            if (bugsFound.size === totalBugs) {
                setTimeout(showCelebration, 500);
            }
        }
    });
});

function showCelebration() {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>🎉 All Bugs Squashed! 🎉</h2>
            <p>Congratulations! You found all ${totalBugs} bugs!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">🐛✨🐛✨🐛</p>
            <p>You have the eye of a true QA professional!</p>
            <button onclick="this.parentElement.parentElement.remove()">Awesome!</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // Confetti effect
    createConfetti();
}

function createConfetti() {
    const colors = ['#FFB5B5', '#FFE5B4', '#98E2C6', '#B5B9FF', '#FFB5E8'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.zIndex = '100000';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);

            let pos = -10;
            const fall = setInterval(() => {
                pos += 5;
                confetti.style.top = pos + 'px';
                confetti.style.transform = `rotate(${pos * 2}deg)`;

                if (pos > window.innerHeight) {
                    clearInterval(fall);
                    confetti.remove();
                }
            }, 20);
        }, i * 30);
    }
}

// Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === konamiCode[konamiIndex] || e.key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            activateKonamiMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiMode() {
    // Rainbow mode!
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>🌈 KONAMI CODE ACTIVATED! 🌈</h2>
            <p>You've unlocked RAINBOW MODE!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">✨🎮✨</p>
            <p>The ultimate QA power-up!</p>
            <button onclick="this.parentElement.parentElement.remove(); enableRainbowMode()">Let's Go!</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function enableRainbowMode() {
    // Make all sections cycle through rainbow colors
    const sections = document.querySelectorAll('section');
    let hue = 0;

    setInterval(() => {
        sections.forEach((section, index) => {
            section.style.borderColor = `hsl(${(hue + index * 30) % 360}, 70%, 60%)`;
        });
        hue = (hue + 2) % 360;
    }, 50);

    console.log('%c🌈 RAINBOW MODE ENABLED! 🌈', 'font-size: 20px; font-weight: bold; background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; color: transparent;');
}

// Easter Egg: Double-click any skill for a surprise
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('dblclick', function () {
        const skillName = this.textContent.trim();
        const messages = [
            `${skillName}? You're a pro! 🌟`,
            `${skillName} skills on point! 💯`,
            `Master of ${skillName}! 🎯`,
            `${skillName} expert detected! 🚀`,
            `${skillName} = ❤️`
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        // Create floating message
        const msg = document.createElement('div');
        msg.textContent = randomMessage;
        msg.style.position = 'fixed';
        msg.style.left = '50%';
        msg.style.top = '50%';
        msg.style.transform = 'translate(-50%, -50%)';
        msg.style.background = 'var(--skill-color-1)';
        msg.style.color = '#2A2A2A';
        msg.style.padding = '1rem 2rem';
        msg.style.border = 'var(--border-size) solid var(--secondary-color)';
        msg.style.fontSize = '1.5rem';
        msg.style.fontWeight = 'bold';
        msg.style.zIndex = '100000';
        msg.style.animation = 'fadeIn 0.3s ease';
        document.body.appendChild(msg);

        setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 0.5s';
            setTimeout(() => msg.remove(), 500);
        }, 2000);
    });
});

// Easter Egg: Type "test" anywhere on the page
let typedKeys = [];
const secretCode = ['t', 'e', 's', 't'];

document.addEventListener('keypress', (e) => {
    typedKeys.push(e.key.toLowerCase());
    typedKeys = typedKeys.slice(-4); // Keep only last 4 keys

    if (typedKeys.join('') === secretCode.join('')) {
        activateTestMode();
        typedKeys = [];
    }
});

function activateTestMode() {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>🧪 TEST MODE ACTIVATED! 🧪</h2>
            <p>All tests are now passing!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">✅✅✅</p>
            <p>100% Code Coverage Achieved!</p>
            <button onclick="this.parentElement.parentElement.remove()">Ship it! 🚀</button>
        </div>
    `;
    document.body.appendChild(overlay);
    console.log('%c✅ TEST MODE: All tests passing!', 'font-size: 16px; color: #B4E4B4; font-weight: bold;');
}

// Easter Egg: Hidden message in page source
// Check the HTML source code for a special comment! 😉

