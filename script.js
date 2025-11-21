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

    if (aboutNav) aboutNav.style.setProperty('--nav-bg-color', 'var(--skill-color-2)');
    if (skillsNav) skillsNav.style.setProperty('--nav-bg-color', 'var(--skill-color-5)');
    if (experienceNav) experienceNav.style.setProperty('--nav-bg-color', 'var(--skill-color-4)');
    if (contactNav) contactNav.style.setProperty('--nav-bg-color', 'var(--skill-color-3)');

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
    if (!floatingIcons) return; // Exit if element doesn't exist

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

if (mobileMenuBtn && navbarLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
}

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
    if (typingText && index < text.length) {
        typingText.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(type, 100);
    }
}

// Start typing effect after a small delay
if (typingText) {
    setTimeout(() => {
        typingText.textContent = "";
        type();
    }, 1000);
}

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
console.log('%cThere are 21+ easter eggs on this page. Can you find them all?', 'font-size: 12px; color: #B5D8FF;');
console.log('%c\n🐞 Bug Hunt: Find 5 hidden bugs (they wiggle!)', 'font-size: 12px; color: #FFE5B4;');
console.log('%c🎮 Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #E2B4FF;');
console.log('%c🖱️ Click the title 10 times', 'font-size: 12px; color: #FFB5B5;');
console.log('%c⌨️ Type: "test", "debug", "automation", or "coffee"', 'font-size: 12px; color: #98E2C6;');
console.log('%c🎯 Double-click skills, triple-click profile image', 'font-size: 12px; color: #B5B9FF;');
console.log('%c⏰ Hover on LAKSHAYA for 5 seconds', 'font-size: 12px; color: #FFB5E8;');
console.log('%c🎖️ Try Ctrl+Shift+Q or press Q+A together', 'font-size: 12px; color: #FFE5B4;');
console.log('%c🚀 Click fast, escape fast, or just wait...', 'font-size: 12px; color: #B5D8FF;');
console.log('%c\nAnd there are more... keep exploring! 🔍✨', 'font-size: 10px; color: #E2B4FF; font-style: italic;');

// Easter Egg: Secret Click Counter on Title
let titleClicks = 0;
const title = document.querySelector('h1');
if (title) {
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
}

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

// Easter Egg: Secret Key Combination (Ctrl+Shift+Q for QA)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        activateQAMode();
    }
});

function activateQAMode() {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>🎖️ QA MASTER MODE! 🎖️</h2>
            <p>You discovered the secret QA shortcut!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">👨‍💻✅👩‍💻</p>
            <p>"Quality is not an act, it is a habit!" - Aristotle</p>
            <button onclick="this.parentElement.parentElement.remove()">Ship It!</button>
        </div>
    `;
    document.body.appendChild(overlay);
    console.log('%c🎖️ QA MASTER MODE: Ctrl+Shift+Q detected!', 'font-size: 16px; color: #B5B9FF; font-weight: bold;');
}

// Easter Egg: Triple-click on profile image
let profileClickCount = 0;
let profileClickTimer = null;
const profileImage = document.querySelector('.profile-image');

if (profileImage) {
    profileImage.style.cursor = 'pointer';
    profileImage.addEventListener('click', () => {
        profileClickCount++;

        if (profileClickTimer) clearTimeout(profileClickTimer);

        if (profileClickCount === 3) {
            const overlay = document.createElement('div');
            overlay.className = 'celebration-overlay';
            overlay.innerHTML = `
                <div class="celebration-content">
                    <h2>📸 PICTURE PERFECT! 📸</h2>
                    <p>You found the triple-click secret!</p>
                    <p style="font-size: 3rem; margin: 1rem 0;">🖼️✨🖼️</p>
                    <p>"Behind every great tester is a great profile picture!"</p>
                    <button onclick="this.parentElement.parentElement.remove()">Nice!</button>
                </div>
            `;
            document.body.appendChild(overlay);
            profileClickCount = 0;
        } else {
            profileClickTimer = setTimeout(() => {
                profileClickCount = 0;
            }, 1000);
        }
    });
}

// Easter Egg: Hover on navbar brand for 5 seconds
let hoverTimer = null;
const navbarBrand = document.querySelector('.navbar-brand');

if (navbarBrand) {
    navbarBrand.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
            const overlay = document.createElement('div');
            overlay.className = 'celebration-overlay';
            overlay.innerHTML = `
                <div class="celebration-content">
                    <h2>⏰ PATIENCE ACHIEVEMENT! ⏰</h2>
                    <p>You hovered for 5 whole seconds!</p>
                    <p style="font-size: 3rem; margin: 1rem 0;">🖱️⌛🖱️</p>
                    <p>"Good things come to those who wait... and hover!"</p>
                    <button onclick="this.parentElement.parentElement.remove()">Worth it!</button>
                </div>
            `;
            document.body.appendChild(overlay);
            console.log('%c⏰ PATIENCE ACHIEVEMENT UNLOCKED!', 'font-size: 16px; color: #98E2C6; font-weight: bold;');
        }, 5000);
    });

    navbarBrand.addEventListener('mouseleave', () => {
        if (hoverTimer) clearTimeout(hoverTimer);
    });
}

// Easter Egg: Type "debug" anywhere on the page
let debugKeys = [];
const debugCode = ['d', 'e', 'b', 'u', 'g'];

document.addEventListener('keypress', (e) => {
    debugKeys.push(e.key.toLowerCase());
    debugKeys = debugKeys.slice(-5); // Keep only last 5 keys

    if (debugKeys.join('') === debugCode.join('')) {
        activateDebugMode();
        debugKeys = [];
    }
});

function activateDebugMode() {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>🔍 DEBUG MODE ACTIVATED! 🔍</h2>
            <p>You typed the magic word!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">🐞🔧🐞</p>
            <p>"Debugging is like being a detective in a crime movie where you're also the murderer!"</p>
            <button onclick="this.parentElement.parentElement.remove(); showDebugInfo()">Show Debug Info</button>
        </div>
    `;
    document.body.appendChild(overlay);
    console.log('%c🔍 DEBUG MODE ACTIVATED!', 'font-size: 16px; color: #FFE5B4; font-weight: bold;');
}

function showDebugInfo() {
    console.log('%c=== DEBUG INFO ===', 'font-size: 14px; color: #FFE5B4; font-weight: bold;');
    console.log('Screen Size:', window.innerWidth, 'x', window.innerHeight);
    console.log('User Agent:', navigator.userAgent);
    console.log('Page Load Time:', performance.now().toFixed(2), 'ms');
    console.log('Total Skills:', document.querySelectorAll('.skill').length);
    console.log('Total Experience Items:', document.querySelectorAll('.experience-item').length);
    console.log('Bugs Found:', bugsFound.size, '/', totalBugs);
    console.log('%c==================', 'font-size: 14px; color: #FFE5B4; font-weight: bold;');
}

// Easter Egg: Click experience cards 3 times
const experienceCards = document.querySelectorAll('.experience-item');
const cardClickCounts = new Map();

experienceCards.forEach((card, index) => {
    cardClickCounts.set(index, 0);
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
        const currentCount = cardClickCounts.get(index) + 1;
        cardClickCounts.set(index, currentCount);

        if (currentCount === 3) {
            const jobTitle = this.querySelector('h3').textContent;
            const overlay = document.createElement('div');
            overlay.className = 'celebration-overlay';
            overlay.innerHTML = `
                <div class="celebration-content">
                    <h2>💼 JOB APPRECIATION! 💼</h2>
                    <p>You really like the "${jobTitle}" role!</p>
                    <p style="font-size: 3rem; margin: 1rem 0;">👔✨👔</p>
                    <p>"Every job is a learning opportunity!"</p>
                    <button onclick="this.parentElement.parentElement.remove()">Absolutely!</button>
                </div>
            `;
            document.body.appendChild(overlay);
            cardClickCounts.set(index, 0);
        }
    });
});

// Easter Egg: Scroll to bottom 3 times
let scrollToBottomCount = 0;
let wasAtBottom = false;

window.addEventListener('scroll', () => {
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;

    if (isAtBottom && !wasAtBottom) {
        scrollToBottomCount++;

        if (scrollToBottomCount === 3) {
            const overlay = document.createElement('div');
            overlay.className = 'celebration-overlay';
            overlay.innerHTML = `
                <div class="celebration-content">
                    <h2>📜 SCROLL MASTER! 📜</h2>
                    <p>You scrolled to the bottom 3 times!</p>
                    <p style="font-size: 3rem; margin: 1rem 0;">⬇️✨⬇️</p>
                    <p>"Persistence pays off in testing and scrolling!"</p>
                    <button onclick="this.parentElement.parentElement.remove()">I'm thorough!</button>
                </div>
            `;
            document.body.appendChild(overlay);
            scrollToBottomCount = 0;
            console.log('%c📜 SCROLL MASTER ACHIEVEMENT!', 'font-size: 16px; color: #B5D8FF; font-weight: bold;');
        }
    }

    wasAtBottom = isAtBottom;
});

// Easter Egg: Right-click prevention with fun message
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    const messages = [
        "🔍 Looking for bugs? Try clicking the wiggling ones!",
        "🎮 Try the Konami Code instead: ↑↑↓↓←→←→BA",
        "🐛 Right-click detected! But the real bugs are hidden...",
        "🧪 QA Tip: There are many easter eggs on this page!",
        "✨ Try typing 'test' or 'debug' instead!",
        "🎯 Click the title 10 times for a surprise!"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const msg = document.createElement('div');
    msg.textContent = randomMessage;
    msg.style.position = 'fixed';
    msg.style.left = e.clientX + 'px';
    msg.style.top = e.clientY + 'px';
    msg.style.background = 'var(--skill-color-1)';
    msg.style.color = '#2A2A2A';
    msg.style.padding = '0.5rem 1rem';
    msg.style.border = 'var(--border-size) solid var(--secondary-color)';
    msg.style.fontSize = '0.9rem';
    msg.style.fontWeight = 'bold';
    msg.style.zIndex = '100000';
    msg.style.pointerEvents = 'none';
    msg.style.borderRadius = '4px';
    msg.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transition = 'opacity 0.5s';
        setTimeout(() => msg.remove(), 500);
    }, 2000);
});

// Easter Egg: Press Q and A keys together (Quality Assurance!)
let qPressed = false;
let aPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'q') qPressed = true;
    if (e.key.toLowerCase() === 'a') aPressed = true;

    if (qPressed && aPressed) {
        activateQACombo();
        qPressed = false;
        aPressed = false;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'q') qPressed = false;
    if (e.key.toLowerCase() === 'a') aPressed = false;
});

function activateQACombo() {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>🎯 Q + A COMBO! 🎯</h2>
            <p>Quality Assurance keys activated!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">🔑✨🔑</p>
            <p>"Q + A = Quality Assurance Excellence!"</p>
            <button onclick="this.parentElement.parentElement.remove()">Perfect!</button>
        </div>
    `;
    document.body.appendChild(overlay);
    console.log('%c🎯 Q+A COMBO ACTIVATED!', 'font-size: 16px; color: #98E2C6; font-weight: bold;');
}

// Easter Egg: Click social media icons in order (GitHub, LinkedIn, Email)
let socialClickSequence = [];
const correctSequence = ['github', 'linkedin', 'envelope'];

document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        const icon = this.querySelector('i');
        if (icon) {
            const iconClass = icon.className;
            let iconType = '';

            if (iconClass.includes('github')) iconType = 'github';
            else if (iconClass.includes('linkedin')) iconType = 'linkedin';
            else if (iconClass.includes('envelope')) iconType = 'envelope';

            if (iconType) {
                socialClickSequence.push(iconType);
                socialClickSequence = socialClickSequence.slice(-3);

                if (JSON.stringify(socialClickSequence) === JSON.stringify(correctSequence)) {
                    e.preventDefault();
                    const overlay = document.createElement('div');
                    overlay.className = 'celebration-overlay';
                    overlay.innerHTML = `
                        <div class="celebration-content">
                            <h2>🔗 SOCIAL MASTER! 🔗</h2>
                            <p>You clicked the social icons in the perfect order!</p>
                            <p style="font-size: 3rem; margin: 1rem 0;">📱✨📱</p>
                            <p>"GitHub → LinkedIn → Email = Networking Pro!"</p>
                            <button onclick="this.parentElement.parentElement.remove()">Connected!</button>
                        </div>
                    `;
                    document.body.appendChild(overlay);
                    socialClickSequence = [];
                    console.log('%c🔗 SOCIAL SEQUENCE UNLOCKED!', 'font-size: 16px; color: #B5B9FF; font-weight: bold;');
                }
            }
        }
    });
});

// Easter Egg: Type "automation" anywhere
let automationKeys = [];
const automationCode = ['a', 'u', 't', 'o', 'm', 'a', 't', 'i', 'o', 'n'];

document.addEventListener('keypress', (e) => {
    automationKeys.push(e.key.toLowerCase());
    automationKeys = automationKeys.slice(-10);

    if (automationKeys.join('') === automationCode.join('')) {
        activateAutomationMode();
        automationKeys = [];
    }
});

function activateAutomationMode() {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>🤖 AUTOMATION ACTIVATED! 🤖</h2>
            <p>You typed the magic word!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">⚙️✨⚙️</p>
            <p>"Automate everything, test twice, deploy once!"</p>
            <button onclick="this.parentElement.parentElement.remove()">Automate!</button>
        </div>
    `;
    document.body.appendChild(overlay);
    console.log('%c🤖 AUTOMATION MODE ACTIVATED!', 'font-size: 16px; color: #FFE5B4; font-weight: bold;');
}

// Easter Egg: Press Escape 3 times quickly
let escapeCount = 0;
let escapeTimer = null;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        escapeCount++;

        if (escapeTimer) clearTimeout(escapeTimer);

        if (escapeCount === 3) {
            const overlay = document.createElement('div');
            overlay.className = 'celebration-overlay';
            overlay.innerHTML = `
                <div class="celebration-content">
                    <h2>🚪 ESCAPE ARTIST! 🚪</h2>
                    <p>You pressed Escape 3 times!</p>
                    <p style="font-size: 3rem; margin: 1rem 0;">🏃‍♂️✨🏃‍♀️</p>
                    <p>"There's no escape from quality testing!"</p>
                    <button onclick="this.parentElement.parentElement.remove()">Got it!</button>
                </div>
            `;
            document.body.appendChild(overlay);
            escapeCount = 0;
            console.log('%c🚪 ESCAPE ARTIST ACHIEVEMENT!', 'font-size: 16px; color: #FFB5E8; font-weight: bold;');
        } else {
            escapeTimer = setTimeout(() => {
                escapeCount = 0;
            }, 1000);
        }
    }
});

// Easter Egg: Click 5 skills rapidly (within 2 seconds)
let skillClickTimes = [];

document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', function () {
        const now = Date.now();
        skillClickTimes.push(now);
        skillClickTimes = skillClickTimes.filter(time => now - time < 2000);

        if (skillClickTimes.length >= 5) {
            const overlay = document.createElement('div');
            overlay.className = 'celebration-overlay';
            overlay.innerHTML = `
                <div class="celebration-content">
                    <h2>⚡ SPEED CLICKER! ⚡</h2>
                    <p>You clicked 5 skills in 2 seconds!</p>
                    <p style="font-size: 3rem; margin: 1rem 0;">🖱️💨🖱️</p>
                    <p>"Fast fingers make for fast testing!"</p>
                    <button onclick="this.parentElement.parentElement.remove()">Speedy!</button>
                </div>
            `;
            document.body.appendChild(overlay);
            skillClickTimes = [];
            console.log('%c⚡ SPEED CLICKER ACHIEVEMENT!', 'font-size: 16px; color: #B5D8FF; font-weight: bold;');
        }
    });
});

// Easter Egg: Idle detection (no activity for 30 seconds)
let idleTimer = null;
let idleShown = false;

function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    idleShown = false;

    idleTimer = setTimeout(() => {
        if (!idleShown) {
            const overlay = document.createElement('div');
            overlay.className = 'celebration-overlay';
            overlay.innerHTML = `
                <div class="celebration-content">
                    <h2>😴 IDLE TESTER DETECTED! 😴</h2>
                    <p>You've been idle for 30 seconds!</p>
                    <p style="font-size: 3rem; margin: 1rem 0;">💤✨💤</p>
                    <p>"Even testers need coffee breaks!"</p>
                    <button onclick="this.parentElement.parentElement.remove()">I'm back!</button>
                </div>
            `;
            document.body.appendChild(overlay);
            idleShown = true;
            console.log('%c😴 IDLE DETECTION TRIGGERED!', 'font-size: 16px; color: #FFB5B5; font-weight: bold;');
        }
    }, 120000);
}

['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetIdleTimer, true);
});

resetIdleTimer();

// Easter Egg: Spam click anywhere (10 clicks in 1 second)
let clickTimes = [];

document.addEventListener('click', (e) => {
    const now = Date.now();
    clickTimes.push(now);
    clickTimes = clickTimes.filter(time => now - time < 1000);

    if (clickTimes.length >= 10) {
        const overlay = document.createElement('div');
        overlay.className = 'celebration-overlay';
        overlay.innerHTML = `
            <div class="celebration-content">
                <h2>🖱️ CLICK FRENZY! 🖱️</h2>
                <p>10 clicks in 1 second!</p>
                <p style="font-size: 3rem; margin: 1rem 0;">💥✨💥</p>
                <p>"Stress testing the UI, I see!"</p>
                <button onclick="this.parentElement.parentElement.remove()">Whew!</button>
            </div>
        `;
        document.body.appendChild(overlay);
        clickTimes = [];
        console.log('%c🖱️ CLICK FRENZY ACHIEVEMENT!', 'font-size: 16px; color: #E2B4FF; font-weight: bold;');
    }
});

// Easter Egg: Type "coffee" anywhere
let coffeeKeys = [];
const coffeeCode = ['c', 'o', 'f', 'f', 'e', 'e'];

document.addEventListener('keypress', (e) => {
    coffeeKeys.push(e.key.toLowerCase());
    coffeeKeys = coffeeKeys.slice(-6);

    if (coffeeKeys.join('') === coffeeCode.join('')) {
        activateCoffeeMode();
        coffeeKeys = [];
    }
});

function activateCoffeeMode() {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
        <div class="celebration-content">
            <h2>☕ COFFEE BREAK! ☕</h2>
            <p>Every developer's favorite word!</p>
            <p style="font-size: 3rem; margin: 1rem 0;">☕✨☕</p>
            <p>"Code, Test, Coffee, Repeat!"</p>
            <button onclick="this.parentElement.parentElement.remove()">Caffeinated!</button>
        </div>
    `;
    document.body.appendChild(overlay);
    console.log('%c☕ COFFEE MODE ACTIVATED!', 'font-size: 16px; color: #FFD1A1; font-weight: bold;');
}

// ==================== ABOUT YOU SECTION ====================

// Fetch IP and location information
async function fetchUserInfo() {
    try {
        // Using ipwho.is for IP and geolocation data (free, supports HTTPS & CORS)
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();

        if (data.success) {
            // Location data
            document.getElementById('user-ip').textContent = data.ip || 'Unknown';
            document.getElementById('user-country').textContent = `${data.country || 'Unknown'} ${getCountryFlag(data.country_code)}`;
            document.getElementById('user-city').textContent = data.city || 'Unknown';
            document.getElementById('user-region').textContent = data.region || 'Unknown';
            document.getElementById('user-timezone').textContent = data.timezone?.id || 'Unknown';
            document.getElementById('user-postal').textContent = data.postal || 'Unknown';

            // Network & ISP data
            document.getElementById('user-isp').textContent = data.connection?.isp || 'Unknown';
            document.getElementById('user-org').textContent = data.connection?.org || 'Unknown';
            document.getElementById('user-asn').textContent = data.connection?.asn ? `AS${data.connection.asn}` : 'Unknown';
            document.getElementById('user-lat').textContent = data.latitude ? data.latitude.toFixed(4) : 'Unknown';
            document.getElementById('user-lon').textContent = data.longitude ? data.longitude.toFixed(4) : 'Unknown';

            // Get currency from country code
            const currency = getCurrencyFromCountry(data.country_code);
            document.getElementById('user-currency').textContent = currency;
        } else {
            throw new Error(data.message || 'API request failed');
        }
    } catch (error) {
        console.error('Error fetching IP info:', error);
        // Location fallbacks
        document.getElementById('user-ip').textContent = 'Unable to fetch';
        document.getElementById('user-country').textContent = 'Unable to fetch';
        document.getElementById('user-city').textContent = 'Unable to fetch';
        document.getElementById('user-region').textContent = 'Unable to fetch';
        document.getElementById('user-timezone').textContent = 'Unable to fetch';
        document.getElementById('user-postal').textContent = 'Unable to fetch';
        // Network fallbacks
        document.getElementById('user-isp').textContent = 'Unable to fetch';
        document.getElementById('user-org').textContent = 'Unable to fetch';
        document.getElementById('user-asn').textContent = 'Unable to fetch';
        document.getElementById('user-lat').textContent = 'Unable to fetch';
        document.getElementById('user-lon').textContent = 'Unable to fetch';
        document.getElementById('user-currency').textContent = 'Unable to fetch';
    }
}

// Helper function to get country flag emoji
function getCountryFlag(countryCode) {
    if (!countryCode) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

// Helper function to get currency from country code
function getCurrencyFromCountry(countryCode) {
    const currencies = {
        'US': 'USD (US Dollar)', 'GB': 'GBP (British Pound)', 'EU': 'EUR (Euro)',
        'IN': 'INR (Indian Rupee)', 'CA': 'CAD (Canadian Dollar)', 'AU': 'AUD (Australian Dollar)',
        'JP': 'JPY (Japanese Yen)', 'CN': 'CNY (Chinese Yuan)', 'BR': 'BRL (Brazilian Real)',
        'MX': 'MXN (Mexican Peso)', 'SG': 'SGD (Singapore Dollar)', 'HK': 'HKD (Hong Kong Dollar)'
    };
    return currencies[countryCode] || 'Unknown';
}

// Detect browser information
function detectBrowser() {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let engine = 'Unknown';

    // Detect browser
    if (ua.indexOf('Firefox') > -1) {
        browserName = 'Firefox';
        browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Gecko';
    } else if (ua.indexOf('Edg') > -1) {
        browserName = 'Edge';
        browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
    } else if (ua.indexOf('Chrome') > -1) {
        browserName = 'Chrome';
        browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
    } else if (ua.indexOf('Safari') > -1) {
        browserName = 'Safari';
        browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'WebKit';
    } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
        browserName = 'Opera';
        browserVersion = ua.match(/(?:Opera|OPR)\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
    }

    document.getElementById('user-browser').textContent = browserName;
    document.getElementById('user-browser-version').textContent = browserVersion;
    document.getElementById('user-engine').textContent = engine;
    document.getElementById('user-language').textContent = navigator.language || 'Unknown';
    document.getElementById('user-cookies').textContent = navigator.cookieEnabled ? 'Enabled ✅' : 'Disabled ❌';

    // Do Not Track
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    document.getElementById('user-dnt').textContent = dnt === '1' || dnt === 'yes' ? 'Enabled ✅' : 'Disabled ❌';
}

// Detect operating system
function detectOS() {
    const ua = navigator.userAgent;
    let os = 'Unknown';

    if (ua.indexOf('Win') > -1) os = 'Windows';
    else if (ua.indexOf('Mac') > -1) os = 'macOS';
    else if (ua.indexOf('Linux') > -1) os = 'Linux';
    else if (ua.indexOf('Android') > -1) os = 'Android';
    else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';

    document.getElementById('user-os').textContent = os;
    document.getElementById('user-platform').textContent = navigator.platform || 'Unknown';
    document.getElementById('user-screen').textContent = `${screen.width} × ${screen.height}`;
    document.getElementById('user-viewport').textContent = `${window.innerWidth} × ${window.innerHeight}`;
    document.getElementById('user-color').textContent = `${screen.colorDepth}-bit`;
    document.getElementById('user-pixel-ratio').textContent = `${window.devicePixelRatio || 1}x`;
}

// Update session information
function updateSessionInfo() {
    const now = new Date();
    document.getElementById('user-time').textContent = now.toLocaleTimeString();
    document.getElementById('user-date').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Connection info
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const effectiveType = connection.effectiveType || 'Unknown';
        const downlink = connection.downlink ? `${connection.downlink} Mbps` : '';
        document.getElementById('user-connection').textContent = `${effectiveType} ${downlink}`.trim();
    } else {
        document.getElementById('user-connection').textContent = 'Unknown';
    }

    document.getElementById('user-online').textContent = navigator.onLine ? 'Yes ✅' : 'No ❌';
}

// Track time on page
let startTime = Date.now();
function updateTimeOnPage() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    if (minutes > 0) {
        document.getElementById('user-duration').textContent = `${minutes}m ${seconds}s`;
    } else {
        document.getElementById('user-duration').textContent = `${seconds}s`;
    }
}

// Update viewport on resize
window.addEventListener('resize', () => {
    document.getElementById('user-viewport').textContent = `${window.innerWidth} × ${window.innerHeight}`;
});

// Detect device and hardware information
function detectDeviceHardware() {
    const ua = navigator.userAgent;
    let deviceType = 'Desktop';

    // Detect device type
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        deviceType = 'Tablet 📱';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        deviceType = 'Mobile 📱';
    } else {
        deviceType = 'Desktop 💻';
    }
    document.getElementById('user-device-type').textContent = deviceType;

    // CPU cores
    document.getElementById('user-cores').textContent = navigator.hardwareConcurrency || 'Unknown';

    // Memory (in GB)
    const memory = navigator.deviceMemory;
    document.getElementById('user-memory').textContent = memory ? `${memory} GB` : 'Unknown';

    // Touch support
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    document.getElementById('user-touch').textContent = hasTouch ? 'Yes ✅' : 'No ❌';

    // Screen orientation
    const orientation = screen.orientation ? screen.orientation.type :
        (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    document.getElementById('user-orientation').textContent = orientation.charAt(0).toUpperCase() + orientation.slice(1);

    // Battery status (if available)
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const level = Math.round(battery.level * 100);
            const charging = battery.charging ? '⚡' : '🔋';
            document.getElementById('user-battery').textContent = `${level}% ${charging}`;

            // Update battery status when it changes
            battery.addEventListener('levelchange', () => {
                const newLevel = Math.round(battery.level * 100);
                const newCharging = battery.charging ? '⚡' : '🔋';
                document.getElementById('user-battery').textContent = `${newLevel}% ${newCharging}`;
            });
        }).catch(() => {
            document.getElementById('user-battery').textContent = 'Not available';
        });
    } else {
        document.getElementById('user-battery').textContent = 'Not available';
    }
}

// Detect browser capabilities
function detectBrowserCapabilities() {
    // Local Storage
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        document.getElementById('user-localstorage').textContent = 'Available ✅';
    } catch (e) {
        document.getElementById('user-localstorage').textContent = 'Disabled ❌';
    }

    // Session Storage
    try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        document.getElementById('user-sessionstorage').textContent = 'Available ✅';
    } catch (e) {
        document.getElementById('user-sessionstorage').textContent = 'Disabled ❌';
    }

    // WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    document.getElementById('user-webgl').textContent = gl ? 'Supported ✅' : 'Not supported ❌';

    // Canvas
    const canvasSupport = !!canvas.getContext;
    document.getElementById('user-canvas').textContent = canvasSupport ? 'Supported ✅' : 'Not supported ❌';

    // Geolocation API
    const geoSupport = 'geolocation' in navigator;
    document.getElementById('user-geolocation').textContent = geoSupport ? 'Available ✅' : 'Not available ❌';
}

// ==================== VISITOR ANALYTICS ====================

function detectVisitorAnalytics() {
    // Referrer
    const referrer = document.referrer || 'Direct visit (no referrer)';
    const referrerDisplay = referrer === 'Direct visit (no referrer)' ? referrer : new URL(referrer).hostname;
    document.getElementById('user-referrer').textContent = referrerDisplay;

    // Visitor Type (new vs returning)
    let visitorType = 'New Visitor 🆕';
    let sessionId = sessionStorage.getItem('sessionId');

    if (localStorage.getItem('hasVisited')) {
        visitorType = 'Returning Visitor 🔄';
    } else {
        localStorage.setItem('hasVisited', 'true');
    }

    // Generate session ID if not exists
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        sessionStorage.setItem('sessionId', sessionId);
    }

    document.getElementById('user-visitor-type').textContent = visitorType;
    document.getElementById('user-session-id').textContent = sessionId;

    // Page views (session-based)
    let pageViews = parseInt(sessionStorage.getItem('pageViews') || '0') + 1;
    sessionStorage.setItem('pageViews', pageViews.toString());
    document.getElementById('user-page-views').textContent = pageViews;

    // Previous page
    const previousPage = sessionStorage.getItem('currentPage') || 'None (first page)';
    document.getElementById('user-previous-page').textContent = previousPage;
    sessionStorage.setItem('currentPage', window.location.pathname);

    // Entry time
    const entryTime = new Date().toLocaleTimeString();
    document.getElementById('user-entry-time').textContent = entryTime;
}

// ==================== BROWSER FINGERPRINTING ====================

// Generate canvas fingerprint
function generateCanvasFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Draw unique pattern
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('Browser Fingerprint 🔍', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Canvas Test', 4, 17);

        // Get canvas data and hash it
        const dataURL = canvas.toDataURL();
        let hash = 0;
        for (let i = 0; i < dataURL.length; i++) {
            const char = dataURL.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        return Math.abs(hash).toString(16).substr(0, 8);
    } catch (e) {
        return 'unavailable';
    }
}

// Detect available fonts
function detectFonts() {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testFonts = [
        'Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia',
        'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS',
        'Impact', 'Lucida Console', 'Tahoma', 'Helvetica', 'Calibri',
        'Cambria', 'Consolas', 'Monaco', 'Menlo', 'Ubuntu'
    ];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const text = 'mmmmmmmmmmlli';
    const textSize = '72px';

    const baseMeasurements = {};
    baseFonts.forEach(baseFont => {
        ctx.font = textSize + ' ' + baseFont;
        baseMeasurements[baseFont] = ctx.measureText(text).width;
    });

    let detectedFonts = 0;
    testFonts.forEach(font => {
        let detected = false;
        baseFonts.forEach(baseFont => {
            ctx.font = textSize + ' ' + font + ', ' + baseFont;
            const width = ctx.measureText(text).width;
            if (width !== baseMeasurements[baseFont]) {
                detected = true;
            }
        });
        if (detected) detectedFonts++;
    });

    return detectedFonts;
}

// Detect plugins
function detectPlugins() {
    const plugins = navigator.plugins;
    if (!plugins || plugins.length === 0) {
        return 'None detected';
    }
    return `${plugins.length} plugin(s)`;
}

// Generate screen signature
function generateScreenSignature() {
    const sig = [
        screen.width,
        screen.height,
        screen.colorDepth,
        screen.pixelDepth || screen.colorDepth,
        window.devicePixelRatio || 1,
        screen.availWidth,
        screen.availHeight
    ].join('x');

    // Hash the signature
    let hash = 0;
    for (let i = 0; i < sig.length; i++) {
        const char = sig.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return Math.abs(hash).toString(16).substr(0, 6);
}

// Get timezone offset
function getTimezoneOffset() {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const minutes = Math.abs(offset % 60);
    const sign = offset <= 0 ? '+' : '-';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Generate combined fingerprint ID
function generateFingerprintID(canvasHash, fontCount, screenSig, tzOffset) {
    const components = [
        canvasHash,
        fontCount.toString(),
        screenSig,
        tzOffset.replace(/[^0-9]/g, ''),
        navigator.hardwareConcurrency || '0',
        (navigator.deviceMemory || '0').toString()
    ].join('-');

    // Simple hash
    let hash = 0;
    for (let i = 0; i < components.length; i++) {
        const char = components.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return 'fp_' + Math.abs(hash).toString(16);
}

// Main fingerprinting function
function detectBrowserFingerprint() {
    const canvasHash = generateCanvasFingerprint();
    const fontCount = detectFonts();
    const plugins = detectPlugins();
    const screenSig = generateScreenSignature();
    const tzOffset = getTimezoneOffset();
    const fingerprintId = generateFingerprintID(canvasHash, fontCount, screenSig, tzOffset);

    document.getElementById('user-canvas-hash').textContent = canvasHash;
    document.getElementById('user-fonts').textContent = `${fontCount} fonts`;
    document.getElementById('user-plugins').textContent = plugins;
    document.getElementById('user-screen-sig').textContent = screenSig;
    document.getElementById('user-tz-offset').textContent = tzOffset;
    document.getElementById('user-fingerprint-id').textContent = fingerprintId;

    console.log('%c🔍 Browser Fingerprint Generated', 'font-size: 14px; color: #FFB5E8; font-weight: bold;');
    console.log('Fingerprint ID:', fingerprintId);
    console.log('Canvas Hash:', canvasHash);
    console.log('Fonts Detected:', fontCount);
    console.log('Screen Signature:', screenSig);
}

// ==================== ADVANCED TRACKING (INVASIVE) ====================

// Detect media devices (camera/microphone)
async function detectMediaDevices() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        const audioDevices = devices.filter(d => d.kind === 'audioinput');

        const result = `📹 ${videoDevices.length} camera(s), 🎤 ${audioDevices.length} mic(s)`;
        document.getElementById('user-media-devices').textContent = result;

        console.log('%c📹 Media Devices Detected', 'font-size: 12px; color: #ff6b6b; font-weight: bold;');
        console.log('Cameras:', videoDevices.length, 'Microphones:', audioDevices.length);
    } catch (error) {
        document.getElementById('user-media-devices').textContent = 'Permission denied or unavailable';
    }
}

// WebRTC IP leak detection (can reveal real IP even behind VPN)
async function detectWebRTCIP() {
    try {
        const pc = new RTCPeerConnection({ iceServers: [] });
        const ips = new Set();

        pc.createDataChannel('');
        pc.createOffer().then(offer => pc.setLocalDescription(offer));

        pc.onicecandidate = (ice) => {
            if (!ice || !ice.candidate || !ice.candidate.candidate) return;

            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
            const match = ipRegex.exec(ice.candidate.candidate);

            if (match) {
                ips.add(match[1]);
                const ipList = Array.from(ips).join(', ');
                document.getElementById('user-webrtc-ip').textContent = ipList || 'Detecting...';
            }
        };

        // Timeout after 3 seconds
        setTimeout(() => {
            pc.close();
            if (ips.size === 0) {
                document.getElementById('user-webrtc-ip').textContent = 'Blocked or unavailable';
            }
            console.log('%c🌐 WebRTC IPs:', 'font-size: 12px; color: #ff6b6b; font-weight: bold;', Array.from(ips));
        }, 3000);
    } catch (error) {
        document.getElementById('user-webrtc-ip').textContent = 'Not available';
    }
}

// Monitor clipboard (requires user interaction)
function monitorClipboard() {
    let clipboardAttempts = 0;

    document.addEventListener('paste', async (e) => {
        try {
            const text = await navigator.clipboard.readText();
            const preview = text.length > 30 ? text.substring(0, 30) + '...' : text;
            document.getElementById('user-clipboard').textContent = `Detected paste: "${preview}"`;
            console.log('%c📋 Clipboard Access:', 'font-size: 12px; color: #ff6b6b; font-weight: bold;', text);
        } catch (error) {
            // Permission denied
        }
    });

    // Try to read clipboard on focus (may be blocked)
    window.addEventListener('focus', async () => {
        if (clipboardAttempts < 1) {
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    const preview = text.length > 20 ? text.substring(0, 20) + '...' : text;
                    document.getElementById('user-clipboard').textContent = `Contains: "${preview}"`;
                }
            } catch (error) {
                document.getElementById('user-clipboard').textContent = 'Protected (no paste detected yet)';
            }
            clipboardAttempts++;
        }
    });

    // Initial message
    document.getElementById('user-clipboard').textContent = 'Monitoring... (paste something)';
}

// Keystroke pattern analysis (behavioral biometrics)
function analyzeKeystrokePattern() {
    const keyTimings = [];
    let lastKeyTime = 0;

    document.addEventListener('keydown', (e) => {
        const currentTime = Date.now();
        if (lastKeyTime > 0) {
            const interval = currentTime - lastKeyTime;
            keyTimings.push(interval);

            if (keyTimings.length >= 10) {
                const avgSpeed = (keyTimings.reduce((a, b) => a + b, 0) / keyTimings.length).toFixed(0);
                const variance = Math.sqrt(keyTimings.reduce((sum, val) => sum + Math.pow(val - avgSpeed, 2), 0) / keyTimings.length).toFixed(0);

                document.getElementById('user-keystroke').textContent = `Avg: ${avgSpeed}ms, Variance: ${variance}ms`;

                // Keep only last 20 timings
                if (keyTimings.length > 20) keyTimings.shift();
            }
        }
        lastKeyTime = currentTime;
    });

    document.getElementById('user-keystroke').textContent = 'Waiting for typing...';
}

// Mouse behavior profiling
function profileMouseBehavior() {
    const movements = [];
    let clicks = 0;
    let totalDistance = 0;
    let lastX = 0, lastY = 0;

    document.addEventListener('mousemove', (e) => {
        if (lastX > 0 && lastY > 0) {
            const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
            totalDistance += distance;
            movements.push({ x: e.clientX, y: e.clientY, time: Date.now() });

            if (movements.length > 100) movements.shift();

            if (movements.length >= 50) {
                const avgSpeed = (totalDistance / movements.length).toFixed(1);
                document.getElementById('user-mouse-behavior').textContent =
                    `${movements.length} moves, ${clicks} clicks, ${avgSpeed}px/move`;
            }
        }
        lastX = e.clientX;
        lastY = e.clientY;
    });

    document.addEventListener('click', () => {
        clicks++;
        if (movements.length >= 50) {
            const avgSpeed = (totalDistance / movements.length).toFixed(1);
            document.getElementById('user-mouse-behavior').textContent =
                `${movements.length} moves, ${clicks} clicks, ${avgSpeed}px/move`;
        }
    });

    document.getElementById('user-mouse-behavior').textContent = 'Tracking movements...';
}

// Network speed estimation
async function estimateNetworkSpeed() {
    try {
        // Use Network Information API if available
        if ('connection' in navigator || 'mozConnection' in navigator || 'webkitConnection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

            let speedInfo = '';

            // Get connection type
            if (connection.effectiveType) {
                const typeMap = {
                    'slow-2g': '~50 Kbps',
                    '2g': '~250 Kbps',
                    '3g': '~1 Mbps',
                    '4g': '~10+ Mbps'
                };
                speedInfo = `${connection.effectiveType.toUpperCase()} (${typeMap[connection.effectiveType] || 'Unknown'})`;
            }

            // Get downlink speed if available
            if (connection.downlink) {
                speedInfo = `~${connection.downlink} Mbps (${connection.effectiveType || 'Unknown'})`;
            }

            // Get additional info
            if (connection.saveData) {
                speedInfo += ' [Data Saver ON]';
            }

            document.getElementById('user-network-speed').textContent = speedInfo || 'Available';

            console.log('%c🚀 Network Info:', 'font-size: 12px; color: #ff6b6b; font-weight: bold;',
                `Type: ${connection.effectiveType}, Downlink: ${connection.downlink} Mbps`);
        } else {
            // Fallback: Use performance timing to estimate
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;

                if (loadTime > 0) {
                    const estimate = loadTime < 1000 ? 'Fast (< 1s load)' :
                        loadTime < 3000 ? 'Medium (1-3s load)' :
                            'Slow (> 3s load)';
                    document.getElementById('user-network-speed').textContent = estimate;
                } else {
                    document.getElementById('user-network-speed').textContent = 'Not available';
                }
            } else {
                document.getElementById('user-network-speed').textContent = 'Not supported';
            }
        }
    } catch (error) {
        document.getElementById('user-network-speed').textContent = 'Not available';
        console.error('Network speed detection error:', error);
    }
}

// Track idle time (user inactivity)
function trackIdleTime() {
    let idleTime = 0;
    let idleInterval;

    const resetIdleTime = () => {
        idleTime = 0;
        document.getElementById('user-idle-time').textContent = 'Active now';
    };

    const updateIdleTime = () => {
        idleTime++;
        if (idleTime >= 1) {
            document.getElementById('user-idle-time').textContent = `Idle for ${idleTime}s`;
        }
    };

    // Reset idle time on any user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
        document.addEventListener(event, resetIdleTime, true);
    });

    idleInterval = setInterval(updateIdleTime, 1000);
    document.getElementById('user-idle-time').textContent = 'Active now';
}

// Track tab visibility (when user switches tabs)
function trackTabVisibility() {
    let tabSwitches = 0;
    let hiddenTime = 0;
    let visibilityInterval;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            tabSwitches++;
            visibilityInterval = setInterval(() => {
                hiddenTime++;
                document.getElementById('user-tab-visibility').textContent =
                    `Hidden (${hiddenTime}s) - ${tabSwitches} switches`;
            }, 1000);
        } else {
            clearInterval(visibilityInterval);
            hiddenTime = 0;
            document.getElementById('user-tab-visibility').textContent =
                `Visible - ${tabSwitches} switches`;
        }
    });

    document.getElementById('user-tab-visibility').textContent = 'Visible - 0 switches';
}

// Track scroll depth
function trackScrollDepth() {
    let maxScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercent = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;

        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
        }

        document.getElementById('user-scroll-depth').textContent =
            `${scrollPercent}% (max: ${maxScroll}%)`;
    });

    document.getElementById('user-scroll-depth').textContent = '0% (max: 0%)';
}

// Monitor copy/cut events
function monitorCopyEvents() {
    let copyCount = 0;
    let cutCount = 0;

    document.addEventListener('copy', () => {
        copyCount++;
        document.getElementById('user-copy-events').textContent =
            `${copyCount} copies, ${cutCount} cuts`;
    });

    document.addEventListener('cut', () => {
        cutCount++;
        document.getElementById('user-copy-events').textContent =
            `${copyCount} copies, ${cutCount} cuts`;
    });

    document.getElementById('user-copy-events').textContent = '0 copies, 0 cuts';
}

// Check notification permission status
function checkNotificationPermission() {
    if ('Notification' in window) {
        const permission = Notification.permission;
        const statusMap = {
            'granted': '✅ Allowed',
            'denied': '❌ Blocked',
            'default': '⚠️ Not asked'
        };
        document.getElementById('user-notification-perm').textContent = statusMap[permission] || permission;
    } else {
        document.getElementById('user-notification-perm').textContent = 'Not supported';
    }
}

// Detect GPU renderer (WebGL)
function detectGPU() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                document.getElementById('user-gpu').textContent = `${vendor} - ${renderer}`;
            } else {
                const renderer = gl.getParameter(gl.RENDERER);
                document.getElementById('user-gpu').textContent = renderer || 'WebGL available';
            }
        } else {
            document.getElementById('user-gpu').textContent = 'WebGL not available';
        }
    } catch (error) {
        document.getElementById('user-gpu').textContent = 'Unable to detect';
    }
}

// Detect speech synthesis voices (fingerprinting)
function detectSpeechVoices() {
    if ('speechSynthesis' in window) {
        const getVoices = () => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                const voiceCount = voices.length;
                const languages = [...new Set(voices.map(v => v.lang))].length;
                document.getElementById('user-speech-voices').textContent =
                    `${voiceCount} voices, ${languages} languages`;
            } else {
                document.getElementById('user-speech-voices').textContent = 'Loading...';
            }
        };

        getVoices();
        speechSynthesis.onvoiceschanged = getVoices;
    } else {
        document.getElementById('user-speech-voices').textContent = 'Not supported';
    }
}

// Detect connected gamepads
function detectGamepads() {
    const updateGamepads = () => {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        const connected = Array.from(gamepads).filter(g => g !== null);

        if (connected.length > 0) {
            const names = connected.map(g => g.id.substring(0, 20)).join(', ');
            document.getElementById('user-gamepads').textContent =
                `${connected.length} connected: ${names}...`;
        } else {
            document.getElementById('user-gamepads').textContent = 'None detected';
        }
    };

    if ('getGamepads' in navigator) {
        updateGamepads();
        window.addEventListener('gamepadconnected', updateGamepads);
        window.addEventListener('gamepaddisconnected', updateGamepads);

        // Poll every 2 seconds
        setInterval(updateGamepads, 2000);
    } else {
        document.getElementById('user-gamepads').textContent = 'Not supported';
    }
}

// Initialize About You section
function initializeAboutYou() {
    // Check if About You section exists on this page
    const aboutYouSection = document.getElementById('about-you');

    if (aboutYouSection) {
        console.log('🔍 Initializing About You section...');

        // Run instant functions first (no API calls needed)
        detectBrowser();
        detectOS();
        detectDeviceHardware();
        detectBrowserCapabilities();
        detectVisitorAnalytics();
        detectBrowserFingerprint();
        updateSessionInfo();

        // Then fetch API data (slower)
        fetchUserInfo();

        // Advanced tracking (invasive techniques)
        detectMediaDevices();
        detectWebRTCIP();
        monitorClipboard();
        analyzeKeystrokePattern();
        profileMouseBehavior();
        estimateNetworkSpeed();

        // More invasive tracking
        trackIdleTime();
        trackTabVisibility();
        trackScrollDepth();
        monitorCopyEvents();
        checkNotificationPermission();
        detectGPU();
        detectSpeechVoices();
        detectGamepads();

        // Update time every second
        setInterval(updateTimeOnPage, 1000);

        // Update session info every 5 seconds
        setInterval(updateSessionInfo, 5000);

        // Apply random border colors to info cards (except the advanced tracking one which is red)
        const infoCards = document.querySelectorAll('.info-card:not(.full-width-card)');
        const colors = [
            'var(--skill-color-1)', 'var(--skill-color-2)', 'var(--skill-color-3)',
            'var(--skill-color-4)', 'var(--skill-color-5)', 'var(--skill-color-6)',
            'var(--skill-color-7)', 'var(--skill-color-8)'
        ];

        infoCards.forEach(card => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            card.style.borderColor = randomColor;
            card.style.backgroundColor = randomColor;

            // Update text colors for better contrast on pastel background
            const title = card.querySelector('h3');
            if (title) title.style.color = '#2A2A2A';

            const strongTags = card.querySelectorAll('strong');
            strongTags.forEach(tag => tag.style.color = '#2A2A2A');

            const spanTags = card.querySelectorAll('span');
            spanTags.forEach(tag => tag.style.color = '#2A2A2A');
        });

        // Apply random colors to Advanced Tracking boxes (Dark theme + Glow)
        const metricBoxes = document.querySelectorAll('.metric-box');
        metricBoxes.forEach(box => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            // Apply color to border and text
            box.style.borderColor = randomColor;
            box.style.boxShadow = `0 0 10px ${randomColor}20`; // Subtle glow

            // Color the icon
            const icon = box.querySelector('.metric-icon');
            if (icon) icon.style.textShadow = `0 0 5px ${randomColor}`;

            // Color the title (strong tag)
            const title = box.querySelector('strong');
            if (title) title.style.color = randomColor;

            // Keep background dark but add a tiny tint
            box.style.background = `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, ${randomColor}10 100%)`;
        });

        console.log('✅ About You section initialized!');
        console.log('%c⚠️ Advanced tracking enabled', 'font-size: 14px; color: #ff6b6b; font-weight: bold;');
    } else {
        console.log('ℹ️ About You section not found on this page');
    }
}

// Try multiple initialization methods to ensure it runs
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', initializeAboutYou);
} else {
    // DOM is already loaded, run immediately
    initializeAboutYou();
}

// Also listen to load event as backup
window.addEventListener('load', () => {
    // Only run if not already initialized
    if (document.getElementById('about-you') && document.getElementById('user-ip').textContent === 'Loading...') {
        console.log('🔄 Running About You initialization from load event...');
        initializeAboutYou();
    }
});

// Easter Egg: Hidden message in page source

