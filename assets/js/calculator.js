/* ============================================================
   BlissMoney - Dedicated Calculator Controller & Hash Navigation
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

  /* ---------- Calculator Tab Activation & Hash Sync ---------- */
  const TAB_MAP = {
    "financial-calculator": "sip",
    "financial": "sip",
    "sip": "sip",
    "risk-planning-calculator": "risk",
    "risk-planning": "risk",
    "risk": "risk",
    "roi-calculator": "roi",
    "roi": "roi",
    "mortgage-calculator": "emi",
    "mortgage": "emi",
    "emi": "emi"
  };

  const REVERSE_MAP = {
    "sip": "financial-calculator",
    "risk": "risk-planning-calculator",
    "roi": "roi-calculator",
    "emi": "mortgage-calculator"
  };

  const activateTab = (tabId, updateHash = true) => {
    const targetKey = TAB_MAP[tabId] || tabId;
    const targetTab = $(`button.tab[data-tab="${targetKey}"]`);
    if (!targetTab) return;

    $$(".tab").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    targetTab.classList.add("active");
    targetTab.setAttribute("aria-selected", "true");

    $$(".calc-panel").forEach((p) => p.classList.remove("active"));
    const panel = $("#panel-" + targetKey);
    if (panel) {
      panel.classList.add("active");
    }

    if (updateHash && REVERSE_MAP[targetKey]) {
      if (history.replaceState) {
        history.replaceState(null, '', '#' + REVERSE_MAP[targetKey]);
      } else {
        location.hash = '#' + REVERSE_MAP[targetKey];
      }
    }
  };

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
      title: "Home Purchase Savings Calculator",
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
        { label: "Current Vacation Expenses (₹)", min: 25000, max: 5000000, step: 25000, value: 500000, format: "currency" },
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

  const nativeToolConfigs = {
    retirement: {
      kicker: "Risk planning",
      title: "Retirement Corpus Calculator",
      description: "Build the retirement corpus required to protect your future lifestyle.",
      note: "This calculator is for informational and illustrative purposes only and does not constitute investment advice. Actual results may vary with market performance.",
      fields: [
        { label: "Current Age (Y)", min: 18, max: 80, step: 1, value: 30, format: "age" },
        { label: "Retirement Age (Y)", min: 35, max: 85, step: 1, value: 60, format: "age" },
        { label: "Life Expectancy (Y)", min: 50, max: 100, step: 1, value: 85, format: "age" },
        { label: "Current Monthly Expenses (₹)", min: 10000, max: 2000000, step: 5000, value: 50000, format: "currency" },
        { label: "Inflation Rate (%)", min: 1, max: 20, step: 0.5, value: 7, format: "percent" },
        { label: "Expected Return Pre-Retirement (%)", min: 1, max: 25, step: 0.5, value: 14, format: "percent" },
        { label: "Expected Return Post-Retirement (%)", min: 1, max: 20, step: 0.5, value: 7, format: "percent" },
      ],
      calculate(values) {
        const [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, preReturnRate, postReturnRate] = values;
        // Fix off-by-one bug: remove "+ 1" per client feedback
        const yearsToRetirement = Math.max(retirementAge - currentAge, 1);
        const retirementYears = Math.max(lifeExpectancy - retirementAge, 1);
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
        // Standard SIP annuity-due formula (investment at beginning of each month)
        const sipFactor = monthlyReturn
          ? ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn)
          : months;
        const monthlySip = corpus / Math.max(sipFactor, 1);
        const lumpSum = corpus / Math.pow(1 + preReturn, yearsToRetirement);

        return {
          timeline: yearsToRetirement + (yearsToRetirement === 1 ? " year to retirement" : " years to retirement"),
          primaryLabel: "Required corpus at retirement",
          primaryValue: inr(corpus),
          rows: [
            ["Future monthly expenses", inr(futureMonthlyExpenses)],
            ["Planning through monthly SIP", inr(monthlySip)],
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
      description: "Human Life Value & Needs Analysis: size protection across liabilities, living costs, and milestone goals, less existing liquid assets & cover.",
      note: "Needs Analysis accounts for living expenses, debt liabilities, and major future milestones (like children's education & marriage), minus existing life cover and liquid assets to arrive at the net cover needed.",
      fields: [
        { label: "Outstanding Loans & Liabilities (₹)", min: 100000000, max: 250000000, step: 100000, value: 100000000, format: "currency" },
        { label: "Monthly Household Expenses (₹)", min: 10000, max: 2000000, step: 5000, value: 100000, format: "currency" },
        { label: "Protection Duration (Years)", min: 1, max: 40, step: 1, value: 20, format: "years" },
        { label: "Expected Inflation Rate (%)", min: 1, max: 15, step: 0.5, value: 6, format: "percent" },
        { label: "Current FD / Post-Tax Return Rate (%)", min: 1, max: 15, step: 0.5, value: 6, format: "percent" },
        { label: "One-Time Future Goals (Child Education / Marriage) (₹)", min: 0, max: 50000000, step: 250000, value: 5000000, format: "currency" },
        { label: "Existing Life Cover & Liquid Assets (₹)", min: 0, max: 100000000, step: 250000, value: 2500000, format: "currency" },
      ],
      calculate(values) {
        const [loan, monthlyExpenses, years, inflationRate, fdRate, futureGoals, existingAssets] = values;
        const livingExpensesCorpus = sumGrowingExpenses(
          monthlyExpenses * 12,
          inflationRate / 100,
          fdRate / 100,
          years,
        );
        const grossCover = loan + livingExpensesCorpus + futureGoals;
        const netCoverNeeded = Math.max(0, grossCover - existingAssets);
        return {
          timeline: years + (years === 1 ? " year protection horizon" : " years protection horizon"),
          primaryLabel: "Net Additional Life Cover Needed",
          primaryValue: inr(netCoverNeeded),
          rows: [
            ["Gross cover requirement", inr(grossCover)],
            ["Living expenses corpus", inr(livingExpensesCorpus)],
            ["Liabilities & loans", inr(loan)],
            ["One-time family goals", inr(futureGoals)],
            ["Less: Existing cover & assets", "-" + inr(existingAssets)],
          ],
          comparisonTitle: "Needs analysis breakdown",
          comparisonStat: grossCover ? Math.round((livingExpensesCorpus / grossCover) * 100) + "% living expenses" : "0%",
          bars: [
            ["Living Expenses", livingExpensesCorpus],
            ["Loans & Goals", loan + futureGoals],
          ],
        };
      },
    },
    health: {
      kicker: "Risk planning",
      title: "Health Insurance Calculator",
      description: "Size your base indemnity cover and super top-up deductible buffer against medical inflation.",
      note: "Indian medical inflation averages 11%–14% annually. A combination of base cover + super top-up maximizes protection at optimal premiums.",
      fields: [
        { label: "Eldest Member's Current Age (Years)", min: 18, max: 75, step: 1, value: 35, format: "age" },
        { label: "Current Base Hospitalisation Cover Needed Today (₹)", min: 500000, max: 5000000, step: 100000, value: 1500000, format: "currency" },
        { label: "Desired Total Health Cover Today (Base + Super Top-up) (₹)", min: 1000000, max: 20000000, step: 500000, value: 5000000, format: "currency" },
        { label: "Medical Inflation Rate (%)", min: 8, max: 16, step: 0.5, value: 11, format: "percent" },
        { label: "Projection Horizon (Years)", min: 5, max: 35, step: 1, value: 15, format: "years" },
      ],
      calculate(values) {
        const [eldestAge, baseCoverToday, desiredTotalToday, medicalInflation, horizonYears] = values;
        const totalToday = Math.max(baseCoverToday, desiredTotalToday);
        const topUpToday = totalToday - baseCoverToday;
        const inflationFactor = Math.pow(1 + medicalInflation / 100, horizonYears);
        const futureTotal = Math.round(totalToday * inflationFactor);
        const futureBase = Math.round(baseCoverToday * inflationFactor);
        const futureTopUp = futureTotal - futureBase;
        return {
          timeline: horizonYears + " years horizon (" + medicalInflation + "% medical inflation)",
          primaryLabel: "Future Health Cover Needed",
          primaryValue: inr(futureTotal),
          rows: [
            ["Total cover recommended today", inr(totalToday)],
            ["Base indemnity cover today", inr(baseCoverToday)],
            ["Super top-up buffer today", inr(topUpToday)],
            ["Projected future base cover", inr(futureBase)],
            ["Projected future super top-up", inr(futureTopUp)],
          ],
          comparisonTitle: "Medical inflation impact",
          comparisonStat: "+" + Math.round((inflationFactor - 1) * 100) + "% cost rise",
          bars: [
            ["Cover Today", totalToday],
            ["Future Cover (Age " + (eldestAge + horizonYears) + ")", futureTotal],
          ],
        };
      },
    },
    "property-value": {
      kicker: "Home finance",
      title: "Home Affordability Calculator",
      description: "Determine the maximum property purchase price based on your monthly EMI budget and available savings.",
      note: "This calculator is for informational and illustrative purposes only. Final loan sanction depends on bank underwriting and credit eligibility.",
      fields: [
        { label: "Monthly EMI You Can Comfortably Pay (₹)", min: 10000, max: 2000000, step: 5000, value: 100000, format: "currency" },
        { label: "Down Payment Available (₹)", min: 500000, max: 100000000, step: 250000, value: 2500000, format: "currency" },
        { label: "Loan Tenure (Years)", min: 1, max: 30, step: 1, value: 20, format: "years" },
        { label: "Interest Rate (%)", min: 5, max: 20, step: 0.1, value: 8.5, format: "percent" },
      ],
      calculate(values) {
        const [comfortableEmi, downPayment, years, annualRate] = values;
        const monthlyRate = (annualRate / 100) / 12;
        const months = years * 12;
        const loanEligibility = monthlyRate
          ? (comfortableEmi * (1 - Math.pow(1 + monthlyRate, -months))) / monthlyRate
          : comfortableEmi * months;
        const maxProperty = loanEligibility + downPayment;
        const downPaymentPercent = maxProperty > 0 ? Math.round((downPayment / maxProperty) * 100) : 0;
        return {
          timeline: years + (years === 1 ? " year tenure @ " : " years tenure @ ") + annualRate + "%",
          primaryLabel: "Maximum Affordable Property Value",
          primaryValue: inr(maxProperty),
          rows: [
            ["Total loan eligibility", inr(loanEligibility)],
            ["Down payment available", inr(downPayment)],
            ["Monthly EMI you can comfortably pay", inr(comfortableEmi)],
            ["Total loan repayment (P + I)", inr(comfortableEmi * months)],
          ],
          comparisonTitle: "Property funding ratio",
          comparisonStat: downPaymentPercent + "% down payment",
          bars: [
            ["Loan (Eligible)", loanEligibility],
            ["Down Payment", downPayment],
          ],
        };
      },
    },
    "emi-plan": {
      kicker: "Home finance",
      title: "EMI Calculator",
      description: "Calculate the monthly instalment, total interest and complete loan repayment.",
      note: "This calculator is for informational and illustrative purposes only. Actual lending terms may vary.",
      fields: [
        { label: "Loan Amount (₹)", min: 500000, max: 250000000, step: 250000, value: 7500000, format: "currency" },
        { label: "Loan Tenure (Years)", min: 1, max: 30, step: 1, value: 20, format: "years" },
        { label: "Interest Rate (%)", min: 5, max: 20, step: 0.1, value: 8.5, format: "percent" },
      ],
      calculate(values) {
        const [principal, years, annualRate] = values;
        const monthlyRate = (annualRate / 100) / 12;
        const months = years * 12;
        const compound = Math.pow(1 + monthlyRate, months);
        const emiAmount = monthlyRate
          ? (principal * monthlyRate * compound) / (compound - 1)
          : principal / months;
        const total = emiAmount * months;
        const interest = total - principal;
        return {
          timeline: years + (years === 1 ? " year tenure" : " years tenure"),
          primaryLabel: "Monthly Loan EMI",
          primaryValue: inr(emiAmount),
          rows: [
            ["Principal loan amount", inr(principal)],
            ["Total interest payable", inr(interest)],
            ["Total payment (P + I)", inr(total)],
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
    const maxFields = 8;
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
            `${name} portfolio - Direct Growth`,
            `${name} portfolio - Regular Growth`,
            `${name} portfolio - IDCW`,
          ];
        }
        const shortName = name
          .replace(/\s+Mutual Fund.*$/i, "")
          .replace(/\s+-\s+SIF.*$/i, "")
          .trim();
        return [
          `${shortName} - Direct Growth scheme`,
          `${shortName} - Regular Growth scheme`,
          `${shortName} - IDCW scheme`,
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

  

  // Override Tab clicks to sync with URL hash
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabKey = tab.dataset.tab;
      if (REVERSE_MAP[tabKey]) {
        if (history.replaceState) {
          history.replaceState(null, '', '#' + REVERSE_MAP[tabKey]);
        } else {
          location.hash = '#' + REVERSE_MAP[tabKey];
        }
      }
    });
  });

  // Read URL Hash on initial load
  const handleInitialHash = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && TAB_MAP[hash]) {
      activateTab(hash, false);
      // Smooth scroll to calculator tabs
      setTimeout(() => {
        const toolsSec = document.getElementById("tools");
        if (toolsSec) {
          toolsSec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      activateTab("sip", false);
    }
  };

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && TAB_MAP[hash]) {
      activateTab(hash, false);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleInitialHash);
  } else {
    handleInitialHash();
  }

  // Floating scroll to top
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 400);
      backToTop.classList.toggle("visible", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
