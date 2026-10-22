/**
 * BlissMoney - Bottom-Right Dual-State Lead Popup Widget
 * Triggers after 2 seconds on visit.
 * State 1: "Turn your today into a brighter tomorrow" (Graphic + Get Started)
 * State 2: "Let's plan your next chapter" (WhatsApp + Consultation form + Badges)
 */

(function () {
  'use strict';

  function initLeadPopup() {
    var popup = document.getElementById('bmLeadPopup');
    if (!popup) return;

    var step1 = document.getElementById('bmPopupStep1');
    var step2 = document.getElementById('bmPopupStep2');
    var btnGetStarted = document.getElementById('bmPopupGetStarted');
    var btnMaybeLater = document.getElementById('bmPopupMaybeLater');
    var btnClose1 = document.getElementById('bmPopupClose1');
    var btnClose2 = document.getElementById('bmPopupClose2');
    var consultForm = document.getElementById('bmPopupConsultForm');
    var inputName = document.getElementById('bmPopupName');
    var inputEmail = document.getElementById('bmPopupEmail');

    // Clear any previous session dismissal so popup always appears on refresh
    try {
      sessionStorage.removeItem('bm_popup_dismissed');
    } catch (e) {}

    // Public method to force open popup
    window.bmShowPopup = function (forceStep) {
      if (forceStep === 2) {
        showStep(2);
      } else {
        showStep(1);
      }
      popup.classList.add('is-visible');
      document.body.classList.add('bm-popup-active');
    };

    // Public method to close popup
    window.bmClosePopup = function () {
      popup.classList.remove('is-visible');
      document.body.classList.remove('bm-popup-active');
    };

    function showStep(stepNum) {
      if (stepNum === 2) {
        if (step1) step1.style.display = 'none';
        if (step2) {
          step2.style.display = 'block';
          // Focus name input after animation
          setTimeout(function () {
            if (inputName) inputName.focus();
          }, 250);
        }
      } else {
        if (step2) step2.style.display = 'none';
        if (step1) step1.style.display = 'block';
      }
    }

    // Step 1: Click "Get started →" -> transition to Step 2
    if (btnGetStarted) {
      btnGetStarted.addEventListener('click', function (e) {
        e.preventDefault();
        showStep(2);
      });
    }

    // Dismiss handlers
    function handleDismiss(e) {
      if (e) e.preventDefault();
      window.bmClosePopup();
    }

    if (btnClose1) btnClose1.addEventListener('click', handleDismiss);
    if (btnClose2) btnClose2.addEventListener('click', handleDismiss);
    if (btnMaybeLater) btnMaybeLater.addEventListener('click', handleDismiss);

    // Escape key closes popup
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popup.classList.contains('is-visible')) {
        window.bmClosePopup(false);
      }
    });

    // Step 2: Handle Consultation form submission
    if (consultForm) {
      consultForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var nameVal = (inputName ? inputName.value : '').trim();
        var emailVal = (inputEmail ? inputEmail.value : '').trim();

        if (!nameVal) {
          if (inputName) {
            inputName.focus();
            inputName.style.borderColor = '#d9534f';
          }
          return;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailPattern.test(emailVal)) {
          if (inputEmail) {
            inputEmail.focus();
            inputEmail.style.borderColor = '#d9534f';
          }
          return;
        }

        // Pre-fill existing site consultation modal if available
        var modalName = document.getElementById('consultName');
        var modalEmail = document.getElementById('consultEmail');
        if (modalName) modalName.value = nameVal;
        if (modalEmail) modalEmail.value = emailVal;

        // Close lead popup
        window.bmClosePopup();

        // Open consultation modal if present
        if (typeof window.openConsultationModal === 'function') {
          window.openConsultationModal();
        } else {
          var modal = document.getElementById('consultationModal');
          if (modal) {
            modal.classList.add('is-active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
          }
        }
      });
    }

    // Reset input border color on input
    [inputName, inputEmail].forEach(function (input) {
      if (input) {
        input.addEventListener('input', function () {
          input.style.borderColor = '';
        });
      }
    });

    // Trigger on every page load and refresh after 2 seconds
    setTimeout(function () {
      if (!popup.classList.contains('is-visible')) {
        showStep(1);
        popup.classList.add('is-visible');
        document.body.classList.add('bm-popup-active');
      }
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeadPopup);
  } else {
    initLeadPopup();
  }
})();
