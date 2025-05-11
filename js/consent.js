// Add this debug version of consent.js temporarily to troubleshoot
// Add console logs to see what's happening

(function() {
    // Constants
    const COOKIE_CONSENT_NAME = 'mahanadi_cookie_consent';
    const CONSENT_EXPIRY_DAYS = 365;
    
    console.log('Cookie consent script loaded');
    
    // DOM elements
    const cookieBanner = document.getElementById('cookie-consent');
    console.log('Found cookie banner element:', cookieBanner !== null);
    
    const acceptAllButton = document.getElementById('accept-all');
    const savePreferencesButton = document.getElementById('save-preferences');
    const closeButton = document.getElementById('cookie-close');
    const analyticsCookies = document.getElementById('analytics-cookies');
    const marketingCookies = document.getElementById('marketing-cookies');
    
    console.log('Accept All button found:', acceptAllButton !== null);
    console.log('Save Prefs button found:', savePreferencesButton !== null);
    console.log('Close button found:', closeButton !== null);
    
    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing consent banner');
        initConsentBanner();
        createPreferencesButton();
    });
    
    // Initialize consent banner
    function initConsentBanner() {
        console.log('Initializing banner');
        const savedConsent = getSavedConsent();
        console.log('Saved consent:', savedConsent);
        
        if (savedConsent) {
            // Apply saved consent settings
            console.log('Applying saved consent');
            updateGTMConsent(savedConsent);
        } else {
            // Show cookie banner after a short delay
            console.log('No saved consent found, will show banner');
            if (cookieBanner) {
                setTimeout(() => {
                    console.log('Showing banner now');
                    cookieBanner.classList.add('active');
                    console.log('Banner active class added');
                }, 1000);
            } else {
                console.error('Banner element not found by ID "cookie-consent"');
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
        }
    }
    
    // Create a small button to reopen cookie preferences
    function createPreferencesButton() {
        // Only create if consent was already given
        if (getSavedConsent()) {
            console.log('Creating preferences button');
            const preferencesButton = document.createElement('button');
            preferencesButton.className = 'cookie-preferences-button';
            preferencesButton.setAttribute('aria-label', 'Cookie Preferences');
            preferencesButton.innerHTML = '🍪';
            preferencesButton.addEventListener('click', function() {
                cookieBanner.classList.add('active');
            });
            document.body.appendChild(preferencesButton);
        }
    }
    
    // Handle "Accept All" button click
    function handleAcceptAll() {
        console.log('Accept All clicked');
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
        console.log('Save Preferences clicked');
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
        console.log('Close button clicked');
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
        console.log('Closing banner');
        cookieBanner.classList.remove('active');
        createPreferencesButton();
    }
    
    // Save consent preferences to cookie
    function saveConsent(consentData) {
        console.log('Saving consent data:', consentData);
        // Save as cookie
        const consentJson = JSON.stringify(consentData);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
        
        document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(consentJson)};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
        console.log('Saved to cookie');
        
        // Also save to localStorage as backup
        try {
            localStorage.setItem(COOKIE_CONSENT_NAME, consentJson);
            console.log('Saved to localStorage');
        } catch (e) {
            console.warn('Could not save consent to localStorage');
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
                console.log('Found consent cookie');
                return JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
            } catch (e) {
                console.warn('Failed to parse consent cookie');
            }
        }
        
        // Try localStorage as fallback
        try {
            const localStorageValue = localStorage.getItem(COOKIE_CONSENT_NAME);
            if (localStorageValue) {
                console.log('Found consent in localStorage');
                return JSON.parse(localStorageValue);
            }
        } catch (e) {
            console.warn('Could not retrieve consent from localStorage');
        }
        
        console.log('No saved consent found');
        return null;
    }
    
    // Update Google Tag Manager with consent state
    function updateGTMConsent(consent) {
        console.log('Updating GTM consent with:', consent);
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
            
            console.log('Pushed consent to dataLayer');
        } else {
            console.warn('dataLayer not found, cannot update consent');
        }
    }
})();