/**
 * BlissMoney - Interactive Stacked Cards Deck
 * Progressive peel-off downward animation on dot navigation:
 * - Dot 1: 4 cards visible (1st active + 3 behind)
 * - Dot 2: Card 1 slides down, 3 cards left (2nd active + 2 behind)
 * - Dot 3: Card 2 slides down, 2 cards left (3rd active + 1 behind)
 * - Dot 4: Card 3 slides down, 4th card remains alone
 */

document.addEventListener('DOMContentLoaded', () => {
  // Section 01: Who We Serve - Interactive Stacked Deck
  function initWhoWeServeDeck() {
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
  }

  initWhoWeServeDeck();

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

  // Section 05: Morphing vector overlay for the nine discipline cards.
  // Geometry is in each original stroke artwork's pixel space (w x h), placed like
  // object-fit: contain anchored right-center; "tall" scales to 194% of stage height.
  // c: circles [cx, cy, r] | l: lines [x1, y1, x2, y2] | d: dots [x, y]
  const DISCIPLINE_GEOMS = [
    { w: 1357, h: 815, c: [[950, 406, 407], [117, 406, 116]], l: [[233, 406, 950, 406], [950, 406, 950, 815]], d: [[233, 406], [950, 406]] },
    { w: 1164, h: 793, c: [[608, 340, 213]], l: [[8, 127, 608, 127], [608, 0, 608, 793], [608, 553, 1164, 553], [8, 127, 8, 793]], d: [[608, 127], [8, 468]] },
    { w: 1104, h: 818, c: [[1095, 409, 409], [415, 407, 270]], l: [[0, 407, 1104, 407]], d: [[686, 407], [8, 407]] },
    { w: 1178, h: 923, c: [[345, 901, 345], [985, 364, 192]], l: [[360, 556, 1178, 0], [360, 556, 985, 556]], d: [[360, 556], [876, 208]] },
    { w: 1096, h: 1598, tall: true, c: [[529, 529, 397], [700, 1201, 297]], l: [[529, 521, 674, 1088]], d: [[529, 521]] },
    { w: 887, h: 843, c: [[486, 457, 273], [64, 775, 45]], l: [[884, 184, 64, 778], [486, 0, 486, 820], [486, 184, 884, 184]], d: [[486, 184], [227, 662]] },
    { w: 1526, h: 815, c: [[1118, 406, 407], [117, 406, 116]], l: [[233, 406, 1112, 406], [1112, 406, 1112, 815]], d: [[233, 406], [1112, 406]] },
    { w: 1162, h: 797, c: [[602, 342, 214]], l: [[0, 128, 602, 128], [602, 0, 602, 797], [602, 556, 1162, 556]], d: [[602, 128], [24, 128]] },
    { w: 1275, h: 818, c: [[1092, 409, 409], [414, 407, 270]], l: [[8, 407, 812, 407]], d: [[8, 407]] }
  ];

  function createDisciplineGeometry(svg, stage) {
    const NS = 'http://www.w3.org/2000/svg';
    const POOL = { c: 2, l: 4, d: 2 };
    const DOT_R = 8;
    const DURATION = 1000;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const els = { c: [], l: [], d: [] };
    ['c', 'l', 'd'].forEach((type) => {
      for (let i = 0; i < POOL[type]; i++) {
        const el = document.createElementNS(NS, type === 'l' ? 'line' : 'circle');
        el.setAttribute('class', type === 'd' ? 'geom-dot' : 'geom-stroke');
        svg.appendChild(el);
        els[type].push(el);
      }
    });

    let current = null;
    let targetIndex = 0;
    let rafId = 0;

    // Map one card's artwork geometry into stage pixels; unused pool slots come back as null
    function layoutFor(index) {
      const g = DISCIPLINE_GEOMS[index];
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const k = g.tall ? (H * 1.94) / g.h : Math.min(W / g.w, H / g.h);
      const ox = W - g.w * k;
      const oy = (H - g.h * k) / 2;
      const X = (x) => ox + x * k;
      const Y = (y) => oy + y * k;
      const pad = (arr, n, fn) => Array.from({ length: n }, (_, i) => (arr[i] ? fn(arr[i]) : null));
      return {
        c: pad(g.c, POOL.c, ([cx, cy, r]) => ({ cx: X(cx), cy: Y(cy), r: r * k, o: 1 })),
        l: pad(g.l, POOL.l, ([x1, y1, x2, y2]) => ({ x1: X(x1), y1: Y(y1), x2: X(x2), y2: Y(y2), o: 1 })),
        d: pad(g.d, POOL.d, ([x, y]) => ({ cx: X(x), cy: Y(y), r: Math.max(3, DOT_R * k), o: 1 }))
      };
    }

    // Hidden state of a shape: circles/dots shrink to their centre, lines retract to their start
    function collapse(type, s) {
      if (type === 'l') return { x1: s.x1, y1: s.y1, x2: s.x1, y2: s.y1, o: 0 };
      return { cx: s.cx, cy: s.cy, r: 0, o: 0 };
    }

    function render(state) {
      ['c', 'l', 'd'].forEach((type) => {
        state[type].forEach((s, i) => {
          const el = els[type][i];
          if (type === 'l') {
            el.setAttribute('x1', s.x1.toFixed(2));
            el.setAttribute('y1', s.y1.toFixed(2));
            el.setAttribute('x2', s.x2.toFixed(2));
            el.setAttribute('y2', s.y2.toFixed(2));
          } else {
            el.setAttribute('cx', s.cx.toFixed(2));
            el.setAttribute('cy', s.cy.toFixed(2));
            el.setAttribute('r', Math.max(0, s.r).toFixed(2));
          }
          el.style.opacity = s.o.toFixed(3);
        });
      });
    }

    // Resolve null slots against the other side so every shape has a start and end
    function resolve(from, to) {
      const start = { c: [], l: [], d: [] };
      const end = { c: [], l: [], d: [] };
      ['c', 'l', 'd'].forEach((type) => {
        for (let i = 0; i < POOL[type]; i++) {
          const a = from[type][i];
          const b = to[type][i];
          if (b) {
            end[type][i] = b;
            start[type][i] = a && a.o > 0.001 ? a : collapse(type, b);
          } else {
            start[type][i] = a;
            end[type][i] = collapse(type, a);
          }
        }
      });
      return { start, end };
    }

    function lerpState(a, b, t) {
      const out = { c: [], l: [], d: [] };
      ['c', 'l', 'd'].forEach((type) => {
        a[type].forEach((sa, i) => {
          const sb = b[type][i];
          const o = {};
          Object.keys(sb).forEach((key) => { o[key] = sa[key] + (sb[key] - sa[key]) * t; });
          out[type][i] = o;
        });
      });
      return out;
    }

    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    // First frame: nothing visible yet, so seed every slot as collapsed
    function emptyState(layout) {
      const st = { c: [], l: [], d: [] };
      ['c', 'l', 'd'].forEach((type) => {
        layout[type].forEach((s, i) => {
          st[type][i] = collapse(type, s || { cx: 0, cy: 0, x1: 0, y1: 0 });
        });
      });
      return st;
    }

    function morphTo(index) {
      targetIndex = index;
      const to = layoutFor(index);
      if (!current) current = emptyState(to);
      const { start, end } = resolve(current, to);
      cancelAnimationFrame(rafId);

      if (reduceMotion) {
        current = end;
        render(current);
        return;
      }

      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / DURATION);
        current = lerpState(start, end, ease(t));
        render(current);
        if (t < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    }

    // Snap to the active card's geometry when the stage resizes
    function relayout() {
      cancelAnimationFrame(rafId);
      const to = layoutFor(targetIndex);
      current = resolve(current || emptyState(to), to).end;
      render(current);
    }

    return { morphTo, relayout };
  }

  // Section 05: Nine Disciplines Interactive Showcase
  function initDisciplinesShowcase() {
    const buttons = document.querySelectorAll('.discipline-btn');
    const cards = document.querySelectorAll('.discipline-card');
    let currentIndex = 0;

    if (!buttons.length || !cards.length) return;

    const geomSvg = document.querySelector('.discipline-geom');
    const geom = geomSvg ? createDisciplineGeometry(geomSvg, geomSvg.parentElement) : null;

    function updateDiscipline(targetIndex) {
      currentIndex = targetIndex;
      if (geom) geom.morphTo(targetIndex);

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

    // Scroll-pinned stepping: stickyBox sticks while each scroll step advances one card
    const scroller = document.getElementById('disciplinesScroll');
    const stickyBox = scroller ? (scroller.querySelector('.disciplines-sticky-box') || scroller) : null;
    let stepPx = 0;
    let pinTop = 0;
    let clickLockUntil = 0;

    function layoutPin() {
      if (!scroller || !stickyBox) return;
      const section = scroller.closest('.disciplines-section') || scroller.parentElement;
      const stage = scroller.querySelector('.disciplines-stage');
      stepPx = Math.max(260, Math.round(window.innerHeight * 0.55));
      const boxHeight = stage ? stage.offsetHeight : (stickyBox.offsetHeight || 500);

      // Vertically center the showcase card in the viewport
      pinTop = Math.max(10, Math.round((window.innerHeight - boxHeight) / 2));
      stickyBox.style.setProperty('--disciplines-pin-top', pinTop + 'px');

      // Pin through cards 1 to 9 (indices 0 to 8), then smoothly unpin right after card 9
      scroller.style.height = (boxHeight + stepPx * (cards.length - 1 + 0.6)) + 'px';

      // Ensure bottom clearance so next section stays below the viewport when card unpins
      if (section) {
        const bottomClearance = Math.max(120, window.innerHeight - pinTop - boxHeight + 80);
        section.style.paddingBottom = bottomClearance + 'px';
      }
    }

    function syncToScroll() {
      if (!scroller || !stepPx || Date.now() < clickLockUntil) return;
      const scrolled = pinTop - scroller.getBoundingClientRect().top;
      const idx = Math.min(cards.length - 1, Math.max(0, Math.floor(scrolled / stepPx)));
      if (idx !== currentIndex) updateDiscipline(idx);
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncToScroll();
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener('resize', () => {
      layoutPin();
      syncToScroll();
      if (geom) geom.relayout();
    });

    // Numbered buttons scroll to the matching step so scroll position and card stay in sync
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetIndex = parseInt(btn.getAttribute('data-discipline'), 10);
        if (isNaN(targetIndex) || targetIndex === currentIndex) return;
        if (scroller && stepPx) {
          // Skip intermediate cards while the smooth scroll travels to the target step
          clickLockUntil = Date.now() + 900;
          const scrollerTop = scroller.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: scrollerTop - pinTop + (targetIndex + 0.2) * stepPx,
            behavior: 'smooth'
          });
        }
        updateDiscipline(targetIndex);
      });
    });

    // Initialize with first discipline active
    updateDiscipline(0);
    layoutPin();
    syncToScroll();
    window.addEventListener('load', () => {
      layoutPin();
      syncToScroll();
      if (geom) geom.relayout();
    });
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

    // Update submenu active state helper (syncs classes for mobile width expansion)
    const updateSubmenuState = () => {
      if (!siteMenuDropdown) return;
      const hasOpenSubmenu = !!siteMenuDropdown.querySelector(".has-submenu.is-open") ||
                             !!siteMenuDropdown.querySelector(".has-submenu.is-open-mobile");
      siteMenuDropdown.classList.toggle("has-submenu-open", hasOpenSubmenu);
      siteMenuWrap.classList.toggle("has-submenu-open", hasOpenSubmenu);
    };

    // Toggle dropdown open/close state on click (disabled when dropdown is hidden)
    const toggleMenu = (forceState) => {
      if (!siteMenuDropdown || window.getComputedStyle(siteMenuDropdown).display === "none") {
        return;
      }
      const willOpen = typeof forceState === "boolean" ? forceState : !siteMenuWrap.classList.contains("is-open");
      if (willOpen) {
        siteMenuWrap.classList.add("is-open");
        siteHeader.classList.add("menu-is-open");
        document.body.classList.add("menu-is-open");
        if (siteMenuBtn) siteMenuBtn.setAttribute("aria-expanded", "true");
      } else {
        siteMenuWrap.classList.remove("is-open");
        siteHeader.classList.remove("menu-is-open");
        document.body.classList.remove("menu-is-open");
        if (siteMenuBtn) siteMenuBtn.setAttribute("aria-expanded", "false");
        // Reset and close any open submenus
        if (siteMenuDropdown) {
          siteMenuDropdown.querySelectorAll(".has-submenu").forEach((item) => {
            item.classList.remove("is-open", "is-open-mobile");
            const parentLink = item.querySelector(".site-nav-link-parent");
            if (parentLink) parentLink.setAttribute("aria-expanded", "false");
          });
          updateSubmenuState();
        }
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
      if (siteMenuWrap.classList.contains("is-open")) {
        if (!siteMenuWrap.contains(e.target)) {
          toggleMenu(false);
        } else {
          // If clicking inside menu wrap but outside any submenu item, close open submenus
          const insideSubmenu = e.target.closest(".has-submenu") || e.target.closest(".site-submenu-box");
          if (!insideSubmenu && siteMenuDropdown) {
            siteMenuDropdown.querySelectorAll(".has-submenu").forEach((item) => {
              item.classList.remove("is-open", "is-open-mobile");
              const parentLink = item.querySelector(".site-nav-link-parent");
              if (parentLink) parentLink.setAttribute("aria-expanded", "false");
            });
            updateSubmenuState();
          }
        }
      }
    });

    // Close when pressing the Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && siteMenuWrap.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });

    // Navigation link handling: smooth scroll for in-page anchors, instant close & navigate for pages
    if (siteMenuDropdown) {
      const navLinks = siteMenuDropdown.querySelectorAll(".site-nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href") || "";

          // Submenu toggle for parent items (About, Services, Clients, Insights)
          // Opens on click, closes on second click (toggle), does not trigger on hover
          if (link.classList.contains("site-nav-link-parent")) {
            e.preventDefault();
            e.stopPropagation();
            const parentItem = link.closest(".has-submenu");
            if (parentItem) {
              const isOpen = parentItem.classList.contains("is-open") || parentItem.classList.contains("is-open-mobile");
              
              // Close any other open submenus first
              siteMenuDropdown.querySelectorAll(".has-submenu").forEach((item) => {
                item.classList.remove("is-open", "is-open-mobile");
                const pLink = item.querySelector(".site-nav-link-parent");
                if (pLink) pLink.setAttribute("aria-expanded", "false");
              });

              // If it was not open, open it now
              if (!isOpen) {
                parentItem.classList.add("is-open", "is-open-mobile");
                link.setAttribute("aria-expanded", "true");
              }
              updateSubmenuState();
            }
            return;
          }

          // Consultation modal trigger
          if (link.getAttribute("data-open-consultation") === "true" || href === "#consultationModal") {
            e.preventDefault();
            toggleMenu(false);
            if (window.openConsultationModal) {
              window.openConsultationModal();
            }
            return;
          }

          // Client Portal modal trigger
          if (link.getAttribute("data-open-portal") === "true" || href === "#portal" || href === "#portalModal") {
            e.preventDefault();
            toggleMenu(false);
            if (window.openPortalModal) {
              window.openPortalModal();
            }
            return;
          }

          // Top / Hero scroll
          if (href === "#hero" || href === "#top") {
            e.preventDefault();
            toggleMenu(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            if (history.pushState) {
              history.pushState(null, null, window.location.pathname);
            }
            return;
          }

          // In-page hash link on the current page (e.g. #who-we-serve, #how-we-work, etc.)
          if (href.startsWith("#") && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              toggleMenu(false);
              const headerOffset = 70;
              const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({
                top: Math.max(0, targetY),
                behavior: "smooth"
              });
              if (history.pushState) {
                history.pushState(null, null, href);
              }
              return;
            }
          }

          // In-page link formatted as index.html#... when already on index.html
          const isHomePage = !!document.getElementById("heroScroll");
          if (isHomePage && href.includes("#") && href.startsWith("index.html#")) {
            const hash = href.substring(href.indexOf("#"));
            const target = document.querySelector(hash);
            if (target) {
              e.preventDefault();
              toggleMenu(false);
              const headerOffset = 70;
              const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({
                top: Math.max(0, targetY),
                behavior: "smooth"
              });
              if (history.pushState) {
                history.pushState(null, null, hash);
              }
              return;
            }
          }

          // For external pages (e.g. calculator.html, blog.html), close menu and let browser navigate
          toggleMenu(false);
        });
      });

      // Submenu item link handling: ensure menu closes when an about submenu link is clicked
      const subItems = siteMenuDropdown.querySelectorAll(".submenu-box-item");
      subItems.forEach((subItem) => {
        subItem.addEventListener("click", () => {
          toggleMenu(false);
        });
      });
    }

    // Logo click: on the homepage, scroll smoothly to top; on all other pages, navigate to index.html
    const siteLogo = document.querySelector(".site-logo");
    if (siteLogo) {
      siteLogo.addEventListener("click", (e) => {
        const isHomePage = !!document.getElementById("heroScroll");
        if (isHomePage) {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          if (history.pushState) {
            history.pushState(null, null, window.location.pathname);
          }
        }
        // On other pages (menu pages, inner pages, blog, etc.), default navigation to index.html takes place!
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
        if (window.scrollY > 20) {
          siteHeader.classList.add("is-scrolled");
          siteHeader.classList.remove("scrolled");
        } else {
          siteHeader.classList.remove("is-scrolled");
          siteHeader.classList.remove("scrolled");
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

  /* ---------- Consultation Booking Modal Controller ---------- */
  function initConsultationModal() {
    const modal = document.getElementById("consultationModal");
    if (!modal) return;

    const closeBtn = document.getElementById("closeConsultModal");
    const form = document.getElementById("consultationForm");
    const successState = document.getElementById("consultSuccessState");
    const successCloseBtn = document.getElementById("successCloseBtn");
    const successSummary = document.getElementById("successSummaryText");

    const openModal = () => {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const nameInput = document.getElementById("consultName");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 150);
      }
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      // Reset form and state after close transition
      setTimeout(() => {
        if (form && successState) {
          form.style.display = "flex";
          successState.style.display = "none";
          form.reset();
        }
      }, 300);
    };

    window.openConsultationModal = openModal;

    // Attach to all consultation triggers across the page
    const triggers = document.querySelectorAll(
      '[data-open-consultation="true"], #btn-book-consultation, #btn-consult-open, .sidebar-cta-btn, a[href="#consultationModal"]'
    );
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });

    // Document-level event delegation for 100% click capture reliability
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(
        '[data-open-consultation="true"], #btn-book-consultation, #btn-consult-open, .sidebar-cta-btn, a[href="#consultationModal"]'
      );
      if (trigger) {
        e.preventDefault();
        openModal();
      }
    });

    // Auto-open modal if URL hash or query requests it
    if (
      window.location.hash === "#book-consultation" ||
      window.location.hash === "#consultationModal" ||
      window.location.search.includes("consultation=open") ||
      window.location.search.includes("openConsultation=true")
    ) {
      setTimeout(openModal, 300);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (successCloseBtn) {
      successCloseBtn.addEventListener("click", closeModal);
    }

    // Close when clicking on backdrop
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Handle consultation form submission
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById("consultSubmitBtn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Submitting Request...";
        }

        const nameVal = document.getElementById("consultName")?.value || "there";
        const phoneVal = document.getElementById("consultPhone")?.value || "";

        // Simulated high-end submission feedback
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Confirm Consultation Request";
          }
          if (form && successState) {
            form.style.display = "none";
            successState.style.display = "flex";
            if (successSummary) {
              successSummary.textContent = `Thank you, ${nameVal}! Our Senior Wealth Advisory team has received your request and will reach out to you at ${phoneVal || "your provided contact"} within 24 business hours.`;
            }
          }
        }, 600);
      });
    }
  }

  // Client Login / Portal Modal handler
  function initPortalModal() {
    function createPortalModal() {
      let modal = document.getElementById("portalModal");
      if (modal) return modal;
      modal = document.createElement("div");
      modal.className = "consult-modal-backdrop";
      modal.id = "portalModal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "portalTitle");
      modal.innerHTML = `
        <div class="consult-modal-container" style="max-width: 480px;">
          <button type="button" class="consult-modal-close" id="closePortalModal" aria-label="Close portal modal">&times;</button>
          <div class="consult-modal-header" style="text-align: center;">
            <span class="consult-modal-badge">Investor Access</span>
            <h3 class="consult-modal-title" id="portalTitle" style="margin-top: 8px;">Login / Client Portal</h3>
            <p class="consult-modal-subtitle">Secure portfolio dashboard & advisory access for BlissMoney private clients.</p>
          </div>
          <form class="consult-modal-form" id="portalLoginForm" style="margin-top: 18px;">
            <div class="form-row">
              <div class="form-group" style="width: 100%;">
                <label for="portalClientUser">Client ID / Registered Email</label>
                <input type="text" id="portalClientUser" placeholder="e.g. client@blissmoney.in" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group" style="width: 100%;">
                <label for="portalClientPass">Access PIN / Password</label>
                <input type="password" id="portalClientPass" placeholder="••••••••" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 8px; justify-content: center;">Sign In to Portal</button>
            <div id="portalNotice" style="display: none; margin-top: 14px; padding: 12px 14px; background: rgba(12, 175, 128, 0.12); border: 1px solid rgba(12, 175, 128, 0.4); border-radius: 8px; font-size: 0.85rem; color: #D1E3DC; line-height: 1.5; text-align: center;">
              Client onboarding is currently by private invitation. For immediate portfolio inquiries or access credentials, please connect with your advisory team:
              <div style="margin-top: 10px; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                <a href="https://wa.me/916364833952" target="_blank" class="btn btn-sm btn-outline" style="font-size: 0.8rem; padding: 6px 12px; color: #0CAF80; border-color: rgba(12, 175, 128, 0.5);">WhatsApp Advisory</a>
                <a href="mailto:hello@blissmoney.in" class="btn btn-sm btn-outline" style="font-size: 0.8rem; padding: 6px 12px; color: #0CAF80; border-color: rgba(12, 175, 128, 0.5);">Email Support</a>
              </div>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector("#closePortalModal");
      if (closeBtn) closeBtn.addEventListener("click", window.closePortalModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closePortalModal();
      });

      const form = modal.querySelector("#portalLoginForm");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const notice = modal.querySelector("#portalNotice");
          if (notice) notice.style.display = "block";
        });
      }
      return modal;
    }

    window.openPortalModal = function() {
      const modal = createPortalModal();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const userInput = modal.querySelector("#portalClientUser");
      if (userInput) setTimeout(() => userInput.focus(), 150);
    };

    window.closePortalModal = function() {
      const modal = document.getElementById("portalModal");
      if (!modal) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modal = document.getElementById("portalModal");
        if (modal && modal.classList.contains("is-open")) {
          window.closePortalModal();
        }
      }
    });

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest('[data-open-portal="true"], a[href="#portal"], a[href="#portalModal"]');
      if (trigger) {
        e.preventDefault();
        window.openPortalModal();
      }
    });
  }

  initConsultationModal();
  initPortalModal();
});



