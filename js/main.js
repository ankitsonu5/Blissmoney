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
      const panel = $("#panel-" + tab.dataset.tab);
      panel.classList.add("active");
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

  /* --- Financial goal planners --- */
  const goalConfigs = {
    marriage: {
      title: "Marriage Expense Calculator",
      description:
        "Estimate the future cost and the investment needed to prepare for the celebration.",
      mode: "age",
      currentIndex: 2,
      returnIndex: 3,
      inflationIndex: 4,
      currentLabel: "Current Marriage Expenses",
      futureLabel: "Future Marriage Expenses",
      fields: [
        { label: "Current Age", min: 1, max: 30, step: 1, value: 10, format: "age" },
        { label: "Age at the Start of Marriage", min: 10, max: 50, step: 1, value: 18, format: "age" },
        { label: "Current Marriage Expenses (₹)", min: 100000, max: 10000000, step: 1000, value: 500000, format: "currency" },
        { label: "Rate of Return (%)", min: 1, max: 30, step: 1, value: 7, format: "percent" },
        { label: "Inflation Rate (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
      ],
    },
    education: {
      title: "Education Cost Calculator",
      description:
        "Project education costs and see the lump-sum or monthly investment required to meet them.",
      mode: "age",
      currentIndex: 2,
      returnIndex: 3,
      inflationIndex: 4,
      currentLabel: "Current Education Expenses",
      futureLabel: "Future Education Expenses",
      fields: [
        { label: "Current Age", min: 1, max: 30, step: 1, value: 10, format: "age" },
        { label: "Age at the Start of Education", min: 10, max: 50, step: 1, value: 18, format: "age" },
        { label: "Current Education Expenses (₹)", min: 100000, max: 10000000, step: 1000, value: 500000, format: "currency" },
        { label: "Rate of Return (%)", min: 1, max: 30, step: 1, value: 7, format: "percent" },
        { label: "Inflation Rate (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
      ],
    },
    home: {
      title: "Home Loan Calculator",
      description:
        "Plan for a future home purchase by accounting for inflation and expected investment growth.",
      mode: "years",
      currentIndex: 0,
      yearsIndex: 1,
      returnIndex: 2,
      inflationIndex: 3,
      currentLabel: "Current Cost of House",
      futureLabel: "Future Cost of House",
      fields: [
        { label: "Current Cost (₹)", min: 1000000, max: 100000000, step: 100000, value: 1000000, format: "currency" },
        { label: "After How Many Years Do You Wish To Plan Your Dream House", min: 1, max: 40, step: 1, value: 5, format: "years" },
        { label: "Rate of Return (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
        { label: "Inflation Rate (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
      ],
    },
    car: {
      title: "Car Purchase Calculator",
      description:
        "Estimate the future price of your car and the investment required before purchase.",
      mode: "years",
      currentIndex: 0,
      yearsIndex: 1,
      returnIndex: 2,
      inflationIndex: 3,
      currentLabel: "Current Cost of Car",
      futureLabel: "Future Cost of Car",
      fields: [
        { label: "Current Cost (₹)", min: 1000000, max: 100000000, step: 100000, value: 1000000, format: "currency" },
        { label: "After How Many Years Do You Wish To Plan Your Dream Car (Y)", min: 1, max: 40, step: 1, value: 5, format: "years" },
        { label: "Rate of Return (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
        { label: "Inflation Rate (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
      ],
    },
    vacation: {
      title: "Vacation Budget Calculator",
      description:
        "Plan a future holiday budget with a clear estimate of inflation and monthly savings.",
      mode: "years",
      currentIndex: 0,
      yearsIndex: 1,
      returnIndex: 2,
      inflationIndex: 3,
      currentLabel: "Current Cost of Vacation",
      futureLabel: "Future Cost of Vacation",
      fields: [
        { label: "Current Vacation Expenses (₹)", min: 10000, max: 200000, step: 100, value: 10000, format: "currency" },
        { label: "After How Many Years Do You Wish To Plan Your Holiday?", min: 1, max: 40, step: 1, value: 5, format: "years" },
        { label: "Rate of Return (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
        { label: "Inflation Rate (%)", min: 0, max: 30, step: 1, value: 5, format: "percent" },
      ],
    },
  };

  const goalInputs = [1, 2, 3, 4, 5].map((number) => ({
    field: $(`[data-goal-field="${number}"]`),
    label: $("#goalLabel" + number),
    output: $("#goalValue" + number + "Out"),
    input: $("#goalValue" + number),
  }));
  let activeGoal = "marriage";

  const formatGoalValue = (field, value) => {
    if (field.format === "currency") return inr(value);
    if (field.format === "percent") return value + "%";
    return value + (value === 1 ? " yr" : " yrs");
  };

  const updateGoalCalculator = () => {
    const config = goalConfigs[activeGoal];
    const values = config.fields.map((field, index) => {
      const value = +goalInputs[index].input.value;
      if (document.activeElement !== goalInputs[index].output) {
        goalInputs[index].output.value = formatGoalValue(field, value);
      }
      return value;
    });

    let years;
    if (config.mode === "age") {
      const currentAge = values[0];
      const targetInput = goalInputs[1].input;
      targetInput.min = Math.min(currentAge + 1, +targetInput.max);
      if (+targetInput.value <= currentAge) {
        targetInput.value = Math.min(currentAge + 1, +targetInput.max);
        values[1] = +targetInput.value;
        if (document.activeElement !== goalInputs[1].output) {
          goalInputs[1].output.value = formatGoalValue(config.fields[1], values[1]);
        }
        paintRange(targetInput);
      }
      years = Math.max(values[1] - currentAge, 1);
    } else {
      years = values[config.yearsIndex];
    }

    const currentCost = values[config.currentIndex];
    const expectedReturn = values[config.returnIndex] / 100;
    const inflation = values[config.inflationIndex] / 100;
    const futureCost = currentCost * Math.pow(1 + inflation, years);
    const lumpSum = futureCost / Math.pow(1 + expectedReturn, years);
    const months = years * 12;
    const monthlyReturn = expectedReturn / 12;
    const sip = monthlyReturn
      ? (futureCost * monthlyReturn) /
        (Math.pow(1 + monthlyReturn, months) - 1)
      : futureCost / months;
    const increase = ((futureCost / currentCost - 1) * 100).toFixed(1);

    $("#goalTimeline").textContent =
      years + (years === 1 ? " year to goal" : " years to goal");
    $("#goalFutureLabel").textContent = config.futureLabel;
    $("#goalCurrentLabel").textContent = config.currentLabel;
    $("#goalFuture").textContent = inr(futureCost);
    $("#goalCurrent").textContent = inr(currentCost);
    $("#goalLumpSum").textContent = inr(lumpSum);
    $("#goalSip").textContent = inr(sip);
    $("#goalIncrease").textContent = "+" + increase + "%";
    $("#goalCurrentBar").style.width =
      Math.min((currentCost / futureCost) * 100, 100).toFixed(1) + "%";
    $("#goalFutureBar").style.width = "100%";
  };

  const setGoalCalculator = (goal) => {
    const config = goalConfigs[goal];
    activeGoal = goal;

    $$("#panel-sip .goal-tab").forEach((tab) => {
      const selected = tab.dataset.goal === goal;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
    });

    $("#goalCalcTitle").textContent = config.title;
    $("#goalCalcDescription").textContent = config.description;

    goalInputs.forEach((control, index) => {
      const field = config.fields[index];
      control.field.hidden = !field;
      if (!field) return;
      control.label.textContent = field.label;
      control.input.min = field.min;
      control.input.max = field.max;
      control.input.step = field.step;
      control.input.value = field.value;
      control.input.setAttribute("aria-label", field.label);
      control.output.value = formatGoalValue(field, field.value);
      control.output.setAttribute("aria-label", "Enter " + field.label);
      paintRange(control.input);
    });

    updateGoalCalculator();
  };

  $$("#panel-sip .goal-tab").forEach((tab, index, tabs) => {
    tab.addEventListener("click", () => setGoalCalculator(tab.dataset.goal));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      setGoalCalculator(tabs[nextIndex].dataset.goal);
    });
  });
  goalInputs.forEach(({ input }) => {
    input.addEventListener("input", () => {
      paintRange(input);
      updateGoalCalculator();
    });
  });
  goalInputs.forEach((control, index) => {
    const commitEditedGoalValue = () => {
      const field = goalConfigs[activeGoal].fields[index];
      if (!field) return;
      const wholeNumber = control.output.value
        .replace(/\..*$/, "")
        .replace(/\D/g, "");
      const requestedValue = wholeNumber
        ? Number.parseInt(wholeNumber, 10)
        : +control.input.value;
      const min = +control.input.min;
      const max = +control.input.max;
      const step = Math.max(+control.input.step || 1, 1);
      const clampedValue = Math.min(Math.max(requestedValue, min), max);
      const steppedValue = Math.min(
        max,
        Math.max(min, min + Math.round((clampedValue - min) / step) * step),
      );

      control.input.value = steppedValue;
      control.output.value = formatGoalValue(field, steppedValue);
      paintRange(control.input);
      updateGoalCalculator();
    };

    control.output.addEventListener("focus", () => {
      control.output.value = control.input.value;
      control.output.select();
    });
    control.output.addEventListener("keydown", (event) => {
      if ([".", ",", "e", "E", "+", "-"].includes(event.key)) {
        event.preventDefault();
      }
      if (event.key === "Enter") {
        event.preventDefault();
        control.output.blur();
      }
    });
    control.output.addEventListener("input", () => {
      const field = goalConfigs[activeGoal].fields[index];
      if (!field) return;
      const wholeNumber = control.output.value
        .replace(/\..*$/, "")
        .replace(/\D/g, "");
      control.output.value = wholeNumber;
      if (!wholeNumber) return;

      const min = +control.input.min;
      const max = +control.input.max;
      control.input.value = Math.min(
        Math.max(Number.parseInt(wholeNumber, 10), min),
        max,
      );
      paintRange(control.input);
      updateGoalCalculator();
    });
    control.output.addEventListener("blur", commitEditedGoalValue);
  });

  /* --- Native Risk and Mortgage calculators --- */
  const sumGrowingExpenses = (annualExpense, growth, discount, years) => {
    let required = 0;
    for (let year = 0; year < years; year += 1) {
      required +=
        (annualExpense * Math.pow(1 + growth, year)) /
        Math.pow(1 + discount, year);
    }
    return required;
  };

  const futureSipValue = (monthlyInvestment, annualReturn, months, annualStepUp = 0) => {
    const monthlyReturn = annualReturn / 12;
    let installment = monthlyInvestment;
    let invested = 0;
    let value = 0;

    for (let month = 0; month < months; month += 1) {
      if (month > 0 && month % 12 === 0) installment *= 1 + annualStepUp;
      invested += installment;
      value = (value + installment) * (1 + monthlyReturn);
    }

    return { invested, value };
  };

  const insuranceFields = () => [
    { label: "Loan Amount (₹)", min: 0, max: 10000000, step: 1000, value: 100000, format: "currency" },
    { label: "Current FD Rate (%)", min: 1, max: 15, step: 1, value: 5, format: "percent" },
    { label: "Inflation Rate (%)", min: 1, max: 30, step: 1, value: 5, format: "percent" },
    { label: "Protection Duration (Years)", min: 1, max: 40, step: 1, value: 5, format: "years" },
    { label: "Monthly Expenses (₹)", min: 0, max: 500000, step: 1000, value: 10000, format: "currency" },
  ];

  const calculateInsurance = (values) => {
    const [loan, fdRate, inflation, years, monthlyExpenses] = values;
    const household = sumGrowingExpenses(
      monthlyExpenses * 12,
      inflation / 100,
      fdRate / 100,
      years,
    );
    const total = loan + household;
    return {
      timeline: years + (years === 1 ? " year protection" : " years protection"),
      primaryLabel: "Total insurance cover",
      primaryValue: inr(total),
      rows: [
        ["Loan repayment", inr(loan)],
        ["Household expenses", inr(household)],
        ["Monthly expenses protected", inr(monthlyExpenses)],
      ],
      comparisonTitle: "Cover composition",
      comparisonStat: total ? Math.round((household / total) * 100) + "% expenses" : "0%",
      bars: [
        ["Loan", loan],
        ["Expenses", household],
      ],
    };
  };

  const nativeToolConfigs = {
    retirement: {
      kicker: "Risk planning",
      title: "Retirement Corpus Calculator",
      description: "Build the retirement corpus required to protect your future lifestyle.",
      note: "This calculator is for informational and illustrative purposes only and does not constitute investment advice. Actual results may vary with market performance.",
      fields: [
        { label: "Current Age (Y)", min: 0, max: 100, step: 1, value: 30, format: "age" },
        { label: "Retirement Age (Y)", min: 35, max: 100, step: 1, value: 60, format: "age" },
        { label: "Life Expectancy (Y)", min: 35, max: 100, step: 1, value: 85, format: "age" },
        { label: "Current Monthly Expenses (₹)", min: 1000, max: 10000000, step: 1000, value: 40000, format: "currency" },
        { label: "Inflation Rate (%)", min: 1, max: 30, step: 1, value: 7, format: "percent" },
        { label: "Expected Return Pre-Retirement (%)", min: 1, max: 30, step: 1, value: 14, format: "percent" },
        { label: "Expected Return Post-Retirement (%)", min: 1, max: 30, step: 1, value: 7, format: "percent" },
      ],
      calculate(values) {
        const [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, preReturnRate, postReturnRate] = values;
        const yearsToRetirement = Math.max(retirementAge - currentAge + 1, 1);
        const retirementYears = Math.max(lifeExpectancy - retirementAge + 1, 1);
        const inflation = inflationRate / 100;
        const preReturn = preReturnRate / 100;
        const postReturn = postReturnRate / 100;
        const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflation, yearsToRetirement);
        const corpus = sumGrowingExpenses(
          futureMonthlyExpenses * 12,
          inflation,
          postReturn,
          retirementYears,
        );
        const months = yearsToRetirement * 12;
        const monthlyReturn = preReturn / 12;
        const sipFactor = monthlyReturn
          ? (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn
          : months;
        const monthlySip = corpus / Math.max(sipFactor, 1);
        const lumpSum = corpus / Math.pow(1 + preReturn, yearsToRetirement);

        return {
          timeline: yearsToRetirement + (yearsToRetirement === 1 ? " year to retirement" : " years to retirement"),
          primaryLabel: "Required corpus at retirement",
          primaryValue: inr(corpus),
          rows: [
            ["Future monthly expenses", inr(futureMonthlyExpenses)],
            ["Planning through SIP", inr(monthlySip)],
            ["Planning through lump sum", inr(lumpSum)],
          ],
          comparisonTitle: "Monthly expense comparison",
          comparisonStat: "+" + Math.max((futureMonthlyExpenses / Math.max(monthlyExpenses, 1) - 1) * 100, 0).toFixed(0) + "%",
          bars: [
            ["Today", monthlyExpenses],
            ["Future", futureMonthlyExpenses],
          ],
        };
      },
    },
    life: {
      kicker: "Risk planning",
      title: "Life Insurance Calculator",
      description: "Estimate the cover needed for liabilities and ongoing household expenses.",
      note: "This is an indicative protection estimate. Product suitability and underwriting require a detailed review.",
      fields: insuranceFields(),
      calculate: calculateInsurance,
    },
    health: {
      kicker: "Risk planning",
      title: "Health Insurance Calculator",
      description: "Estimate a protection buffer for liabilities and essential family expenses.",
      note: "This indicative estimate follows the reference calculator inputs. Medical cover should be finalised after a needs assessment.",
      fields: insuranceFields(),
      calculate: calculateInsurance,
    },
    "property-value": {
      kicker: "Home finance",
      title: "Property Value Calculator",
      description: "Understand the monthly EMI and full borrowing cost before you commit.",
      note: "This calculator is for informational and illustrative purposes only. Actual lending terms may vary.",
      fields: [
        { label: "Loan Amount (₹)", min: 100000, max: 100000000, step: 1000, value: 100000, format: "currency" },
        { label: "Loan Tenure (Years)", min: 1, max: 40, step: 1, value: 5, format: "years" },
        { label: "Interest Rate (%)", min: 1, max: 30, step: 1, value: 7, format: "percent" },
      ],
      calculate(values) {
        const [principal, years, annualRate] = values;
        const monthlyRate = annualRate / 1200;
        const months = years * 12;
        const compound = Math.pow(1 + monthlyRate, months);
        const emiAmount = monthlyRate
          ? (principal * monthlyRate * compound) / (compound - 1)
          : principal / months;
        const total = emiAmount * months;
        const interest = total - principal;
        return {
          timeline: years + (years === 1 ? " year tenure" : " year tenure"),
          primaryLabel: "Loan EMI",
          primaryValue: inr(emiAmount),
          rows: [
            ["Principal loan amount", inr(principal)],
            ["Total interest payable", inr(interest)],
            ["Total payment", inr(total)],
          ],
          comparisonTitle: "Payment breakdown",
          comparisonStat: total ? Math.round((interest / total) * 100) + "% interest" : "0%",
          bars: [
            ["Principal", principal],
            ["Interest", interest],
          ],
        };
      },
    },
  };
  nativeToolConfigs["emi-plan"] = {
    ...nativeToolConfigs["property-value"],
    title: "EMI Calculator",
    description: "Calculate the monthly instalment, total interest and complete loan repayment.",
  };

  const formatNativeValue = (field, value) => {
    if (field.format === "currency") return inr(value);
    if (field.format === "percent") return value + "%";
    if (field.format === "age") return value + " yrs";
    if (field.format === "years") return value + (value === 1 ? " yr" : " yrs");
    return value.toLocaleString("en-IN");
  };

  const initializeNativeCalculator = (panel) => {
    const tabs = $$(".native-tool-tab", panel);
    const inputsContainer = $(".native-tool-inputs", panel);
    const maxFields = 7;
    inputsContainer.innerHTML = Array.from({ length: maxFields }, (_, index) => `
      <div class="field native-field" data-native-field="${index}" hidden>
        <label class="native-field-label">Calculator input</label>
        <input class="goal-number-input native-number-input" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Calculator input">
        <input class="native-range-input" type="range" min="0" max="100" step="1" value="0" aria-label="Calculator input">
      </div>
    `).join("");

    const controls = $$(".native-field", panel).map((field) => ({
      field,
      label: $(".native-field-label", field),
      output: $(".native-number-input", field),
      input: $(".native-range-input", field),
    }));
    let activeTool = tabs.find((tab) => tab.classList.contains("active"))?.dataset.nativeTool;

    const update = () => {
      const config = nativeToolConfigs[activeTool];
      const values = config.fields.map((field, index) => {
        const value = +controls[index].input.value;
        if (document.activeElement !== controls[index].output) {
          controls[index].output.value = formatNativeValue(field, value);
        }
        return value;
      });
      const result = config.calculate(values);
      const resultCard = $(".native-tool-result", panel);
      $(".native-tool-timeline", panel).textContent = result.timeline;
      $(".native-primary-label", panel).textContent = result.primaryLabel;
      $(".native-primary-value", panel).textContent = result.primaryValue;
      $(".native-result-rows", panel).innerHTML = result.rows
        .map(([label, value], index) => `<div class="native-result-row"><span>${label}</span><b class="${index === 0 ? "pos" : ""}">${value}</b></div>`)
        .join("");
      $(".native-comparison-title", panel).textContent = result.comparisonTitle;
      $(".native-comparison-stat", panel).textContent = result.comparisonStat;

      const barMax = Math.max(result.bars[0][1], result.bars[1][1], 1);
      $(".native-bar-label-one", panel).textContent = result.bars[0][0];
      $(".native-bar-label-two", panel).textContent = result.bars[1][0];
      $(".native-bar-one", panel).style.width = Math.max((result.bars[0][1] / barMax) * 100, 1) + "%";
      $(".native-bar-two", panel).style.width = Math.max((result.bars[1][1] / barMax) * 100, 1) + "%";
      resultCard.classList.toggle("is-negative", Boolean(result.negative));
    };

    const setTool = (tool) => {
      const config = nativeToolConfigs[tool];
      activeTool = tool;
      tabs.forEach((tab) => {
        const selected = tab.dataset.nativeTool === tool;
        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
      });

      $(".native-tool-kicker", panel).textContent = config.kicker;
      $(".native-tool-title", panel).textContent = config.title;
      $(".native-tool-description", panel).textContent = config.description;
      $(".native-tool-note", panel).textContent = config.note;

      controls.forEach((control, index) => {
        const field = config.fields[index];
        control.field.hidden = !field;
        if (!field) return;
        control.label.textContent = field.label;
        control.input.min = field.min;
        control.input.max = field.max;
        control.input.step = field.step;
        control.input.value = field.value;
        control.input.setAttribute("aria-label", field.label);
        control.output.value = formatNativeValue(field, field.value);
        control.output.setAttribute("aria-label", "Enter " + field.label);
        paintRange(control.input);
      });
      update();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => setTool(tab.dataset.nativeTool));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        tabs[nextIndex].focus();
        setTool(tabs[nextIndex].dataset.nativeTool);
      });
    });

    controls.forEach((control, index) => {
      control.input.addEventListener("input", () => {
        paintRange(control.input);
        update();
      });

      const commitValue = () => {
        const field = nativeToolConfigs[activeTool].fields[index];
        if (!field) return;
        const digits = control.output.value
          .replace(/\..*$/, "")
          .replace(/\D/g, "");
        const requested = digits ? Number.parseInt(digits, 10) : +control.input.value;
        const min = +control.input.min;
        const max = +control.input.max;
        const step = Math.max(+control.input.step || 1, 1);
        const clamped = Math.min(Math.max(requested, min), max);
        const stepped = Math.min(max, Math.max(min, min + Math.round((clamped - min) / step) * step));
        control.input.value = stepped;
        control.output.value = formatNativeValue(field, stepped);
        paintRange(control.input);
        update();
      };

      control.output.addEventListener("focus", () => {
        control.output.value = control.input.value;
        control.output.select();
      });
      control.output.addEventListener("keydown", (event) => {
        if ([".", ",", "e", "E", "+", "-"].includes(event.key)) event.preventDefault();
        if (event.key === "Enter") {
          event.preventDefault();
          control.output.blur();
        }
      });
      control.output.addEventListener("input", () => {
        const digits = control.output.value
          .replace(/\..*$/, "")
          .replace(/\D/g, "");
        control.output.value = digits;
        if (!digits) return;
        control.input.value = Math.min(
          Math.max(Number.parseInt(digits, 10), +control.input.min),
          +control.input.max,
        );
        paintRange(control.input);
        update();
      });
      control.output.addEventListener("blur", commitValue);
    });

    setTool(activeTool);
  };

  /* --- Native mutual-fund performance calculator (SIP / STP / SWP) --- */
  const roiAmcOptions = [
    "360 ONE Mutual Fund",
    "Aditya Birla Sun Life Mutual Fund",
    "Axis Mutual Fund",
    "Bajaj Finserv Mutual Fund",
    "Bandhan Mutual Fund",
    "Bank Of India Mutual Fund",
    "Baroda Bnp Paribas Mutual Fund",
    "Canara Robeco Mutual Fund",
    "DSP Mutual Fund",
    "Edelweiss Mutual Fund",
    "Franklin Templeton Mutual Fund",
    "Groww Mutual Fund",
    "HDFC Mutual Fund",
    "Helios Mutual Fund",
    "HSBC Mutual Fund",
    "ICICI Prudential Mutual Fund",
    "Invesco Mutual Fund",
    "ITI Mutual Fund",
    "JM Financial Mutual Fund",
    "Kotak Mutual Fund",
    "LIC Mutual Fund",
    "Mahindra Manulife Mutual Fund",
    "Mirae Asset Mutual Fund",
    "Motilal Oswal Mutual Fund",
    "NAVI Mutual Fund",
    "Nippon India Mutual Fund",
    "NJ Mutual Fund",
    "OLDBRIDGE Mutual Fund",
    "PGIM India Mutual Fund",
    "PPFAS Mutual Fund",
    "Quant MF",
    "Quantum Mutual Fund",
    "Samco Mutual Fund",
    "SBI Mutual Fund",
    "Shriram Mutual Fund",
    "Sundaram Mutual Fund",
    "Tata Mutual Fund",
    "Taurus Mutual Fund",
    "Trust Mutual Fund",
    "Union Mutual Fund",
    "Uti Mutual Fund",
    "WhiteOak Capital Mutual Fund",
    "Zerodha Mutual Fund",
    "Angel One Mutual Fund",
    "Unifi Mutual Fund",
    "Capitalmind Mutual Fund",
    "Quant Mutual Fund - SIF",
    "The Wealth Company Mutual Fund",
    "Edelweiss Mutual Fund-SIF",
    "SBI Mutual Fund-SIF",
    "Taurus Mutual Fund - CAMS",
    "Taurus Mutual Fund - Karvy",
    "ITI Mutual Fund - SIF",
    "Abakkus Mutual Fund",
    "Tata Mutual Fund-SIF",
    "Bandhan Mutual Fund -SIF",
    "ICICI Prudential Mutual Fund - SIF",
    "360 ONE Mutual Fund SIF",
    "Bandhan Mutual Fund - SIF",
    "360 ONE Mutual Fund-SIF (DYNASIF)",
    "Aditya Birla Sun Life Mutual Fund-SIF (APEX SIF)",
    "AlphaGrep Mutual Fund",
    "Bandhan Mutual Fund-SIF (ARUDHA SIF)",
    "Choice Mutual Fund",
    "Edelweiss Mutual Fund-SIF (ALTIVA SIF)",
    "Franklin Templeton Mutual Fund SIF (SAPPHIRE SIF)",
    "HSBC Mutual Fund SIF (REDHEX SIF)",
    "ICICI Prudential Mutual Fund-SIF (ISIF)",
    "Invesco Mutual Fund SIF (Summit SIF)",
    "ITI Mutual Fund-SIF (DIVINITI SIF)",
    "Jio BlackRock Mutual Fund",
    "Jio BlackRock Mutual Fund SIF (Prism SIF)",
    "Kotak Mutual Fund SIF (INFINITY SIF)",
    "Mirae Asset Mutual Fund SIF (PLATINUM SIF)",
    "Quant Mutual Fund-SIF (QSIF)",
    "SBI Mutual Fund-SIF (MAGNUM SIF)",
    "Tata Mutual Fund-SIF (TITANIUM SIF)",
    "The Wealth Company Mutual Fund SIF",
    "Union Mutual Fund SIF (ARTHAYA SIF)",
  ];

  const roiAssetGroups = {
    Equity: [
      "Large Cap",
      "Large & Mid Cap",
      "Mid Cap",
      "Small Cap",
      "Flexi Cap",
      "Multi Cap",
      "ELSS",
      "Sectoral / Thematic",
      "Index",
    ],
    Debt: [
      "Overnight",
      "Liquid",
      "Ultra Short Duration",
      "Short Duration",
      "Corporate Bond",
      "Banking & PSU",
      "Gilt",
      "Dynamic Bond",
    ],
    Hybrid: [
      "Aggressive Hybrid",
      "Balanced Advantage",
      "Multi Asset",
      "Equity Savings",
      "Arbitrage",
    ],
    Other: [
      "Gold ETF / FoF",
      "International",
      "Solution Oriented",
      "Fund of Funds",
    ],
  };

  const toLocalDateValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const roiDateYearsAgo = (years) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return toLocalDateValue(date);
  };

  const roiToday = toLocalDateValue(new Date());
  const roiDateLabel = (dateValue) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${dateValue}T00:00:00`));

  const roiMonthDifference = (startValue, endValue, inclusive = false) => {
    const start = new Date(`${startValue}T00:00:00`);
    const end = new Date(`${endValue}T00:00:00`);
    const monthDifference =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth();
    return Math.max(monthDifference + (inclusive ? 1 : 0), inclusive ? 1 : 0);
  };

  const roiPerformanceConfigs = {
    "sip-performance": {
      title: "SIP Performance",
      description:
        "Compare a monthly SIP across your selected fund universe, investment dates and return assumption.",
      note:
        "This is an assumption-based illustration, not live NAV performance. Actual scheme returns, taxes and exit loads may differ.",
      fields: () => [
        { name: "scheme", label: "Select / enter scheme", type: "scheme", wide: true },
        { name: "sipAmount", label: "SIP Amount (Monthly)", type: "number", value: 10000, min: 500, max: 10000000 },
        { name: "startDate", label: "SIP Start Date", type: "date", value: roiDateYearsAgo(5) },
        { name: "endDate", label: "SIP End Date", type: "date", value: roiToday },
        { name: "valuationDate", label: "Valuation As On", type: "date", value: roiToday },
        { name: "returnRate", label: "Expected Annual Return (%)", type: "number", value: 12, min: 0, max: 30 },
      ],
    },
    "stp-performance": {
      title: "STP Performance",
      description:
        "Model systematic transfers from a source scheme into a destination scheme over your chosen period.",
      note:
        "This STP projection uses separate source and destination return assumptions. Taxes, exit loads and actual NAV movement are excluded.",
      fields: () => [
        { name: "fromScheme", label: "Transfer From Scheme", type: "scheme", wide: true },
        { name: "toScheme", label: "Transfer To Scheme", type: "scheme", wide: true },
        { name: "initialAmount", label: "Initial Amount", type: "number", value: 100000, min: 1000, max: 1000000000 },
        { name: "transferAmount", label: "Transfer Amount", type: "number", value: 1000, min: 100, max: 100000000 },
        { name: "investmentDate", label: "Investment Date", type: "date", value: roiDateYearsAgo(6) },
        { name: "startDate", label: "STP Start Date", type: "date", value: roiDateYearsAgo(5) },
        { name: "endDate", label: "STP End Date", type: "date", value: roiToday },
        { name: "sourceReturn", label: "Source Return (%)", type: "number", value: 6, min: 0, max: 30 },
        { name: "destinationReturn", label: "Destination Return (%)", type: "number", value: 12, min: 0, max: 30 },
      ],
    },
    "swp-performance": {
      title: "SWP Performance",
      description:
        "See how a fixed monthly withdrawal may affect an invested corpus over the selected period.",
      note:
        "This SWP projection uses a constant return assumption. Taxes, exit loads and sequence-of-return risk are not included.",
      fields: () => [
        { name: "scheme", label: "Select / enter scheme", type: "scheme", wide: true },
        { name: "initialAmount", label: "Initial Amount", type: "number", value: 100000, min: 1000, max: 1000000000 },
        { name: "withdrawalAmount", label: "Withdrawal Amount", type: "number", value: 1000, min: 100, max: 100000000 },
        { name: "investmentDate", label: "Investment Date", type: "date", value: roiDateYearsAgo(6) },
        { name: "startDate", label: "SWP Start Date", type: "date", value: roiDateYearsAgo(5) },
        { name: "endDate", label: "SWP End Date", type: "date", value: roiToday },
        { name: "returnRate", label: "Expected Annual Return (%)", type: "number", value: 8, min: 0, max: 30 },
      ],
    },
  };

  const initializeRoiPerformanceCalculator = () => {
    const panel = $("#panel-roi");
    if (!panel) return;

    const toolTabs = $$(".roi-tool-tab", panel);
    const modeButtons = $$(".roi-mode-btn", panel);
    const resultViews = $$(".roi-result-view", panel);
    const filterOptions = $(".roi-filter-options", panel);
    const filterSearch = $(".roi-filter-search", panel);
    const fieldsGrid = $(".roi-fields-grid", panel);
    const formMessage = $(".roi-form-message", panel);
    const calculateButton = $(".roi-calculate-btn", panel);
    const resultCard = $(".roi-performance-result", panel);
    const drafts = {};
    const selections = {
      "fund-house": new Set(["HDFC Mutual Fund"]),
      "asset-category": new Set(["Large Cap"]),
    };
    let activeTool = "sip-performance";
    let filterMode = "fund-house";

    const escapeHtml = (value) =>
      String(value).replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character]);

    const setMessage = (message = "", valid = false) => {
      formMessage.textContent = message;
      formMessage.classList.toggle("is-valid", valid);
    };

    const getSelectedFilters = () => Array.from(selections[filterMode]);

    const getSchemeSuggestions = () => {
      const selected = getSelectedFilters();
      return selected.flatMap((name) => {
        if (filterMode === "asset-category") {
          return [
            `${name} portfolio — Direct Growth`,
            `${name} portfolio — Regular Growth`,
            `${name} portfolio — IDCW`,
          ];
        }
        const shortName = name
          .replace(/\s+Mutual Fund.*$/i, "")
          .replace(/\s+-\s+SIF.*$/i, "")
          .trim();
        return [
          `${shortName} — Direct Growth scheme`,
          `${shortName} — Regular Growth scheme`,
          `${shortName} — IDCW scheme`,
        ];
      });
    };

    const updateSelectionSummary = () => {
      const count = getSelectedFilters().length;
      $(".roi-selection-count", panel).textContent = `${count} selected`;
    };

    const updateSchemeInputs = (resetAutomaticValues = false) => {
      const suggestions = getSchemeSuggestions();
      $$(".roi-scheme-input", panel).forEach((input, index) => {
        const list = document.getElementById(input.getAttribute("list"));
        if (list) {
          list.innerHTML = suggestions
            .map((suggestion) => `<option value="${escapeHtml(suggestion)}"></option>`)
            .join("");
        }

        const previousAutomaticValue = input.dataset.autoValue || "";
        const shouldReplace =
          resetAutomaticValues || !input.value || input.value === previousAutomaticValue;
        if (shouldReplace) {
          const nextValue = suggestions.length
            ? suggestions[Math.min(index, suggestions.length - 1)]
            : "";
          input.value = nextValue;
          input.dataset.autoValue = nextValue;
          drafts[activeTool] = drafts[activeTool] || {};
          drafts[activeTool][input.dataset.roiField] = nextValue;
        }
      });
    };

    const appendFilterOption = (name, serial) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const text = document.createElement("span");
      const id = `roi-filter-${filterMode}-${serial}`;
      label.className = "roi-filter-option";
      input.type = "checkbox";
      input.id = id;
      input.value = name;
      input.checked = selections[filterMode].has(name);
      text.textContent = name;
      label.append(input, text);
      input.addEventListener("change", () => {
        if (input.checked) selections[filterMode].add(name);
        else selections[filterMode].delete(name);
        updateSelectionSummary();
        updateSchemeInputs(false);
        setMessage();
      });
      filterOptions.append(label);
    };

    const renderFilterOptions = () => {
      const query = filterSearch.value.trim().toLocaleLowerCase("en-IN");
      filterOptions.innerHTML = "";
      let serial = 0;
      let visibleCount = 0;

      if (filterMode === "fund-house") {
        roiAmcOptions
          .filter((name) => name.toLocaleLowerCase("en-IN").includes(query))
          .forEach((name) => {
            appendFilterOption(name, serial++);
            visibleCount += 1;
          });
      } else {
        Object.entries(roiAssetGroups).forEach(([group, names]) => {
          const visibleNames = names.filter((name) =>
            `${group} ${name}`.toLocaleLowerCase("en-IN").includes(query),
          );
          if (!visibleNames.length) return;
          const heading = document.createElement("p");
          heading.className = "roi-filter-group-title";
          heading.textContent = group;
          filterOptions.append(heading);
          visibleNames.forEach((name) => {
            appendFilterOption(name, serial++);
            visibleCount += 1;
          });
        });
      }

      if (!visibleCount) {
        const empty = document.createElement("p");
        empty.className = "roi-empty-options";
        empty.textContent = "No matching option found.";
        filterOptions.append(empty);
      }
      updateSelectionSummary();
    };

    const renderFields = () => {
      const fields = roiPerformanceConfigs[activeTool].fields();
      const savedDraft = drafts[activeTool] || {};
      fieldsGrid.innerHTML = fields
        .map((field) => {
          const id = `roi-${activeTool}-${field.name}`;
          const value = savedDraft[field.name] ?? field.value ?? "";
          if (field.type === "scheme") {
            return `
              <div class="roi-control${field.wide ? " roi-control-wide" : ""}">
                <label for="${id}">${escapeHtml(field.label)}</label>
                <input class="roi-field-input roi-scheme-input" id="${id}" type="text" data-roi-field="${field.name}" list="${id}-options" value="${escapeHtml(value)}" placeholder="Type the exact scheme name" autocomplete="off">
                <datalist id="${id}-options"></datalist>
                <small class="roi-control-hint">Type any exact scheme name; values are projected from your return assumption.</small>
              </div>`;
          }
          if (field.type === "date") {
            return `
              <div class="roi-control${field.wide ? " roi-control-wide" : ""}">
                <label for="${id}">${escapeHtml(field.label)}</label>
                <input class="roi-field-input" id="${id}" type="date" data-roi-field="${field.name}" value="${escapeHtml(value)}" max="${roiToday}">
              </div>`;
          }
          return `
            <div class="roi-control${field.wide ? " roi-control-wide" : ""}">
              <label for="${id}">${escapeHtml(field.label)}</label>
              <input class="roi-field-input roi-number-input" id="${id}" type="text" inputmode="numeric" pattern="[0-9]*" data-roi-field="${field.name}" data-min="${field.min}" data-max="${field.max}" value="${escapeHtml(value)}" autocomplete="off">
            </div>`;
        })
        .join("");

      $$(".roi-field-input", panel).forEach((input) => {
        const saveValue = () => {
          drafts[activeTool] = drafts[activeTool] || {};
          drafts[activeTool][input.dataset.roiField] = input.value;
          setMessage();
        };
        input.addEventListener("change", saveValue);
        input.addEventListener("input", saveValue);
      });

      $$(".roi-number-input", panel).forEach((input) => {
        input.addEventListener("keydown", (event) => {
          if ([".", ",", "e", "E", "+", "-"].includes(event.key)) {
            event.preventDefault();
          }
        });
        input.addEventListener("input", () => {
          input.value = input.value.replace(/\D/g, "");
          drafts[activeTool][input.dataset.roiField] = input.value;
        });
        input.addEventListener("blur", () => {
          if (!input.value) return;
          const min = Number(input.dataset.min);
          const max = Number(input.dataset.max);
          input.value = String(
            Math.min(Math.max(Number.parseInt(input.value, 10), min), max),
          );
          drafts[activeTool][input.dataset.roiField] = input.value;
        });
      });

      updateSchemeInputs(false);
    };

    const readValues = () => {
      const values = {};
      $$(".roi-field-input", panel).forEach((input) => {
        values[input.dataset.roiField] = input.classList.contains("roi-number-input")
          ? Number.parseInt(input.value, 10)
          : input.value.trim();
      });
      return values;
    };

    const validateValues = (values) => {
      if (!getSelectedFilters().length) {
        return filterMode === "fund-house"
          ? "Select at least one fund house."
          : "Select at least one asset category.";
      }

      const config = roiPerformanceConfigs[activeTool];
      for (const field of config.fields()) {
        const value = values[field.name];
        if (field.type === "scheme" && !value) return `${field.label} is required.`;
        if (field.type === "date" && !value) return `${field.label} is required.`;
        if (field.type === "number") {
          if (!Number.isFinite(value)) return `Enter ${field.label.toLowerCase()}.`;
          if (value < field.min || value > field.max) {
            return `${field.label} must be between ${field.min.toLocaleString("en-IN")} and ${field.max.toLocaleString("en-IN")}.`;
          }
        }
      }

      if (activeTool === "sip-performance") {
        if (values.valuationDate > roiToday) {
          return "Valuation date cannot be in the future.";
        }
        if (values.startDate > values.endDate) {
          return "SIP end date must be on or after the SIP start date.";
        }
        if (values.endDate > values.valuationDate) {
          return "Valuation date must be on or after the SIP end date.";
        }
      } else {
        if (values.endDate > roiToday) {
          return "The plan end date cannot be in the future.";
        }
        if (values.investmentDate > values.startDate) {
          return "The investment date must be on or before the plan start date.";
        }
        if (values.startDate > values.endDate) {
          return "The plan end date must be on or after its start date.";
        }
      }

      if (activeTool === "stp-performance") {
        if (values.fromScheme === values.toScheme) {
          return "Choose different source and destination schemes for the STP.";
        }
        if (values.transferAmount > values.initialAmount) {
          return "Monthly transfer amount cannot exceed the initial amount.";
        }
      }
      if (
        activeTool === "swp-performance" &&
        values.withdrawalAmount > values.initialAmount
      ) {
        return "Monthly withdrawal amount cannot exceed the initial amount.";
      }
      return "";
    };

    const calculateSip = (values) => {
      const installments = roiMonthDifference(values.startDate, values.endDate, true);
      const annualReturn = values.returnRate / 100;
      const projection = futureSipValue(
        values.sipAmount,
        annualReturn,
        installments,
      );
      const valuationMonths = roiMonthDifference(
        values.endDate,
        values.valuationDate,
      );
      const valueAtValuation =
        projection.value * Math.pow(1 + annualReturn / 12, valuationMonths);
      const gain = valueAtValuation - projection.invested;
      const gainPercent = projection.invested
        ? (gain / projection.invested) * 100
        : 0;
      return {
        timeline: `${installments} monthly instalment${installments === 1 ? "" : "s"}`,
        primaryLabel: "Projected value as on valuation date",
        primaryValue: inr(valueAtValuation),
        scheme: values.scheme,
        rows: [
          ["Amount invested", inr(projection.invested)],
          ["Estimated wealth gain", inr(gain)],
          ["Return assumption", `${values.returnRate}% p.a.`],
        ],
        chartTitle: "Investment vs projected value",
        chartStat: `${gainPercent >= 0 ? "+" : ""}${gainPercent.toFixed(1)}%`,
        bars: [
          ["Invested", projection.invested],
          ["Projected", valueAtValuation],
        ],
        table: [
          ["Scheme", values.scheme],
          ["SIP amount", inr(values.sipAmount)],
          ["SIP period", `${roiDateLabel(values.startDate)} – ${roiDateLabel(values.endDate)}`],
          ["Total instalments", installments.toLocaleString("en-IN")],
          ["Total invested", inr(projection.invested)],
          ["Valuation date", roiDateLabel(values.valuationDate)],
          ["Projected value", inr(valueAtValuation)],
          ["Estimated gain", inr(gain)],
        ],
        negative: gain < 0,
      };
    };

    const calculateStp = (values) => {
      const preTransferMonths = roiMonthDifference(
        values.investmentDate,
        values.startDate,
      );
      const transferMonths = roiMonthDifference(values.startDate, values.endDate, true);
      const sourceRate = values.sourceReturn / 1200;
      const destinationRate = values.destinationReturn / 1200;
      let sourceBalance =
        values.initialAmount * Math.pow(1 + sourceRate, preTransferMonths);
      let destinationBalance = 0;
      let transferred = 0;

      for (let month = 0; month < transferMonths; month += 1) {
        sourceBalance *= 1 + sourceRate;
        destinationBalance *= 1 + destinationRate;
        const transfer = Math.min(values.transferAmount, sourceBalance);
        sourceBalance -= transfer;
        destinationBalance += transfer;
        transferred += transfer;
      }

      const combinedValue = sourceBalance + destinationBalance;
      const gain = combinedValue - values.initialAmount;
      const gainPercent = values.initialAmount
        ? (gain / values.initialAmount) * 100
        : 0;
      return {
        timeline: `${transferMonths} monthly transfer${transferMonths === 1 ? "" : "s"}`,
        primaryLabel: "Projected combined value",
        primaryValue: inr(combinedValue),
        scheme: `${values.fromScheme} → ${values.toScheme}`,
        rows: [
          ["Source scheme balance", inr(sourceBalance)],
          ["Destination scheme value", inr(destinationBalance)],
          ["Total amount transferred", inr(transferred)],
        ],
        chartTitle: "Initial vs projected value",
        chartStat: `${gainPercent >= 0 ? "+" : ""}${gainPercent.toFixed(1)}%`,
        bars: [
          ["Initial", values.initialAmount],
          ["Projected", combinedValue],
        ],
        table: [
          ["Transfer from", values.fromScheme],
          ["Transfer to", values.toScheme],
          ["Initial amount", inr(values.initialAmount)],
          ["Monthly transfer", inr(values.transferAmount)],
          ["Transfer period", `${roiDateLabel(values.startDate)} – ${roiDateLabel(values.endDate)}`],
          ["Total transferred", inr(transferred)],
          ["Source balance", inr(sourceBalance)],
          ["Destination value", inr(destinationBalance)],
          ["Projected combined value", inr(combinedValue)],
        ],
        negative: gain < 0,
      };
    };

    const calculateSwp = (values) => {
      const preWithdrawalMonths = roiMonthDifference(
        values.investmentDate,
        values.startDate,
      );
      const withdrawalMonths = roiMonthDifference(values.startDate, values.endDate, true);
      const monthlyReturn = values.returnRate / 1200;
      let balance =
        values.initialAmount * Math.pow(1 + monthlyReturn, preWithdrawalMonths);
      let totalWithdrawn = 0;

      for (let month = 0; month < withdrawalMonths; month += 1) {
        balance *= 1 + monthlyReturn;
        const withdrawal = Math.min(values.withdrawalAmount, balance);
        balance -= withdrawal;
        totalWithdrawn += withdrawal;
      }

      const combinedBenefit = balance + totalWithdrawn;
      const wealthEffect = combinedBenefit - values.initialAmount;
      const effectPercent = values.initialAmount
        ? (wealthEffect / values.initialAmount) * 100
        : 0;
      return {
        timeline: `${withdrawalMonths} monthly withdrawal${withdrawalMonths === 1 ? "" : "s"}`,
        primaryLabel: "Projected remaining balance",
        primaryValue: inr(balance),
        scheme: values.scheme,
        rows: [
          ["Total amount withdrawn", inr(totalWithdrawn)],
          ["Balance + withdrawals", inr(combinedBenefit)],
          ["Estimated wealth effect", inr(wealthEffect)],
        ],
        chartTitle: "Initial vs total benefit",
        chartStat: `${effectPercent >= 0 ? "+" : ""}${effectPercent.toFixed(1)}%`,
        bars: [
          ["Initial", values.initialAmount],
          ["Total benefit", combinedBenefit],
        ],
        table: [
          ["Scheme", values.scheme],
          ["Initial amount", inr(values.initialAmount)],
          ["Monthly withdrawal", inr(values.withdrawalAmount)],
          ["Withdrawal period", `${roiDateLabel(values.startDate)} – ${roiDateLabel(values.endDate)}`],
          ["Total withdrawn", inr(totalWithdrawn)],
          ["Remaining balance", inr(balance)],
          ["Balance + withdrawals", inr(combinedBenefit)],
          ["Estimated wealth effect", inr(wealthEffect)],
        ],
        negative: balance <= 0,
      };
    };

    const updateResult = (result) => {
      $(".roi-tool-timeline", panel).textContent = result.timeline;
      $(".roi-primary-label", panel).textContent = result.primaryLabel;
      $(".roi-primary-value", panel).textContent = result.primaryValue;
      $(".roi-result-scheme", panel).textContent = result.scheme;
      $(".roi-result-rows", panel).innerHTML = result.rows
        .map(
          ([label, value], index) =>
            `<div><span>${escapeHtml(label)}</span><b class="${index < 2 ? "pos" : ""}">${escapeHtml(value)}</b></div>`,
        )
        .join("");
      $(".roi-chart-head span", panel).textContent = result.chartTitle;
      $(".roi-chart-stat", panel).textContent = result.chartStat;

      const maximum = Math.max(result.bars[0][1], result.bars[1][1], 1);
      $(".roi-chart-label-one", panel).textContent = result.bars[0][0];
      $(".roi-chart-value-one", panel).textContent = inr(result.bars[0][1]);
      $(".roi-chart-bar-one", panel).style.height =
        `${Math.max((result.bars[0][1] / maximum) * 100, 3)}%`;
      $(".roi-chart-label-two", panel).textContent = result.bars[1][0];
      $(".roi-chart-value-two", panel).textContent = inr(result.bars[1][1]);
      $(".roi-chart-bar-two", panel).style.height =
        `${Math.max((result.bars[1][1] / maximum) * 100, 3)}%`;
      $(".roi-result-table", panel).innerHTML = result.table
        .map(
          ([label, value]) =>
            `<div class="roi-table-row"><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`,
        )
        .join("");
      resultCard.classList.toggle("is-negative", Boolean(result.negative));
    };

    const calculate = ({ silent = false } = {}) => {
      const values = readValues();
      const error = validateValues(values);
      if (error) {
        setMessage(error);
        if (!silent) {
          const firstEmptyInput = $$(".roi-field-input", panel).find(
            (input) => !input.value,
          );
          firstEmptyInput?.focus();
        }
        return;
      }

      let result;
      if (activeTool === "sip-performance") result = calculateSip(values);
      if (activeTool === "stp-performance") result = calculateStp(values);
      if (activeTool === "swp-performance") result = calculateSwp(values);
      updateResult(result);
      if (!silent) {
        const rate =
          activeTool === "stp-performance"
            ? `${values.sourceReturn}% / ${values.destinationReturn}%`
            : `${values.returnRate}%`;
        setMessage(`Projection updated using ${rate} annual return assumption.`, true);
      } else {
        setMessage();
      }
    };

    const setTool = (tool) => {
      activeTool = tool;
      const config = roiPerformanceConfigs[tool];
      toolTabs.forEach((tab) => {
        const selected = tab.dataset.roiTool === tool;
        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
      });
      $(".roi-tool-title", panel).textContent = config.title;
      $(".roi-tool-description", panel).textContent = config.description;
      $(".roi-result-note", panel).textContent = config.note;
      renderFields();
      calculate({ silent: true });
    };

    const setFilterMode = (mode) => {
      filterMode = mode;
      Object.values(drafts).forEach((draft) => {
        delete draft.scheme;
        delete draft.fromScheme;
        delete draft.toScheme;
      });
      modeButtons.forEach((button) => {
        const selected = button.dataset.roiMode === mode;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-selected", selected ? "true" : "false");
        button.tabIndex = selected ? 0 : -1;
      });
      const usingFundHouses = mode === "fund-house";
      $(".roi-filter-title", panel).textContent = usingFundHouses
        ? "Select AMC"
        : "Select Asset Category";
      filterSearch.value = "";
      filterSearch.placeholder = usingFundHouses
        ? "Search fund house"
        : "Search asset category";
      filterSearch.setAttribute(
        "aria-label",
        usingFundHouses ? "Search fund house" : "Search asset category",
      );
      filterOptions.setAttribute(
        "aria-label",
        usingFundHouses ? "Available fund houses" : "Available asset categories",
      );
      renderFilterOptions();
      updateSchemeInputs(true);
      calculate({ silent: true });
    };

    const setResultView = (view) => {
      resultViews.forEach((button) => {
        const selected = button.dataset.resultView === view;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-selected", selected ? "true" : "false");
        button.tabIndex = selected ? 0 : -1;
      });
      $$('[data-result-panel]', panel).forEach((resultPanel) => {
        resultPanel.hidden = resultPanel.dataset.resultPanel !== view;
      });
    };

    toolTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => setTool(tab.dataset.roiTool));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + toolTabs.length) % toolTabs.length;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % toolTabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = toolTabs.length - 1;
        toolTabs[nextIndex].focus();
        setTool(toolTabs[nextIndex].dataset.roiTool);
      });
    });

    modeButtons.forEach((button, index) => {
      button.addEventListener("click", () => setFilterMode(button.dataset.roiMode));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = ["ArrowRight", "End"].includes(event.key)
          ? modeButtons.length - 1
          : 0;
        modeButtons[nextIndex].focus();
        setFilterMode(modeButtons[nextIndex].dataset.roiMode);
      });
    });

    resultViews.forEach((button, index) => {
      button.addEventListener("click", () => setResultView(button.dataset.resultView));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = ["ArrowRight", "End"].includes(event.key)
          ? resultViews.length - 1
          : 0;
        resultViews[nextIndex].focus();
        setResultView(resultViews[nextIndex].dataset.resultView);
      });
    });

    filterSearch.addEventListener("input", renderFilterOptions);
    calculateButton.addEventListener("click", () => calculate());

    setTool(activeTool);
    setFilterMode(filterMode);
    setResultView("graph");
  };

  $$(".native-calc-panel").forEach(initializeNativeCalculator);
  initializeRoiPerformanceCalculator();

  // initial paint
  setGoalCalculator("marriage");

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

  /* ---------- Client Testimonials Carousel ---------- */
  const testimonialTrack = $("#testimonialTrack");
  const testimonialPrev = $("#testimonialPrev");
  const testimonialNext = $("#testimonialNext");
  const testimonialCount = $("#testimonialCount");

  if (testimonialTrack) {
    const testimonialCards = $$(".testimonial-card", testimonialTrack);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let testimonialFrame = null;

    const getTestimonialMetrics = () => {
      const firstCard = testimonialCards[0];
      if (!firstCard) return { step: 0, visible: 1, maxStart: 0 };

      const trackStyle = window.getComputedStyle(testimonialTrack);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
      // offsetWidth stays in layout pixels even when the page uses CSS zoom on
      // large desktops, so scroll positions remain aligned with snap points.
      const step = firstCard.offsetWidth + gap;
      const visible = Math.max(
        1,
        Math.round((testimonialTrack.clientWidth + gap) / step),
      );

      return {
        step,
        visible,
        maxStart: Math.max(testimonialCards.length - visible, 0),
      };
    };

    const updateTestimonialCount = () => {
      const { step, visible, maxStart } = getTestimonialMetrics();
      if (!step || !testimonialCount) return;

      const start = Math.min(
        Math.max(Math.round(testimonialTrack.scrollLeft / step), 0),
        maxStart,
      );
      const end = Math.min(start + visible, testimonialCards.length);
      const format = (value) => String(value).padStart(2, "0");

      testimonialCount.textContent =
        visible > 1
          ? `${format(start + 1)}–${format(end)} / ${format(testimonialCards.length)}`
          : `${format(start + 1)} / ${format(testimonialCards.length)}`;
    };

    const moveTestimonials = (direction) => {
      const { step, maxStart } = getTestimonialMetrics();
      if (!step) return;

      const current = Math.min(
        Math.max(Math.round(testimonialTrack.scrollLeft / step), 0),
        maxStart,
      );
      let next = current + direction;

      if (next > maxStart) next = 0;
      if (next < 0) next = maxStart;

      const isWrapping =
        (current === maxStart && next === 0) ||
        (current === 0 && next === maxStart);

      if (reduceMotion || isWrapping) {
        testimonialTrack.style.scrollBehavior = "auto";
        testimonialTrack.scrollLeft = next * step;
        requestAnimationFrame(() => {
          testimonialTrack.style.scrollBehavior = "";
          updateTestimonialCount();
        });
        return;
      }

      testimonialTrack.scrollTo({
        left: next * step,
        behavior: "smooth",
      });
    };

    testimonialPrev?.addEventListener("click", () => moveTestimonials(-1));
    testimonialNext?.addEventListener("click", () => moveTestimonials(1));

    testimonialTrack.addEventListener(
      "scroll",
      () => {
        if (testimonialFrame) cancelAnimationFrame(testimonialFrame);
        testimonialFrame = requestAnimationFrame(updateTestimonialCount);
      },
      { passive: true },
    );

    testimonialTrack.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      moveTestimonials(e.key === "ArrowRight" ? 1 : -1);
    });

    window.addEventListener("resize", updateTestimonialCount);
    updateTestimonialCount();
  }

  /* ---------- Hero scroll zoom-out ---------- */
  const heroScroll = $("#heroScroll");
  if (heroScroll) {
    const heroEl = $(".hero", heroScroll);
    const heroVisual = $(".hero-visual", heroScroll);

    let targetP = 0;
    let currentP = 0;
    let isRunning = false;

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

    const applyProgress = (p) => {
      heroScroll.style.setProperty("--p", p.toFixed(4));
      // Eased logo travel, arriving at centre slightly before the end
      const t = Math.min(1, p / 0.85);
      heroScroll.style.setProperty("--move", (t * t * (3 - 2 * t)).toFixed(4));
    };

    const tick = () => {
      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0005) {
        currentP += diff * 0.16;
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
    window.addEventListener("resize", () => {
      measureHeroShift();
      updateTarget(true);
    });
    window.addEventListener("load", () => {
      measureHeroShift();
      updateTarget(true);
    });
    measureHeroShift();
    updateTarget(true);
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

  /* ---------- Contact Form Handler ---------- */
  const contactForm = $("#contactForm");
  if (contactForm) {
    const statusEl = $("#formStatus");
    const submitBtn = $("#formSubmitBtn");
    const messageCount = $("#formMessageCount");
    const fields = [
      $("#formName"),
      $("#formMobile"),
      $("#formEmail"),
      $("#formService"),
      $("#formMessage"),
    ].filter(Boolean);
    const originalButtonContent = submitBtn ? submitBtn.innerHTML : "";

    const clearStatus = () => {
      if (!statusEl) return;
      statusEl.hidden = true;
      statusEl.className = "form-status";
      statusEl.textContent = "";
    };

    const showStatus = (type, message) => {
      if (!statusEl) return;
      statusEl.className = `form-status ${type}`;
      statusEl.textContent = message;
      statusEl.hidden = false;
    };

    const getFieldError = (field) => {
      const value = field.value.trim();

      switch (field.id) {
        case "formName": {
          const letterCount = (value.match(/\p{L}/gu) || []).length;
          if (!value) return "Please enter your full name.";
          if (value.length < 2 || letterCount < 2)
            return "Please enter at least 2 letters.";
          return "";
        }
        case "formMobile": {
          if (!value) return "Please enter your mobile number.";
          if (!/^[+\d\s()-]+$/.test(value))
            return "Use digits and standard phone symbols only.";
          const digits = value.replace(/\D/g, "");
          const nationalNumber =
            digits.length === 12 && digits.startsWith("91")
              ? digits.slice(2)
              : digits;
          if (nationalNumber.length < 10)
            return "Enter a valid 10-digit Indian mobile number.";
          if (!/^[6-9]\d{9}$/.test(nationalNumber))
            return "Mobile number must start with 6, 7, 8, or 9.";
          return "";
        }
        case "formEmail":
          if (!value) return "Please enter your email address.";
          if (field.validity.typeMismatch)
            return "Enter a valid email address, such as you@example.com.";
          return "";
        case "formService":
          return value ? "" : "Please select a service.";
        case "formMessage":
          if (!value) return "Please tell us briefly how we can help.";
          if (value.length < 20)
            return "Please add a little more detail (at least 20 characters).";
          return "";
        default:
          return "";
      }
    };

    const setFieldState = (field, message) => {
      const group = field.closest(".form-group");
      const errorEl = $(`#${field.id}Error`);
      const hasError = Boolean(message);

      group?.classList.toggle("has-error", hasError);
      field.setAttribute("aria-invalid", String(hasError));
      if (errorEl) errorEl.textContent = message;
      return !hasError;
    };

    const validateField = (field) =>
      setFieldState(field, getFieldError(field));

    const updateMessageCount = () => {
      const messageField = $("#formMessage");
      if (messageCount && messageField)
        messageCount.textContent = `${messageField.value.length} / 1000`;
    };

    const mobileField = $("#formMobile");
    const formatIndianMobile = (val) => {
      if (!val) return "";
      const str = val.trim();
      if (str === "+" || str === "+9" || str === "+91" || str === "+91 ") {
        return "";
      }

      let digits = "";
      if (str.startsWith("+91") || str.startsWith("+ 91")) {
        digits = str.slice(str.indexOf("91") + 2).replace(/\D/g, "");
      } else {
        digits = str.replace(/\D/g, "");
        if (digits.length > 10 && digits.startsWith("91")) {
          digits = digits.slice(2);
        } else if (digits.length > 10 && digits.startsWith("0")) {
          digits = digits.slice(1);
        }
      }

      digits = digits.slice(0, 10);
      if (!digits) return "";

      if (digits.length <= 5) {
        return `+91 ${digits}`;
      }
      return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    };

    if (mobileField) {
      const handleMobileInput = (e) => {
        const input = e.target;
        const oldVal = input.value;
        const oldCursor = input.selectionStart || 0;

        if (e && e.inputType === "deleteContentBackward") {
          const digitsOnly = oldVal.replace(/\D/g, "");
          if (digitsOnly.length <= 1 || oldVal.length <= 4) {
            input.value = "";
            return;
          }
        }

        const digitsBefore = oldVal.slice(0, oldCursor).replace(/\D/g, "");
        const formatted = formatIndianMobile(oldVal);
        input.value = formatted;

        if (formatted) {
          let nationalDigits = digitsBefore;
          if (nationalDigits.startsWith("91") && nationalDigits.length > 2) {
            nationalDigits = nationalDigits.slice(2);
          }
          const targetDigits = 2 + nationalDigits.length;
          let newCursor = formatted.length;
          let count = 0;
          for (let i = 0; i < formatted.length; i++) {
            if (/\d/.test(formatted[i])) {
              count++;
              if (count === targetDigits) {
                newCursor = i + 1;
                break;
              }
            }
          }
          if (oldCursor >= oldVal.length) {
            newCursor = formatted.length;
          }
          input.setSelectionRange(newCursor, newCursor);
        }
      };

      mobileField.addEventListener("input", handleMobileInput);
      mobileField.addEventListener("paste", () => {
        setTimeout(() => handleMobileInput({ target: mobileField }), 0);
      });
      mobileField.addEventListener("blur", () => {
        if (mobileField.value) {
          mobileField.value = formatIndianMobile(mobileField.value);
        }
      });
      if (mobileField.value) {
        mobileField.value = formatIndianMobile(mobileField.value);
      }
    }

    fields.forEach((field) => {
      const eventName = field.tagName === "SELECT" ? "change" : "input";

      field.addEventListener("blur", () => {
        field.dataset.touched = "true";
        validateField(field);
      });

      field.addEventListener(eventName, () => {
        clearStatus();
        if (field.id === "formMessage") updateMessageCount();
        if (field.dataset.touched === "true") validateField(field);
      });
    });

    updateMessageCount();

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearStatus();

      fields.forEach((field) => {
        field.dataset.touched = "true";
      });

      const fieldResults = fields.map((field) => ({
        field,
        valid: validateField(field),
      }));
      const firstInvalid = fieldResults.find(({ valid }) => !valid)?.field;

      if (firstInvalid) {
        showStatus(
          "error",
          "Please review the highlighted fields before sending your enquiry.",
        );
        firstInvalid.focus();
        return;
      }

      const name = $("#formName")?.value.trim() || "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Sending…</span>";
      }
      contactForm.setAttribute("aria-busy", "true");

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalButtonContent;
        }
        contactForm.removeAttribute("aria-busy");
        contactForm.reset();
        fields.forEach((field) => {
          delete field.dataset.touched;
          setFieldState(field, "");
        });
        updateMessageCount();
        showStatus(
          "success",
          `Thank you${name ? ", " + name : ""}! Your message has been received. Our advisory team will reach out to you shortly.`,
        );
      }, 700);
    });
  }

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
