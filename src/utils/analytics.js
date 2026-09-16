/**
 * Analytics Utility for Google Analytics 4 (GA4) & Microsoft Clarity
 * 
 * Safe, privacy-preserving telemetry without PII (Personally Identifiable Information).
 * Gracefully fails silently if measurement/project IDs are omitted or blocked.
 */

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

let isGA4Initialized = false;
let isClarityInitialized = false;

/**
 * Initializes GA4 script and configures dataLayer
 */
const initGA4 = () => {
  if (typeof window === 'undefined' || isGA4Initialized || !GA4_MEASUREMENT_ID) {
    return;
  }

  // Prevent placeholder string from executing
  if (GA4_MEASUREMENT_ID.includes('PASTE_GA4_MEASUREMENT_ID')) {
    return;
  }

  try {
    // Inject gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    // Disable automatic pageview so React Router can control exact SPA transitions
    gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
    });

    isGA4Initialized = true;
  } catch (err) {
    // Fail silently
    console.debug('GA4 initialization skipped:', err);
  }
};

/**
 * Initializes Microsoft Clarity tracking script
 */
const initClarity = () => {
  if (typeof window === 'undefined' || isClarityInitialized || !CLARITY_PROJECT_ID) {
    return;
  }

  // Prevent placeholder string from executing
  if (CLARITY_PROJECT_ID.includes('PASTE_CLARITY_PROJECT_ID')) {
    return;
  }

  try {
    (function(c, l, a, r, i, t, y) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);

    isClarityInitialized = true;
  } catch (err) {
    // Fail silently
    console.debug('Clarity initialization skipped:', err);
  }
};

/**
 * Master initialization function called once when the React application mounts
 */
export const initAnalytics = () => {
  initGA4();
  initClarity();
};

/**
 * Track SPA Pageviews on route change
 * @param {string} path - URL pathname (e.g. /profile, /project/01)
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function' || !isGA4Initialized) {
    return;
  }

  try {
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  } catch {
    // Fail silently
  }
};

/**
 * Safe generic event dispatcher
 * @param {string} eventName - GA4 event name
 * @param {Object} params - Event parameter map (non-PII)
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function' || !isGA4Initialized) {
    return;
  }

  try {
    window.gtag('event', eventName, params);
  } catch {
    // Fail silently
  }
};

/* ==========================================================================
   CONVENIENCE EVENT HELPERS (Strictly Non-PII)
   ========================================================================== */

/**
 * Track Contact Form Submission
 */
export const trackContactSubmit = () => {
  trackEvent('contact_form_submit', {
    form_id: 'contact_section_form',
  });
};

/**
 * Track Contact Form Error
 */
export const trackContactError = (errorReason = 'unknown') => {
  trackEvent('contact_form_error', {
    form_id: 'contact_section_form',
    error_reason: errorReason,
  });
};

/**
 * Track Resume Clicks / Downloads
 * @param {string} location - UI placement (e.g. 'navbar', 'hero', 'profile')
 */
export const trackResumeClick = (location = 'unknown') => {
  trackEvent('resume_click', {
    link_type: 'resume_pdf',
    location,
  });
};

/**
 * Track Social & Direct Contact Links
 * @param {string} platform - 'linkedin' | 'github' | 'instagram' | 'twitter' | 'email' | 'phone'
 * @param {string} location - Placement (e.g. 'contact', 'footer', 'navbar', 'profile')
 */
export const trackSocialClick = (platform, location = 'unknown') => {
  trackEvent(`${platform}_click`, {
    platform,
    location,
  });
};

/**
 * Track Project Clicks in lists or previews
 * @param {string} projectId - e.g. '01'
 * @param {string} projectTitle - e.g. 'Mission100 Hospital'
 * @param {string} category - e.g. 'Healthcare Platform'
 */
export const trackProjectClick = (projectId, projectTitle, category = '') => {
  trackEvent('project_click', {
    project_id: projectId,
    project_title: projectTitle,
    category,
  });
};

/**
 * Track Outbound Clicks to Live Production Demonstrations
 * @param {string} projectId - e.g. '01'
 * @param {string} projectTitle - e.g. 'Mission100 Hospital'
 */
export const trackProjectLiveDemoClick = (projectId, projectTitle) => {
  trackEvent('project_live_demo_click', {
    project_id: projectId,
    project_title: projectTitle,
  });
};

/**
 * Track AI Chatbot Actions
 * @param {'chatbot_open' | 'chatbot_close' | 'chatbot_message_sent' | 'chatbot_quick_prompt_click'} action
 * @param {Object} extraParams
 */
export const trackChatbotAction = (action, extraParams = {}) => {
  trackEvent(action, extraParams);
};

/**
 * Track UI Theme Mode Switching
 * @param {'light' | 'dark' | 'system'} theme
 */
export const trackThemeChange = (theme) => {
  trackEvent('theme_change', {
    theme,
  });
};
