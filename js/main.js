/* ============================================================
   BlissMoney — Homepage interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  // Indian currency formatting (₹, lakh/crore grouping)
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  const inrShort = (n) => {
    if (n >= 1e7)
      return "₹" + (n / 1e7).toFixed(2).replace(/\.00$/, "") + " Cr";
    if (n >= 1e5) return "₹" + (n / 1e5).toFixed(2).replace(/\.00$/, "") + " L";
    return inr(n);
  };

  /* ---------- Hero video autoplay insurance ---------- */
  const heroVideo = $(".hero-video");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    const tryPlay = () => {
      const p = heroVideo.play();
      if (p !== undefined) {
        p.catch(() => {
          window.addEventListener("click", () => heroVideo.play(), {
            once: true,
          });
          window.addEventListener("touchstart", () => heroVideo.play(), {
            once: true,
          });
        });
      }
    };
    tryPlay();
  }

  /* ---------- Header: scrolled state + hide on scroll down ---------- */
  const header = $("#siteHeader");
  let lastY = 0;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 40);
      header.classList.toggle(
        "hidden",
        y > 400 && y > lastY && !$("#mobileMenu").classList.contains("open"),
      );
      lastY = y;
    },
    { passive: true },
  );

  /* ---------- Mobile menu ---------- */
  const toggle = $("#navToggle");
  const menu = $("#mobileMenu");
  const setMenu = (open) => {
    toggle.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () =>
    setMenu(!menu.classList.contains("open")),
  );
  $$("#mobileMenu a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false)),
  );

  /* ---------- Mobile submenu accordions ---------- */
  $$(".m-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".m-item");
      const sub = item.querySelector(".m-sub");
      const open = item.classList.contains("open");
      // close others
      $$(".m-item.open").forEach((it) => {
        it.classList.remove("open");
        it.querySelector(".m-toggle")?.setAttribute("aria-expanded", "false");
        const s = it.querySelector(".m-sub");
        if (s) s.style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        sub.style.maxHeight = sub.scrollHeight + "px";
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Animated counters (stat band) ---------- */
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        counterIO.unobserve(e.target);
        const el = e.target;
        const target = +el.dataset.count;
        const t0 = performance.now();
        const dur = 1200;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.textContent = val < 10 ? `0${val}` : `${val}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.3 },
  );
  $$(".stat-num").forEach((el) => {
    el.textContent = "00";
    counterIO.observe(el);
  });

  /* ---------- Accordion (Five pillars) ---------- */
  $$(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      head.blur();
      const expanded = head.getAttribute("aria-expanded") === "true";
      $$(".acc-head").forEach((h) => {
        h.setAttribute("aria-expanded", "false");
        h.nextElementSibling.style.maxHeight = null;
      });
      if (!expanded) {
        head.setAttribute("aria-expanded", "true");
        const body = head.nextElementSibling;
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
  // open first by default
  const firstAcc = $(".acc-head");
  if (firstAcc)
    firstAcc.nextElementSibling.style.maxHeight =
      firstAcc.nextElementSibling.scrollHeight + "px";

  /* ---------- Calculator tabs ---------- */
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      $$(".calc-panel").forEach((p) => p.classList.remove("active"));
      $("#panel-" + tab.dataset.tab).classList.add("active");
    });
  });

  /* ---------- Range slider fill ---------- */
  const paintRange = (input) => {
    const min = +input.min,
      max = +input.max,
      val = +input.value;
    input.style.setProperty("--fill", ((val - min) / (max - min)) * 100 + "%");
  };
  $$('input[type="range"]').forEach((r) => {
    paintRange(r);
    r.addEventListener("input", () => paintRange(r));
  });

  /* ============================================================
     CALCULATORS
     ============================================================ */

  /* --- SIP / Financial --- */
  const sip = () => {
    const P = +$("#sipAmt").value;
    const yrs = +$("#sipYears").value;
    const rate = +$("#sipRate").value;
    const i = rate / 12 / 100;
    const n = yrs * 12;
    const fv = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = P * n;

    $("#sipAmtOut").textContent = inr(P);
    $("#sipYearsOut").textContent = yrs + " yrs";
    $("#sipRateOut").textContent = rate + "%";
    $("#sipFV").textContent = inrShort(fv);
    $("#sipInvested").textContent = inrShort(invested);
    $("#sipGains").textContent = inrShort(fv - invested);
    $("#sipBar").style.width =
      Math.min((invested / fv) * 100, 100).toFixed(1) + "%";
  };
  ["sipAmt", "sipYears", "sipRate"].forEach((id) =>
    $("#" + id).addEventListener("input", sip),
  );

  /* --- Risk planning (life cover gap) --- */
  const risk = () => {
    const exp = +$("#riskExp").value;
    const yrs = +$("#riskYears").value;
    const liab = +$("#riskLiab").value;
    const have = +$("#riskCover").value;
    const need = exp * yrs + liab;
    const gap = Math.max(need - have, 0);

    $("#riskExpOut").textContent = inr(exp);
    $("#riskYearsOut").textContent = yrs + " yrs";
    $("#riskLiabOut").textContent = inr(liab);
    $("#riskCoverOut").textContent = inr(have);
    $("#riskNeed").textContent = inrShort(need);
    $("#riskHave").textContent = inrShort(have);
    $("#riskGap").textContent = gap === 0 ? "Fully covered" : inrShort(gap);
    $("#riskBar").style.width =
      Math.min((have / need) * 100, 100).toFixed(1) + "%";
  };
  ["riskExp", "riskYears", "riskLiab", "riskCover"].forEach((id) =>
    $("#" + id).addEventListener("input", risk),
  );

  /* --- ROI / CAGR --- */
  const roi = () => {
    const start = +$("#roiStart").value;
    const end = +$("#roiEnd").value;
    const yrs = +$("#roiYears").value;
    const abs = ((end - start) / start) * 100;
    const cagr = (Math.pow(end / start, 1 / yrs) - 1) * 100;

    $("#roiStartOut").textContent = inrShort(start);
    $("#roiEndOut").textContent = inrShort(end);
    $("#roiYearsOut").textContent = yrs + " yrs";
    $("#roiCagr").textContent = (isFinite(cagr) ? cagr.toFixed(2) : "0") + "%";
    $("#roiAbs").textContent = abs.toFixed(1) + "%";
    $("#roiAbs").classList.toggle("pos", abs >= 0);
    $("#roiGain").textContent = inrShort(end - start);
    $("#roiBar").style.width = Math.max(Math.min(cagr * 4, 100), 2) + "%";
  };
  ["roiStart", "roiEnd", "roiYears"].forEach((id) =>
    $("#" + id).addEventListener("input", roi),
  );

  /* --- Mortgage / EMI --- */
  const emi = () => {
    const P = +$("#emiAmt").value;
    const rate = +$("#emiRate").value;
    const yrs = +$("#emiYears").value;
    const i = rate / 12 / 100;
    const n = yrs * 12;
    const m = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const total = m * n;

    $("#emiAmtOut").textContent = inrShort(P);
    $("#emiRateOut").textContent = rate.toFixed(2).replace(/\.00$/, "") + "%";
    $("#emiYearsOut").textContent = yrs + " yrs";
    $("#emiMonthly").textContent = inr(m);
    $("#emiInterest").textContent = inrShort(total - P);
    $("#emiTotal").textContent = inrShort(total);
    $("#emiBar").style.width = ((P / total) * 100).toFixed(1) + "%";
  };
  ["emiAmt", "emiRate", "emiYears"].forEach((id) =>
    $("#" + id).addEventListener("input", emi),
  );

  // initial paint
  sip();
  risk();
  roi();
  emi();

  /* ---------- Hero video autoplay safeguard ---------- */
  const heroVid = $(".hero-video");
  if (heroVid) {
    heroVid.play().catch(() => {});
  }

  /* ---------- GSAP & ScrollTrigger: Who We Serve Section Head ---------- */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const serveHead = $("#serve .section-head");
    const heading = $("#serve .section-head h2");
    const lede = $("#serve .section-head .lede");

    if (heading && lede) {
      // Split heading into word masks
      const childNodes = Array.from(heading.childNodes);
      heading.innerHTML = "";
      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = node.textContent.split(/(\s+)/);
          parts.forEach((part) => {
            if (part.trim().length > 0) {
              const mask = document.createElement("span");
              mask.className = "serve-word-mask";
              const word = document.createElement("span");
              word.className = "serve-word";
              word.textContent = part;
              mask.appendChild(word);
              heading.appendChild(mask);
            } else if (part.length > 0) {
              heading.appendChild(document.createTextNode(part));
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const mask = document.createElement("span");
          mask.className = "serve-word-mask";
          const word = document.createElement("span");
          word.className = "serve-word";
          word.innerHTML = node.outerHTML;
          mask.appendChild(word);
          heading.appendChild(mask);
        }
      });

      const words = heading.querySelectorAll(".serve-word");

      // Initial state
      gsap.set(words, {
        y: "115%",
        opacity: 0,
        rotateZ: 2,
      });
      gsap.set(lede, {
        y: 30,
        opacity: 0,
        filter: "blur(6px)",
      });

      // ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: serveHead,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(words, {
        y: "0%",
        opacity: 1,
        rotateZ: 0,
        duration: 1.05,
        stagger: 0.045,
        ease: "power4.out",
      }).to(
        lede,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.6",
      )
        .from(
          "#serve .serve-label, #serve .serve-meta",
          { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "<",
        )
        .add(() => heading.classList.add("is-marked"), "-=0.3");

      // Parallax scrub on continuous scroll through the section
      gsap.to(serveHead, {
        scrollTrigger: {
          trigger: "#serve",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -30,
        ease: "none",
      });
    }
  }

  /* ---------- Offerings Pinned Horizontal Scroll (Nine Disciplines) ---------- */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const pinStage = $("#offeringsPinStage");
    const track = $("#offeringsTrack");

    if (pinStage && track) {
      const getScrollDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth, 0);

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinStage,
          pin: true,
          start: "top top",
          end: () => "+=" + Math.max(getScrollDistance(), 600),
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Refresh on window load to ensure all images have resolved dimensions
      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
      });

      // Recalculate when late-loading images/fonts change layout.
      // (A ResizeObserver on <body> must NOT be used here: the pin spacer itself
      // changes body height, causing an endless refresh loop that leaves the
      // track stuck at a stale x-offset when scrolling back up.)
      let refreshTimeout;
      const queueRefresh = () => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      $$("img").forEach((img) => {
        if (!img.complete)
          img.addEventListener("load", queueRefresh, { once: true });
      });
      if (document.fonts && document.fonts.ready)
        document.fonts.ready.then(queueRefresh);
    }
  }

  /* ---------- Six Steps Process Carousel (#process) ---------- */
  const stepsTrack = $("#stepsTrack");
  const stepsPrev = $("#stepsPrev");
  const stepsNext = $("#stepsNext");
  const stepIndicators = $$(".step-indicator");

  if (stepsTrack) {
    const updateActiveStep = () => {
      const cards = $$(".step-card", stepsTrack);
      if (!cards.length) return;
      const cardWidth = cards[0].offsetWidth;
      if (cardWidth <= 0) return;
      const activeIdx = Math.min(
        Math.max(Math.round(stepsTrack.scrollLeft / cardWidth), 0),
        stepIndicators.length - 1,
      );
      stepIndicators.forEach((ind, i) => {
        ind.classList.toggle("active", i === activeIdx);
      });
    };

    stepsTrack.addEventListener("scroll", updateActiveStep, { passive: true });

    const scrollSteps = (direction) => {
      const firstCard = $(".step-card", stepsTrack);
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      stepsTrack.scrollBy({
        left: direction * cardWidth,
        behavior: "smooth",
      });
    };

    if (stepsPrev) {
      stepsPrev.addEventListener("click", () => scrollSteps(-1));
    }
    if (stepsNext) {
      stepsNext.addEventListener("click", () => scrollSteps(1));
    }

    stepIndicators.forEach((ind, idx) => {
      ind.addEventListener("click", () => {
        const cards = $$(".step-card", stepsTrack);
        if (cards[idx]) {
          cards[idx].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });
        }
      });
    });

    // Mouse drag to scroll
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    stepsTrack.addEventListener("mousedown", (e) => {
      isDown = true;
      stepsTrack.style.scrollBehavior = "auto";
      stepsTrack.style.scrollSnapType = "none";
      startX = e.pageX - stepsTrack.offsetLeft;
      scrollLeft = stepsTrack.scrollLeft;
    });

    const stopDrag = () => {
      if (isDown) {
        isDown = false;
        stepsTrack.style.scrollBehavior = "smooth";
        stepsTrack.style.scrollSnapType = "x mandatory";
      }
    };

    window.addEventListener("mouseup", stopDrag);
    stepsTrack.addEventListener("mouseleave", stopDrag);

    stepsTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - stepsTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      stepsTrack.scrollLeft = scrollLeft - walk;
    });
  }

  /* ---------- Hero scroll zoom-out ---------- */
  const heroScroll = $("#heroScroll");
  if (heroScroll) {
    const heroEl = $(".hero", heroScroll);
    const heroVisual = $(".hero-visual", heroScroll);
    let heroTicking = false;

    // Distance (layout px, unaffected by the scale transform) from the logo's
    // centre to the hero's centre.
    const measureHeroShift = () => {
      if (!heroEl || !heroVisual) return;
      heroVisual.style.left = "0px";
      heroVisual.style.top = "0px";
      let x = heroVisual.offsetWidth / 2;
      let y = heroVisual.offsetHeight / 2;
      for (let el = heroVisual; el && el !== heroEl; el = el.offsetParent) {
        x += el.offsetLeft;
        y += el.offsetTop;
      }
      heroVisual.style.left = "";
      heroVisual.style.top = "";
      heroScroll.style.setProperty("--shift-x", `${heroEl.clientWidth / 2 - x}px`);
      heroScroll.style.setProperty("--shift-y", `${heroEl.clientHeight / 2 - y}px`);
    };

    const updateHero = () => {
      heroTicking = false;
      const rect = heroScroll.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      heroScroll.style.setProperty("--p", p.toFixed(4));
      // Eased logo travel, arriving at centre slightly before the end
      const t = Math.min(1, p / 0.85);
      heroScroll.style.setProperty("--move", (t * t * (3 - 2 * t)).toFixed(4));
    };
    const queueHero = () => {
      if (!heroTicking) {
        heroTicking = true;
        requestAnimationFrame(updateHero);
      }
    };
    window.addEventListener("scroll", queueHero, { passive: true });
    window.addEventListener("resize", () => {
      measureHeroShift();
      queueHero();
    });
    window.addEventListener("load", measureHeroShift);
    measureHeroShift();
    updateHero();
  }

  /* ---------- Smooth in-page anchor scrolling ---------- */
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    history.pushState(null, "", id);
  });

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
