/**
 * S-TIER PORTFOLIO SYSTEM - JavaScript Controller
 * Handles template switching, navigation, and interactions
 */

// Template configuration
const templates = [
    { name: 'Glassmorphism Luxury', file: 'template-1.css' },
    { name: 'Neo-Brutalism Bold', file: 'template-2.css' },
    { name: 'Gradient Vibrant', file: 'template-3.css' },
    { name: 'Minimal Professional', file: 'template-4.css' },
    { name: '3D Elevated Cards', file: 'template-5.css' }
];

// State management
let currentTemplateIndex = 0;
let currentSection = 'portfolioSection';

// DOM elements
const themeStylesLink = document.getElementById('theme-styles');
const templateNameDisplay = document.getElementById('templateName');
const prevButton = document.getElementById('prevTemplate');
const nextButton = document.getElementById('nextTemplate');
const sections = document.querySelectorAll('.section-content');
const navTabs = document.querySelectorAll('.nav-tab');
const contactForm = document.querySelector('.contact-form');

/**
 * Initialize the portfolio system
 */
function initializePortfolio() {
    // Set initial template
    loadTemplate(0);
    
    // Bind event listeners
    bindEventListeners();
    
    // Initialize section navigation
    initializeSectionNavigation();
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize animations
    initializeAnimations();
    
    // Preload other templates for performance
    preloadTemplates();
    
    console.log('🎨 S-Tier Portfolio System Initialized');
}

/**
 * Load a specific template
 * @param {number} index - Template index
 */
function loadTemplate(index) {
    // Validate index
    if (index < 0) index = templates.length - 1;
    if (index >= templates.length) index = 0;
    
    currentTemplateIndex = index;
    const template = templates[index];
    
    // Update CSS link
    if (themeStylesLink) {
        themeStylesLink.href = template.file;
    }
    
    // Update template name display
    if (templateNameDisplay) {
        templateNameDisplay.textContent = template.name;
    }
    
    // Add loading animation
    document.body.style.opacity = '0.8';
    
    // Smooth transition
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
    
    // Update URL hash for bookmarking
    updateURLHash();
    
    console.log(`🎨 Loaded template: ${template.name}`);
}

/**
 * Navigate to previous template
 */
function previousTemplate() {
    loadTemplate(currentTemplateIndex - 1);
    animateNavButton(prevButton, '←');
}

/**
 * Navigate to next template
 */
function nextTemplate() {
    loadTemplate(currentTemplateIndex + 1);
    animateNavButton(nextButton, '→');
}

/**
 * Animate navigation button feedback
 */
function animateNavButton(button, icon) {
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }, 100);
}

/**
 * Switch between Portfolio and Style Guide sections
 */
function switchSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }
    
    // Update nav tabs
    navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.section === sectionId) {
            tab.classList.add('active');
        }
    });
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log(`📄 Switched to section: ${sectionId}`);
}

/**
 * Bind all event listeners
 */
function bindEventListeners() {
    // Template navigation
    if (prevButton) {
        prevButton.addEventListener('click', previousTemplate);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextTemplate);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Section navigation
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.dataset.section;
            if (sectionId) {
                switchSection(sectionId);
            }
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', handlePopState);
    
    // Handle window resize for responsive updates
    window.addEventListener('resize', debounce(handleResize, 250));
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(event) {
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            previousTemplate();
            break;
        case 'ArrowRight':
            event.preventDefault();
            nextTemplate();
            break;
        case 'Escape':
            // Reset to first template
            loadTemplate(0);
            break;
    }
}

/**
 * Initialize section navigation
 */
function initializeSectionNavigation() {
    // Check URL hash for initial section
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchSection(hash);
    } else {
        switchSection('portfolioSection');
    }
}

/**
 * Initialize contact form handling
 */
function initializeFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

/**
 * Handle contact form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span>Sending...</span><span>⏳</span>';
    submitButton.disabled = true;
    
    // Simulate form processing
    setTimeout(() => {
        // Success state
        submitButton.innerHTML = '<span>Message Sent!</span><span>✅</span>';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    }, 1500);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Update URL hash for bookmarking
 */
function updateURLHash() {
    const newHash = `#template-${currentTemplateIndex + 1}`;
    if (window.location.hash !== newHash) {
        history.replaceState(null, null, newHash);
    }
}

/**
 * Handle browser back/forward navigation
 */
function handlePopState(event) {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('template-')) {
        const templateIndex = parseInt(hash.split('-')[1]) - 1;
        if (templateIndex >= 0 && templateIndex < templates.length) {
            loadTemplate(templateIndex);
        }
    }
}

/**
 * Handle window resize for responsive updates
 */
function handleResize() {
    // Reinitialize mobile slider if needed
    const existingIndicators = document.querySelector('.portfolio-indicators');
    if (existingIndicators) {
        existingIndicators.remove();
    }
    
    // Reinitialize based on new screen size
    if (window.innerWidth <= 768) {
        initializeMobileSlider();
    }
    
    console.log('📱 Window resized, updating responsive elements');
}

/**
 * Preload templates for better performance
 */
function preloadTemplates() {
    templates.forEach((template, index) => {
        if (index !== currentTemplateIndex) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = template.file;
            document.head.appendChild(link);
        }
    });
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Add CSS animations for notifications
 */
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize auto-cycling (optional feature)
 */
function initializeAutoCycle(intervalSeconds = 10) {
    let autoCycleInterval;
    
    function startAutoCycle() {
        autoCycleInterval = setInterval(() => {
            nextTemplate();
        }, intervalSeconds * 1000);
    }
    
    function stopAutoCycle() {
        if (autoCycleInterval) {
            clearInterval(autoCycleInterval);
            autoCycleInterval = null;
        }
    }
    
    // Pause auto-cycle on user interaction
    document.addEventListener('click', stopAutoCycle);
    document.addEventListener('keydown', stopAutoCycle);
    
    // Uncomment to enable auto-cycling
    // startAutoCycle();
}

/**
 * Add smooth page transitions
 */
function addPageTransitions() {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

/**
 * Initialize animations and scroll effects
 */
function initializeAnimations() {
    // Initialize intersection observer for portfolio cards
    initializeIntersectionObserver();
    
    // Initialize mobile slider if needed
    initializeMobileSlider();
    
    // Trigger initial animations
    triggerInitialAnimations();
    
    // Add revealed class to profile bio after animation completes
    setTimeout(() => {
        const profileBio = document.querySelector('.profile-bio');
        if (profileBio) {
            profileBio.classList.add('revealed');
        }
    }, 2000); // 1.2s delay + 0.8s animation duration
}

/**
 * Initialize intersection observer for scroll-triggered animations
 */
function initializeIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        observer.observe(item);
    });

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        observer.observe(card);
    });
    
    console.log(`🔍 Observing ${portfolioItems.length} portfolio items and ${testimonialCards.length} testimonial cards`);
}

/**
 * Initialize mobile portfolio slider
 */
function initializeMobileSlider() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid || window.innerWidth > 768) return;

    // Add touch support
    let startX = 0;
    let scrollLeft = 0;
    let isScrolling = false;

    portfolioGrid.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - portfolioGrid.offsetLeft;
        scrollLeft = portfolioGrid.scrollLeft;
        isScrolling = true;
    });

    portfolioGrid.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - portfolioGrid.offsetLeft;
        const walk = (x - startX) * 2;
        portfolioGrid.scrollLeft = scrollLeft - walk;
    });

    portfolioGrid.addEventListener('touchend', () => {
        isScrolling = false;
        snapToCard();
    });

    // Snap to nearest card
    function snapToCard() {
        const cardWidth = 280 + 18; // card width + gap
        const scrollPosition = portfolioGrid.scrollLeft;
        const targetCard = Math.round(scrollPosition / cardWidth);
        const targetPosition = targetCard * cardWidth;
        
        portfolioGrid.scrollTo({
            left: targetPosition,
            behavior: 'smooth'
        });
    }

    // Add scroll indicators
    addScrollIndicators();
}

/**
 * Add scroll indicators for mobile slider
 */
function addScrollIndicators() {
    const portfolioSection = document.querySelector('.portfolio-section');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!portfolioSection || portfolioItems.length <= 1) return;

    // Create indicator container
    const indicators = document.createElement('div');
    indicators.className = 'portfolio-indicators';
    indicators.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 16px;
        padding: 0 16px;
    `;

    // Create indicator dots
    portfolioItems.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'indicator-dot';
        dot.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: var(--border);
            transition: all 0.3s ease;
            cursor: pointer;
        `;
        
        if (index === 0) {
            dot.style.background = 'var(--primary)';
        }

        dot.addEventListener('click', () => {
            const cardWidth = 280 + 18;
            portfolioGrid.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        });

        indicators.appendChild(dot);
    });

    portfolioSection.appendChild(indicators);

    // Update active indicator on scroll
    portfolioGrid.addEventListener('scroll', debounce(() => {
        const cardWidth = 280 + 18;
        const currentCard = Math.round(portfolioGrid.scrollLeft / cardWidth);
        const dots = indicators.querySelectorAll('.indicator-dot');
        
        dots.forEach((dot, index) => {
            dot.style.background = index === currentCard ? 'var(--primary)' : 'var(--border)';
        });
    }, 100));
}

/**
 * Trigger initial animations on page load
 */
function triggerInitialAnimations() {
    // Portfolio items in viewport get revealed immediately
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                item.classList.add('reveal');
            }, 1200 + (index * 200));
        }
    });
    
    // Also check testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                card.classList.add('reveal');
            }, 1400 + (index * 250));
        }
    });
    
    console.log(`✨ Triggered initial animations for ${portfolioItems.length} portfolio items and ${testimonialCards.length} testimonial cards`);
}

/**
 * Performance monitoring
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page load time: ${loadTime}ms`);
            }, 0);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    addNotificationStyles();
    addPageTransitions();
    monitorPerformance();
    
    // Optional: Initialize auto-cycling
    // initializeAutoCycle(8);
});

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--reveal-delay', '0s');
    document.documentElement.style.setProperty('--stagger-delay', '0s');
    document.documentElement.style.setProperty('--transition-reveal', '0.3s ease');
}

// Export functions for external use (if needed)
window.PortfolioSystem = {
    loadTemplate,
    switchSection,
    previousTemplate,
    nextTemplate,
    templates,
    getCurrentTemplate: () => templates[currentTemplateIndex]
};