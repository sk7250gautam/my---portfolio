/**
 * Saksham Gautam - Portfolio Engine
 * Modern, High-Performance ES6 JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initTypewriter();
    initMobileNav();
    initScrollSpy();
    initBackToTop();
    initSkillsFilter();
    initContactForm();
    initCopyEmail();
    initTiltEffect();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark / Light with LocalStorage Persistence)
   ========================================================================== */
function initTheme() {
    const themeBtn = document.getElementById("themeBtn");
    const savedTheme = localStorage.getItem("saksham-portfolio-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Apply saved theme or system preference
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark");
            localStorage.setItem("saksham-portfolio-theme", isDark ? "dark" : "light");
            showToast(isDark ? "🌙 Dark mode activated" : "☀️ Light mode activated");
        });
    }
}

/* ==========================================================================
   2. DYNAMIC LIVE TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;

    const phrases = [
        "B.Tech CSE Student",
        "Frontend Web Developer",
        "C++ & DSA Problem Solver",
        "Curious Tech Explorer",
        "Passionate Code Craftsman"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 95;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 450;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (!hamburgerBtn || !mobileMenu) return;

    function toggleMenu() {
        const isOpen = mobileMenu.classList.toggle("open");
        hamburgerBtn.classList.toggle("active");
        hamburgerBtn.setAttribute("aria-expanded", isOpen);
        mobileMenu.setAttribute("aria-hidden", !isOpen);
    }

    function closeMenu() {
        mobileMenu.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
    }

    hamburgerBtn.addEventListener("click", toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close when clicking outside header
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#mainHeader") && mobileMenu.classList.contains("open")) {
            closeMenu();
        }
    });
}

/* ==========================================================================
   4. SCROLL SPY (Active Link Highlighting on Scroll)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
}

/* ==========================================================================
   5. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const topBtn = document.getElementById("topBtn");
    if (!topBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 380) {
            topBtn.classList.add("visible");
        } else {
            topBtn.classList.remove("visible");
        }
    }, { passive: true });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================================================
   6. SKILLS CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
    const tabs = document.querySelectorAll(".filter-tab");
    const skillBoxes = document.querySelectorAll(".skill-box");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filterValue = tab.getAttribute("data-category");

            skillBoxes.forEach(box => {
                const boxCategory = box.getAttribute("data-category") || "";
                if (filterValue === "all" || boxCategory.includes(filterValue)) {
                    box.style.display = "block";
                    box.style.animation = "fadeIn 0.35s ease";
                } else {
                    box.style.display = "none";
                }
            });
        });
    });
}

/* ==========================================================================
   7. PROJECT DETAILS MODAL
   ========================================================================== */
const projectData = {
    cricket: {
        title: "Live Cricket Score Tracker",
        subtitle: "Real-Time Sports Analytics & Match Summary Application",
        desc: "A responsive, feature-rich web app created for cricket enthusiasts. It fetches and presents live match scores, over updates, current run rate, required run rate, and player scorecard statistics cleanly.",
        features: [
            "Live ball-by-ball and over summary display",
            "Automatic score refresh simulation with REST API endpoints",
            "Responsive layout tailored for mobile match updates on the go",
            "Dark and light mode optimized contrast for bright stadium viewing"
        ],
        tech: ["JavaScript (ES6+)", "Fetch API", "CSS Grid & Flexbox", "Local State"],
        demoUrl: "#",
        codeUrl: "https://github.com/sk7250gautam"
    },
    kuk: {
        title: "KUK Notes & Student Study Hub",
        subtitle: "University Resource Portal for Computer Science Undergraduates",
        desc: "A centralized academic platform created to eliminate the chaotic hunt for university resources. It organizes semester-wise course syllabi, lecture notes, textbook references, and previous years' exam papers for KUK CSE students.",
        features: [
            "Semester-wise and subject-wise categorized notes repository",
            "Fast search filter to locate specific unit notes and previous year papers",
            "Bookmark favorite subjects using browser LocalStorage",
            "Clean reading UI optimized for desktop and mobile study sessions"
        ],
        tech: ["HTML5 Semantic", "CSS3 Glassmorphism", "Vanilla JavaScript", "LocalStorage API"],
        demoUrl: "#",
        codeUrl: "https://github.com/sk7250gautam"
    },
    portfolio: {
        title: "Developer Portfolio v2.0",
        subtitle: "Personal Brand & Engineering Showcase",
        desc: "The current website you are viewing! Re-engineered from scratch to demonstrate frontend mastery, accessibility, aesthetic glassmorphism, responsive navigation, and smooth user micro-interactions.",
        features: [
            "Glassmorphism UI design system with dynamic ambient gradient glow blobs",
            "Live typing effect with interactive terminal cursor",
            "Categorized technical skill matrix with animated progress meters",
            "Persistent Dark / Light theme synced with localStorage & OS preference",
            "Accessible mobile hamburger drawer and interactive modal popups"
        ],
        tech: ["Modern HTML5", "CSS Custom Properties", "Vanilla JavaScript", "Responsive Design"],
        demoUrl: "#home",
        codeUrl: "https://github.com/sk7250gautam"
    }
};

window.openProjectModal = function(projectId) {
    const modal = document.getElementById("projectModal");
    const modalBody = document.getElementById("modalBody");
    const project = projectData[projectId];

    if (!modal || !modalBody || !project) return;

    const techBadges = project.tech.map(t => `<span class="tag">${t}</span>`).join(" ");
    const featureItems = project.features.map(f => `<li>${f}</li>`).join("");

    modalBody.innerHTML = `
        <h3 class="modal-detail-title" id="modalTitle">${project.title}</h3>
        <p class="modal-detail-subtitle">${project.subtitle}</p>
        <p class="modal-detail-desc">${project.desc}</p>

        <div class="modal-features-list">
            <h4>Key Highlights & Features:</h4>
            <ul>${featureItems}</ul>
        </div>

        <div class="modal-tech-stack">
            <h4 style="font-size: 0.95rem; margin-bottom: 8px;">Technologies Used:</h4>
            <div class="project-tech-tags">${techBadges}</div>
        </div>

        <div class="modal-actions">
            <a href="${project.demoUrl}" class="btn btn-primary" ${project.demoUrl !== '#home' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                <span>Live Preview ↗</span>
            </a>
            <a href="${project.codeUrl}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <span>GitHub Code ⌥</span>
            </a>
        </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
};

function closeModal() {
    const modal = document.getElementById("projectModal");
    if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}

// Modal event listeners
document.addEventListener("DOMContentLoaded", () => {
    const modalClose = document.getElementById("modalClose");
    const modalOverlay = document.getElementById("modalOverlay");

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});

/* ==========================================================================
   8. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submitBtn");
    const btnSpinner = document.getElementById("btnSpinner");
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validation
        let isValid = true;

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");

        if (nameError) nameError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (messageError) messageError.textContent = "";

        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const messageVal = messageInput.value.trim();

        if (!nameVal) {
            if (nameError) nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            if (emailError) emailError.textContent = "Please enter your email.";
            isValid = false;
        } else if (!emailRegex.test(emailVal)) {
            if (emailError) emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (!messageVal) {
            if (messageError) messageError.textContent = "Please enter your message.";
            isValid = false;
        } else if (messageVal.length < 10) {
            if (messageError) messageError.textContent = "Message must be at least 10 characters long.";
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        if (btnSpinner && btnText) {
            btnSpinner.classList.remove("hidden");
            btnText.textContent = "Sending...";
            submitBtn.disabled = true;
        }

        // Simulate server response or prepare for Formspree
        setTimeout(() => {
            if (btnSpinner && btnText) {
                btnSpinner.classList.add("hidden");
                btnText.textContent = "Send Message 🚀";
                submitBtn.disabled = false;
            }

            showToast(`✅ Thank you, ${nameVal}! Your message has been sent successfully.`);
            form.reset();
        }, 1200);
    });
}

/* ==========================================================================
   9. COPY EMAIL TO CLIPBOARD
   ========================================================================== */
function initCopyEmail() {
    const copyBtn = document.getElementById("copyEmailChip");
    const emailAddress = "saksham.sk7250@gmail.com";

    if (!copyBtn) return;

    copyBtn.addEventListener("click", (e) => {
        e.preventDefault();

        navigator.clipboard.writeText(emailAddress).then(() => {
            showToast("📋 Email copied to clipboard: " + emailAddress);
        }).catch(() => {
            // Fallback
            window.location.href = `mailto:${emailAddress}`;
        });
    });

    const resumeBtn = document.getElementById("resumeBtn");
    if (resumeBtn) {
        resumeBtn.addEventListener("click", () => {
            showToast("📄 Downloading Saksham's Resume...");
        });
    }
}

/* ==========================================================================
   10. INTERACTIVE TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/* ==========================================================================
   11. HERO CARD 3D TILT EFFECT
   ========================================================================== */
function initTiltEffect() {
    const card = document.getElementById("tiltCard");
    if (!card) return;

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
}