/**
 * Universal WhatsApp Click Tracker
 * Dr. Mahima's Dental Care
 *
 * Automatically tracks every click on any link to wa.me or api.whatsapp.com
 * Fires the `whatsapp_click` GA4 event and also sends a Google Ads conversion.
 *
 * Usage: Add <script src="/assets/wa-tracker.js" defer></script> before </body>
 * on every page of the site.
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    // Find every WhatsApp link on the page
    var waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]');

    waLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // Identify what kind of button this is for richer analytics
        var buttonType = 'generic';
        if (link.classList.contains('wa-fab')) {
          buttonType = 'floating_fab';
        } else if (link.classList.contains('btn-wa-big') ||
                   link.classList.contains('wa-submit')) {
          buttonType = 'primary_cta';
        } else if (link.classList.contains('fc-wa') ||
                   link.classList.contains('ms-wa')) {
          buttonType = 'secondary_cta';
        }

        // Determine the page this click came from
        var page = window.location.pathname;

        // Fire GA4 event
        if (typeof gtag === 'function') {
          gtag('event', 'whatsapp_click', {
            'button_type': buttonType,
            'page_path': page
          });

          // Also fire as a Google Ads conversion (if you've set up a conversion action)
          // Uncomment and replace with your conversion label once you create one in Google Ads
          // gtag('event', 'conversion', {
          //   'send_to': 'AW-17955432842/YOUR_CONVERSION_LABEL'
          // });
        }
      });
    });

    // Also track the hero form on the homepage (which uses window.location.href instead of a link)
    // by wrapping the sendHeroForm function if it exists
    if (typeof window.sendHeroForm === 'function') {
      var originalSendHeroForm = window.sendHeroForm;
      window.sendHeroForm = function() {
        if (typeof gtag === 'function') {
          gtag('event', 'whatsapp_click', {
            'button_type': 'hero_form',
            'page_path': window.location.pathname
          });
        }
        // Delay slightly so GA4 can send the event before the page navigates
        setTimeout(originalSendHeroForm, 300);
      };
    }
  });
})();
