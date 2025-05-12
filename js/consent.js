// js/consent.js - With subtle, harmonious animation

(function() {
    // Constants
    const COOKIE_CONSENT_NAME = 'mahanadi_cookie_consent';
    const CONSENT_EXPIRY_DAYS = 365;
    
    // DOM elements
    let cookieBanner, acceptAllButton, savePreferencesButton, closeButton, analyticsCookies, marketingCookies;
    
    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Get DOM elements
        cookieBanner = document.getElementById('cookie-consent');
        acceptAllButton = document.getElementById('accept-all');
        savePreferencesButton = document.getElementById('save-preferences');
        closeButton = document.getElementById('cookie-close');
        analyticsCookies = document.getElementById('analytics-cookies');
        marketingCookies = document.getElementById('marketing-cookies');
        
        // Initialize consent banner
        initConsentBanner();
    });
    
    // Initialize consent banner
    function initConsentBanner() {
        const savedConsent = getSavedConsent();
        
        if (savedConsent) {
            // Apply saved consent settings without showing banner
            updateGTMConsent(savedConsent);
            
            // Create preferences button for returning users
            createPreferencesButton();
        } else {
            // Show cookie banner after intro animation completes
            if (cookieBanner) {
                // Wait for intro animation to complete before showing cookie banner
                const bannerShowDelay = 5500; // Intro animation takes ~5s
                
                setTimeout(() => {
                    cookieBanner.classList.add('active');
                    
                    // Add subtle fade-in-up animation
                    subtleAnimation();
                    
                    console.log("Cookie banner activated"); // Debug message
                }, bannerShowDelay);
            }
        }
        
        // Set up event listeners for cookie buttons
        setupEventListeners();
    }
    
    // Adds a subtle animation to gently draw attention
    function subtleAnimation() {
        // Start slightly below and fade in
        cookieBanner.style.transform = 'translate(-50%, -45%)';
        cookieBanner.style.opacity = '0';
        
        // Animate to final position
        setTimeout(() => {
            cookieBanner.style.transform = 'translate(-50%, -50%)';
            cookieBanner.style.opacity = '1';
            
            // Add a very subtle shadow pulse
            setTimeout(() => {
                // Just one subtle pulse
                cookieBanner.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(67, 97, 238, 0.4)';
                
                setTimeout(() => {
                    cookieBanner.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(67, 97, 238, 0.3)';
                }, 500);
            }, 300);
        }, 100);
    }
    
    // Set up event listeners for cookie banner buttons
    function setupEventListeners() {
        if (acceptAllButton) {
            acceptAllButton.addEventListener('click', handleAcceptAll);
        }
        
        if (savePreferencesButton) {
            savePreferencesButton.addEventListener('click', handleSavePreferences);
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', handleClose);
        }
    }
    
    // Create a small button to reopen cookie preferences
    function createPreferencesButton() {
        // Only create if it doesn't already exist
        if (!document.querySelector('.cookie-preferences-button')) {
            const preferencesButton = document.createElement('button');
            preferencesButton.className = 'cookie-preferences-button';
            preferencesButton.setAttribute('aria-label', 'Cookie Preferences');
            preferencesButton.innerHTML = '🍪';
            preferencesButton.title = "Change cookie preferences";
            
            preferencesButton.addEventListener('click', function() {
                cookieBanner.classList.add('active');
                
                // Add subtle animation when reopening
                subtleAnimation();
            });
            
            document.body.appendChild(preferencesButton);
        }
    }
    
    // Handle "Accept All" button click
    function handleAcceptAll() {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        
        saveConsent(consent);
        updateGTMConsent(consent);
        closeBanner();
        createPreferencesButton();
    }
    
    // Handle "Save Preferences" button click
    function handleSavePreferences() {
        const consent = {
            necessary: true, // Always required
            analytics: analyticsCookies.checked,
            marketing: marketingCookies.checked,
            timestamp: new Date().toISOString()
        };
        
        saveConsent(consent);
        updateGTMConsent(consent);
        closeBanner();
        createPreferencesButton();
    }
    
    // Handle banner close button click
    function handleClose() {
        // Default to necessary cookies only when closing without explicit choice
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        saveConsent(consent);
        updateGTMConsent(consent);
        closeBanner();
        createPreferencesButton();
    }
    
    // Close the banner with a subtle animation
    function closeBanner() {
        // Subtle fade out animation
        cookieBanner.style.opacity = '0';
        cookieBanner.style.transform = 'translate(-50%, -55%)';
        
        setTimeout(() => {
            cookieBanner.classList.remove('active');
            
            // Reset styles for next time
            setTimeout(() => {
                cookieBanner.style.transform = 'translate(-50%, -50%)';
            }, 300);
        }, 300);
    }
    
    // Save consent preferences to cookie
    function saveConsent(consentData) {
        // Save as cookie
        const consentJson = JSON.stringify(consentData);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
        
        document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(consentJson)};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
        
        // Also save to localStorage as backup
        try {
            localStorage.setItem(COOKIE_CONSENT_NAME, consentJson);
        } catch (e) {
            // Silent fail if localStorage is not available
        }
    }
    
    // Get saved consent from cookie or localStorage
    function getSavedConsent() {
        // Try to get from cookie first
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${COOKIE_CONSENT_NAME}=`));
            
        if (cookieValue) {
            try {
                return JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
            } catch (e) {
                // Ignore parsing errors
            }
        }
        
        // Try localStorage as fallback
        try {
            const localStorageValue = localStorage.getItem(COOKIE_CONSENT_NAME);
            if (localStorageValue) {
                return JSON.parse(localStorageValue);
            }
        } catch (e) {
            // Ignore localStorage errors
        }
        
        return null;
    }
    
    // Update Google Tag Manager with consent state
    function updateGTMConsent(consent) {
        if (window.dataLayer) {
            // Push individual consent types to dataLayer
            window.dataLayer.push({
                'analytics_storage': consent.analytics ? 'granted' : 'denied',
                'ad_storage': consent.marketing ? 'granted' : 'denied',
                'personalization_storage': consent.marketing ? 'granted' : 'denied'
            });
            
            // Push consent_update event
            window.dataLayer.push({
                'event': 'consent_update'
            });
        }
    }
})();