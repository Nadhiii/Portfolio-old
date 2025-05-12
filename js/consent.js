// Clean version without debug statements - js/consent.js

(function() {
    // Constants
    const COOKIE_CONSENT_NAME = 'mahanadi_cookie_consent';
    const CONSENT_EXPIRY_DAYS = 365;
    
    // DOM elements
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptAllButton = document.getElementById('accept-all');
    const savePreferencesButton = document.getElementById('save-preferences');
    const closeButton = document.getElementById('cookie-close');
    const analyticsCookies = document.getElementById('analytics-cookies');
    const marketingCookies = document.getElementById('marketing-cookies');
    
    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        initConsentBanner();
        createPreferencesButton();
    });
    
    // Initialize consent banner
    function initConsentBanner() {
        const savedConsent = getSavedConsent();
        
        if (savedConsent) {
            // Apply saved consent settings
            updateGTMConsent(savedConsent);
        } else {
            // Show cookie banner after a short delay
            if (cookieBanner) {
                // Make sure the banner is initially hidden but properly styled
                cookieBanner.style.display = 'block';
                
                setTimeout(() => {
                    cookieBanner.classList.add('active');
                }, 1000);
            }
        }
        
        // Set up event listeners
        if (acceptAllButton) {
            acceptAllButton.addEventListener('click', handleAcceptAll);
        }
        
        if (savePreferencesButton) {
            savePreferencesButton.addEventListener('click', handleSavePreferences);
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', handleClose);
            
            // Add tooltip to close button
            closeButton.title = "Close (will only allow necessary cookies)";
        }
    }
    
    // Create a small button to reopen cookie preferences
    function createPreferencesButton() {
        // Only create if consent was already given
        if (getSavedConsent()) {
            const preferencesButton = document.createElement('button');
            preferencesButton.className = 'cookie-preferences-button';
            preferencesButton.setAttribute('aria-label', 'Cookie Preferences');
            preferencesButton.innerHTML = '🍪';
            preferencesButton.title = "Change cookie preferences";
            preferencesButton.addEventListener('click', function() {
                cookieBanner.style.display = 'block';
                setTimeout(() => {
                    cookieBanner.classList.add('active');
                }, 10);
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
    }
    
    // Close the banner
    function closeBanner() {
        cookieBanner.classList.remove('active');
        
        // After transition completes, set display to none
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 500); // Match this to your CSS transition duration
        
        createPreferencesButton();
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