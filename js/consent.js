document.addEventListener('DOMContentLoaded', function() {
  // Create overlay to block interaction
  const overlay = document.createElement('div');
  overlay.id = 'consent-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9990;
    backdrop-filter: blur(5px);
  `;
  document.body.appendChild(overlay);
  
  // Check if consent has been given
  const hasConsent = localStorage.getItem('cookieConsent');
  
  // Show cookie banner if no consent
  const cookieBanner = document.getElementById('cookie-consent');
  if (!hasConsent) {
    cookieBanner.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  } else {
    // If consent exists, apply stored preferences
    applyStoredPreferences();
    overlay.remove();
  }
  
  // Handle button clicks
  const acceptAllButton = document.getElementById('accept-all');
  const savePrefsButton = document.getElementById('save-preferences');
  const closeButton = document.getElementById('cookie-close');
  
  if (acceptAllButton) {
    acceptAllButton.addEventListener('click', function() {
      // Accept all cookies
      const preferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
      };
      
      savePreferences(preferences);
      updateConsentMode(preferences);
      hideBanner();
    });
  }
  
  if (savePrefsButton) {
    savePrefsButton.addEventListener('click', function() {
      // Save selected preferences
      const analyticsConsent = document.getElementById('analytics-cookies').checked;
      const marketingConsent = document.getElementById('marketing-cookies').checked;
      
      const preferences = {
        necessary: true,
        analytics: analyticsConsent,
        marketing: marketingConsent,
        timestamp: new Date().toISOString()
      };
      
      savePreferences(preferences);
      updateConsentMode(preferences);
      hideBanner();
    });
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      // Necessary cookies only
      const preferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
      };
      
      savePreferences(preferences);
      updateConsentMode(preferences);
      hideBanner();
    });
  }
  
  // Add cookie preferences button after consent
  function addPreferencesButton() {
    // Check if button already exists
    if (document.querySelector('.cookie-preferences-button')) return;
    
    const prefsButton = document.createElement('button');
    prefsButton.className = 'cookie-preferences-button';
    prefsButton.innerHTML = '🍪';
    prefsButton.title = 'Cookie Preferences';
    prefsButton.setAttribute('aria-label', 'Open Cookie Preferences');
    
    prefsButton.addEventListener('click', function() {
      cookieBanner.classList.add('active');
      // Reload saved preferences to checked state
      const preferences = JSON.parse(localStorage.getItem('cookieConsent'));
      if (preferences) {
        document.getElementById('analytics-cookies').checked = preferences.analytics;
        document.getElementById('marketing-cookies').checked = preferences.marketing;
      }
    });
    
    document.body.appendChild(prefsButton);
  }
  
  // Hide banner and show preferences button
  function hideBanner() {
    cookieBanner.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
    overlay.remove();
    addPreferencesButton();
  }
  
  // Save preferences to localStorage
  function savePreferences(preferences) {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
  }
  
  // Apply stored preferences
  function applyStoredPreferences() {
    const preferences = JSON.parse(localStorage.getItem('cookieConsent'));
    if (preferences) {
      updateConsentMode(preferences);
      addPreferencesButton();
    }
  }
  
  // Update Google Consent Mode v2
  function updateConsentMode(preferences) {
    // Push to dataLayer for GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'consentUpdated',
      'consent': {
        'analytics': preferences.analytics,
        'marketing': preferences.marketing,
        'necessary': preferences.necessary
      }
    });
  }
});