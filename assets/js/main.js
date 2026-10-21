/**
 * BlissMoney - Interactive Stacked Cards Deck
 * Progressive peel-off downward animation on dot navigation:
 * - Dot 1: 4 cards visible (1st active + 3 behind)
 * - Dot 2: Card 1 slides down, 3 cards left (2nd active + 2 behind)
 * - Dot 3: Card 2 slides down, 2 cards left (3rd active + 1 behind)
 * - Dot 4: Card 3 slides down, 4th card remains alone
 */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-item');
  const dots = document.querySelectorAll('.deck-dot');
  let currentIndex = 0;

  if (!cards.length || !dots.length) return;

  function updateDeck(activeIndex) {
    currentIndex = activeIndex;

    // Update active state on dots
    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Update dot section step for smooth upward/return animation
    const deckControls = document.querySelector('.deck-controls');
    if (deckControls) {
      deckControls.style.setProperty('--dot-step', activeIndex);
    }

    // Update cards: cards before activeIndex peel off to the bottom-left;
    // remaining cards stay in their fixed stacked positions (last card stays anchored!)
    cards.forEach((card, idx) => {
      card.classList.remove('is-dropped', 'is-dropped-far');

      if (idx < activeIndex) {
        // Previous card has peeled down-left and exited
        if (activeIndex - idx > 1) {
          card.classList.add('is-dropped-far');
        } else {
          card.classList.add('is-dropped');
        }
        card.setAttribute('aria-hidden', 'true');
      } else {
        // Card stays at its fixed base stack position
        card.setAttribute('aria-hidden', idx === activeIndex ? 'false' : 'true');
      }
    });
  }

  // Attach click events to dots
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(targetIndex) && targetIndex !== currentIndex) {
        updateDeck(targetIndex);
      }
    });
  });

  // Allow clicking cards to slide through the deck (cycle forward and loop back up)
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx === currentIndex) {
        // Clicking active front card slides it down to reveal the next card
        const nextIndex = (currentIndex + 1) % cards.length;
        updateDeck(nextIndex);
      } else if (idx > currentIndex) {
        // Clicking any visible card behind brings it to the front
        updateDeck(idx);
      }
    });
  });

  const stackedDeck = document.querySelector('.stacked-deck');
  if (stackedDeck) {
    stackedDeck.addEventListener('click', (e) => {
      if (e.target === stackedDeck) {
        const nextIndex = (currentIndex + 1) % cards.length;
        updateDeck(nextIndex);
      }
    });
  }

  // Function to ensure card deck's top-right card (Card 4) touches the bottom of serve-decor SVG
  function alignDeckWithDecor() {
    const decor = document.querySelector('.serve-decor');
    const header = document.querySelector('.serve-header');
    const wrapper = document.querySelector('.serve-deck-wrapper');
    if (!decor || !header || !wrapper) return;

    if (window.innerWidth > 900) {
      const decorBottom = decor.getBoundingClientRect().bottom;
      const headerBottom = header.getBoundingClientRect().bottom;
      const style = getComputedStyle(document.documentElement);
      const offsetY = parseFloat(style.getPropertyValue('--card-stack-offset-y')) || 60;
      const targetMargin = Math.max(30, (decorBottom - headerBottom) + offsetY);
      wrapper.style.marginTop = `${targetMargin}px`;
    } else {
      wrapper.style.marginTop = '';
    }
  }

  // Initialize Section 01 deck with first card active (all 4 cards present)
  updateDeck(0);
  alignDeckWithDecor();

  window.addEventListener('resize', alignDeckWithDecor);
  window.addEventListener('load', alignDeckWithDecor);

  // Section 04: How We Work - 6 Steps Interactive Deck
  function initStepsDeck() {
    const cards = document.querySelectorAll('.steps-card-item');
    const dots = document.querySelectorAll('.steps-dot');
    const controls = document.querySelector('.steps-controls');
    let currentIndex = 0;

    if (!cards.length || !dots.length) return;

    function updateDeck(activeIndex) {
      currentIndex = activeIndex;

      // Update active state on dots
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      // Update dot section step for smooth upward/return animation
      if (controls) {
        controls.style.setProperty('--step-dot', activeIndex);
      }

      // Update cards: cards before activeIndex peel off to the bottom-left;
      // remaining cards stay in their fixed stacked positions (last card stays anchored!)
      cards.forEach((card, idx) => {
        card.classList.remove('is-dropped', 'is-dropped-far');

        if (idx < activeIndex) {
          if (activeIndex - idx > 1) {
            card.classList.add('is-dropped-far');
          } else {
            card.classList.add('is-dropped');
          }
          card.setAttribute('aria-hidden', 'true');
        } else {
          card.setAttribute('aria-hidden', idx === activeIndex ? 'false' : 'true');
        }
      });
    }

    // Attach click events to dots
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.getAttribute('data-step'), 10);
        if (!isNaN(targetIndex) && targetIndex !== currentIndex) {
          updateDeck(targetIndex);
        }
      });
    });

    // Allow clicking cards to slide through the deck (cycle forward and loop back up)
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (idx === currentIndex) {
          const nextIndex = (currentIndex + 1) % cards.length;
          updateDeck(nextIndex);
        } else if (idx > currentIndex) {
          updateDeck(idx);
        }
      });
    });

    const stepsStackedDeck = document.querySelector('.steps-stacked-deck');
    if (stepsStackedDeck) {
      stepsStackedDeck.addEventListener('click', (e) => {
        if (e.target === stepsStackedDeck) {
          const nextIndex = (currentIndex + 1) % cards.length;
          updateDeck(nextIndex);
        }
      });
    }

    // Initialize deck with first step active (all 6 cards present)
    updateDeck(0);
  }

  initStepsDeck();

  // Section 05: Nine Disciplines Interactive Showcase
  function initDisciplinesShowcase() {
    const buttons = document.querySelectorAll('.discipline-btn');
    const cards = document.querySelectorAll('.discipline-card');
    let currentIndex = 0;

    if (!buttons.length || !cards.length) return;

    function updateDiscipline(targetIndex) {
      currentIndex = targetIndex;

      // Update active state on buttons
      buttons.forEach((btn, idx) => {
        if (idx === targetIndex) {
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        }
      });

      // Update active state on cards
      cards.forEach((card, idx) => {
        if (idx === targetIndex) {
          card.classList.add('active');
          card.setAttribute('aria-hidden', 'false');
        } else {
          card.classList.remove('active');
          card.setAttribute('aria-hidden', 'true');
        }
      });
    }

    // Attach click events to numbered buttons
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetIndex = parseInt(btn.getAttribute('data-discipline'), 10);
        if (!isNaN(targetIndex) && targetIndex !== currentIndex) {
          updateDiscipline(targetIndex);
        }
      });
    });

    // Initialize with first discipline active
    updateDiscipline(0);
  }

  initDisciplinesShowcase();

  // Section 07: Testimonials Showcase Carousel
  function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrevBtn');
    const nextBtn = document.getElementById('testimonialNextBtn');
    const cards = document.querySelectorAll('.testimonial-card');
    if (!track || !prevBtn || !nextBtn || !cards.length) return;

    let currentSlide = 0;
    const totalCards = cards.length;

    function getStep() {
      const card = cards[0];
      const gap = parseFloat(window.getComputedStyle(track).gap) || 40;
      return card.offsetWidth + gap;
    }

    function updateSlider(animate = true) {
      if (!animate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
      }
      const step = getStep();
      track.style.transform = `translateX(-${currentSlide * step}px)`;

      // Hide any cards that have slid to the left of the active view
      cards.forEach((card, idx) => {
        if (idx < currentSlide) {
          card.classList.add('is-passed');
        } else {
          card.classList.remove('is-passed');
        }
      });
    }

    nextBtn.addEventListener('click', () => {
      if (currentSlide < totalCards - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = totalCards - 1;
      }
      updateSlider();
    });

    // Touch swipe support for mobile
    let startX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 50) {
        if (currentSlide < totalCards - 1) currentSlide++;
        else currentSlide = 0;
        updateSlider();
      } else if (diff < -50) {
        if (currentSlide > 0) currentSlide--;
        else currentSlide = totalCards - 1;
        updateSlider();
      }
    }, { passive: true });

    // Handle resize
    window.addEventListener('resize', () => {
      updateSlider(false);
    });

    // Initialize
    updateSlider(false);
  }

  initTestimonialSlider();

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Floating Scroll to Top ---------- */
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    const handleScrollTopVisibility = () => {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    };

    window.addEventListener("scroll", handleScrollTopVisibility, { passive: true });
    handleScrollTopVisibility();

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ---------- Hero Scroll Zoom-Out & 3D Logo Reveal (as per Blissmoney.zip) ---------- */
  const heroScroll = document.getElementById("heroScroll");
  if (heroScroll) {
    let targetP = 0;
    let currentP = 0;
    let isRunning = false;

    const applyProgress = (p) => {
      heroScroll.style.setProperty("--p", p.toFixed(4));

      // Phase 1 (0.0 to 0.45): Text smoothly fades out, circle & 3D logo glide to exact center
      const centerT = Math.min(1, Math.max(0, p / 0.45));
      const centerMove = centerT * centerT * (3 - 2 * centerT);
      heroScroll.style.setProperty("--center-move", centerMove.toFixed(4));

      if (centerMove > 0.6) {
        heroScroll.classList.add("is-scrolled");
      } else {
        heroScroll.classList.remove("is-scrolled");
      }

      // Phase 2 (0.45 to 0.65): Showcase 2nd uploaded image state in center

      // Phase 3 (0.65 to 1.0): Shrink hero layout dimension ("layout dimension chhota hoga")
      const shrinkRaw = Math.min(1, Math.max(0, (p - 0.65) / 0.35));
      const shrinkP = shrinkRaw * shrinkRaw * (3 - 2 * shrinkRaw);
      heroScroll.style.setProperty("--shrink-p", shrinkP.toFixed(4));

      // Trigger header background when 2nd uploaded section starts moving up (p >= 0.90)
      const siteHeaderEl = document.getElementById("siteHeader");
      if (siteHeaderEl) {
        if (p >= 0.90) {
          siteHeaderEl.classList.add("is-scrolled");
        } else {
          siteHeaderEl.classList.remove("is-scrolled");
        }
      }
    };

    const tick = () => {
      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0005) {
        currentP += diff * 0.18;
        applyProgress(currentP);
        requestAnimationFrame(tick);
      } else {
        currentP = targetP;
        applyProgress(currentP);
        isRunning = false;
      }
    };

    const updateTarget = (immediate = false) => {
      const rect = heroScroll.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      targetP = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      if (immediate) {
        currentP = targetP;
        applyProgress(currentP);
        isRunning = false;
        return;
      }
      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", () => updateTarget(false), { passive: true });
    window.addEventListener("resize", () => updateTarget(true));
    updateTarget(true);
  }

  /* ---------- Fixed Site Header & Interactive Dropdown Menu ---------- */
  function initSiteHeader() {
    const siteHeader = document.getElementById("siteHeader");
    const siteMenuWrap = document.getElementById("siteMenuWrap");
    const siteMenuBtn = document.getElementById("siteMenuBtn");
    const siteMenuBtnInside = document.getElementById("siteMenuBtnInside");
    const siteMenuDropdown = document.getElementById("siteMenuDropdown");

    if (!siteHeader || !siteMenuWrap) return;

    // Toggle dropdown open/close state on click
    const toggleMenu = (forceState) => {
      const willOpen = typeof forceState === "boolean" ? forceState : !siteMenuWrap.classList.contains("is-open");
      if (willOpen) {
        siteMenuWrap.classList.add("is-open");
        if (siteMenuBtn) siteMenuBtn.setAttribute("aria-expanded", "true");
      } else {
        siteMenuWrap.classList.remove("is-open");
        if (siteMenuBtn) siteMenuBtn.setAttribute("aria-expanded", "false");
      }
    };

    if (siteMenuBtn) {
      siteMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
      });
    }

    if (siteMenuBtnInside) {
      siteMenuBtnInside.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu(false);
      });
    }

    // Close when clicking outside of the menu wrapper
    document.addEventListener("click", (e) => {
      if (siteMenuWrap.classList.contains("is-open") && !siteMenuWrap.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close when pressing the Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && siteMenuWrap.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });

    // Close menu when clicking on any navigation link
    if (siteMenuDropdown) {
      const navLinks = siteMenuDropdown.querySelectorAll(".site-nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          toggleMenu(false);
        });
      });
    }

    // Dynamic Header Background: translucent white with frosted blur
    // Triggered precisely when the 2nd uploaded section (shrunken hero card) starts scrolling up
    const updateHeaderBackground = () => {
      const heroScroll = document.querySelector(".hero-scroll");
      if (heroScroll) {
        const rect = heroScroll.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        // Trigger background when hero card shrink completes and starts moving up out of view
        const isUp = range > 0 ? (-rect.top >= range * 0.90) : (window.scrollY > 120);
        if (isUp) {
          siteHeader.classList.add("is-scrolled");
        } else {
          siteHeader.classList.remove("is-scrolled");
        }
      } else {
        if (window.scrollY > 80) {
          siteHeader.classList.add("is-scrolled");
        } else {
          siteHeader.classList.remove("is-scrolled");
        }
      }
    };

    window.addEventListener("scroll", updateHeaderBackground, { passive: true });
    window.addEventListener("resize", updateHeaderBackground);
    updateHeaderBackground();
  }

  initSiteHeader();

  /* ---------- Section 03: Accordion (Five pillars framework from Blissmoney.zip) ---------- */
  function initPillarsAccordion() {
    const accHeads = document.querySelectorAll(".acc-head");
    if (!accHeads.length) return;

    accHeads.forEach((head) => {
      head.addEventListener("click", () => {
        head.blur();
        const expanded = head.getAttribute("aria-expanded") === "true";
        accHeads.forEach((h) => {
          h.setAttribute("aria-expanded", "false");
          const b = h.nextElementSibling;
          if (b) b.style.maxHeight = null;
        });
        if (!expanded) {
          head.setAttribute("aria-expanded", "true");
          const body = head.nextElementSibling;
          if (body) {
            body.style.maxHeight = body.scrollHeight + "px";
          }
        }
      });
    });

    // Handle window resize dynamically adjusting open accordion max-height
    window.addEventListener("resize", () => {
      const activeHead = document.querySelector('.acc-head[aria-expanded="true"]');
      if (activeHead && activeHead.nextElementSibling) {
        activeHead.nextElementSibling.style.maxHeight = activeHead.nextElementSibling.scrollHeight + "px";
      }
    });
  }

  initPillarsAccordion();
});



