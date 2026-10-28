# Builder for Services Pages (7 pages)
import os
from scripts.layout_helper import render_page

def build_services_pages():
    os.makedirs('services/financial-planning', exist_ok=True)
    os.makedirs('services/estate-succession-planning', exist_ok=True)
    os.makedirs('services/real-estate-advisory', exist_ok=True)
    os.makedirs('services/lending', exist_ok=True)
    os.makedirs('services/insurance-risk-planning', exist_ok=True)
    os.makedirs('services/philanthropy', exist_ok=True)

    def make_pills(depth, active_slug):
        return ""

    # =========================================================================
    # 1. Services Overview (depth 1)
    # =========================================================================
    pills_1 = make_pills(1, "overview")
    body_1 = '''      <!-- Stats Ribbon -->
      <div class="about-stats-ribbon">
        <div class="about-stat-item">
          <div class="about-stat-number">100%</div>
          <div class="about-stat-label">Fiduciary Standard</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">₹1,500+ Cr</div>
          <div class="about-stat-label">Advisory Capital</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">25+ Yrs</div>
          <div class="about-stat-label">Leadership Experience</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">0%</div>
          <div class="about-stat-label">Product Brokerage Bias</div>
        </div>
      </div>

      <!-- Services Grid -->
      <section class="about-card">
        <div class="about-section-header">
          <span class="about-section-badge">Core Pillars</span>
          <h2 class="about-section-title">Institutional Wealth Services</h2>
          <p class="about-section-desc">
            Each advisory capability operates in synergy to preserve capital, compound returns across market cycles, and structure generational transfers.
          </p>
        </div>

        <div class="about-grid-3">
          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">01</div>
              <h3 class="service-card-title">Financial Planning</h3>
              <p class="service-card-desc">
                Multi-decade cashflow modeling, bucket asset allocation, and liquidity architectures customized for complex personal balance sheets.
              </p>
            </div>
            <a href="financial-planning/" class="service-card-link">Explore Financial Planning →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">02</div>
              <h3 class="service-card-title">Estate &amp; Succession</h3>
              <p class="service-card-desc">
                Private family trusts, family charters, operating company succession, and cross-border asset ringfencing to eliminate probate conflicts.
              </p>
            </div>
            <a href="estate-succession-planning/" class="service-card-link">Explore Estate Planning →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">03</div>
              <h3 class="service-card-title">Real Estate Advisory</h3>
              <p class="service-card-desc">
                Unbiased institutional diligence across pre-leased commercial Grade-A yields (8-10%), prime residential portfolios, and REIT syndications.
              </p>
            </div>
            <a href="real-estate-advisory/" class="service-card-link">Explore Real Estate Advisory →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">04</div>
              <h3 class="service-card-title">Private Lending</h3>
              <p class="service-card-desc">
                Bespoke liquidity against shares, mutual funds, and commercial property at premier institutional rates without triggering capital gains taxes.
              </p>
            </div>
            <a href="lending/" class="service-card-link">Explore Lending Solutions →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">05</div>
              <h3 class="service-card-title">Insurance &amp; Risk</h3>
              <p class="service-card-desc">
                Capital preservation shields including high-sum Key-Man cover, D&O liability protection, and MWP Act ringfenced family policies.
              </p>
            </div>
            <a href="insurance-risk-planning/" class="service-card-link">Explore Insurance &amp; Risk →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">06</div>
              <h3 class="service-card-title">Strategic Philanthropy</h3>
              <p class="service-card-desc">
                Designing lasting philanthropic vehicles, Section 8 foundations, and blended impact endowments that institutionalize your family values.
              </p>
            </div>
            <a href="philanthropy/" class="service-card-link">Explore Philanthropy →</a>
          </div>
        </div>
      </section>

      <!-- Comparison Section -->
      <section class="about-card">
        <div class="about-section-header">
          <span class="about-section-badge">The Fiduciary Difference</span>
          <h2 class="about-section-title">Traditional Banking vs. BlissMoney Advisory</h2>
          <p class="about-section-desc">
            Why visionary founders and prominent family offices choose BlissMoney over legacy private bank distribution desks.
          </p>
        </div>

        <div class="comparison-table-wrap">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Traditional Private Bank</th>
                <th class="table-highlight">BlissMoney Private Advisory</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Incentive Model</strong></td>
                <td>Commission-driven product sales with internal distributor quotas</td>
                <td class="table-highlight">100% Fee-only fiduciary mandate aligned exclusively with portfolio growth</td>
              </tr>
              <tr>
                <td><strong>Asset Universe</strong></td>
                <td>Restricted to proprietary products and revenue-sharing AMCs</td>
                <td class="table-highlight">Open architecture spanning direct equities, AIFs, private debt, and global funds</td>
              </tr>
              <tr>
                <td><strong>Advisor Relationship</strong></td>
                <td>High turnover; account transferred between junior relationship managers</td>
                <td class="table-highlight">Direct, long-term access to Senior Partners with equity ownership</td>
              </tr>
              <tr>
                <td><strong>Scope of Advice</strong></td>
                <td>Limited to liquid financial investment accounts</td>
                <td class="table-highlight">Holistic balance sheet including operating companies, real estate, and trusts</td>
              </tr>
              <tr>
                <td><strong>Reporting</strong></td>
                <td>Fragmented monthly statements across separate entities</td>
                <td class="table-highlight">Single consolidated institutional portal with real-time analytics and IRR tracking</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>'''

    html_1 = render_page(
        title="Services Overview — Private Wealth Architecture | BlissMoney",
        description="Explore BlissMoney's comprehensive suite of private wealth advisory services: financial planning, estate succession, real estate, lending, insurance, and philanthropy.",
        depth=1,
        active_section="services",
        active_item="services-overview",
        eyebrow="Our Expertise",
        hero_title="Private Wealth Architecture &amp; Advisory",
        hero_subtitle="Bespoke fiduciary advisory engineered to protect, compound, and transition intergenerational capital for entrepreneurs and family offices.",
        breadcrumb_links=[("Home", "../"), ("Services", "./"), ("Overview", "./")],
        pills_html=pills_1,
        body_html=body_1
    )
    with open('services/index.html', 'w', encoding='utf-8') as f:
        f.write(html_1)

    # =========================================================================
    # 2. Financial Planning (depth 2)
    # =========================================================================
    pills_2 = make_pills(2, "financial-planning")
    body_2 = '''      <div class="about-grid-2">
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Strategic Discipline</span>
            <h2 class="about-section-title">Multi-Decade Cashflow Modeling</h2>
            <p class="about-section-desc">
              We translate multi-dimensional balance sheets into rigorous cashflow models that stress-test liquidity events, inflation, and capital deployments.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li><strong style="color: #FFFFFF;">Bucket Allocation Architecture:</strong> Dividing capital into Immediate Liquidity (0-2 yrs), Core Compounding (3-7 yrs), and Generational Growth (7+ yrs).</li>
            <li><strong style="color: #FFFFFF;">Tax-Efficient Withdrawal Strategies:</strong> Sequencing liquidations to optimize Long-Term Capital Gains (LTCG) and dividend taxation.</li>
            <li><strong style="color: #FFFFFF;">Monte Carlo Stress Simulations:</strong> Running 1,000+ stochastic iterations testing 2008-style liquidity freezes and prolonged inflation spikes.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Client Deliverables</span>
            <h2 class="about-section-title">The Private Wealth Blueprint</h2>
            <p class="about-section-desc">
              A comprehensive institutional master document outlining your net worth trajectory, allocation guardrails, and tactical action items.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Comprehensive 40+ page tailored balance sheet diagnosis.</li>
            <li>Strategic asset allocation mandate benchmarks with target rebalancing triggers.</li>
            <li>Executive dashboard consolidating mutual funds, direct equities, PMS, and AIF holdings.</li>
            <li>Quarterly formal audit and macroeconomic risk review with your Senior Partner.</li>
          </ul>
        </section>
      </div>'''

    html_2 = render_page(
        title="Financial Planning & Cashflow Modeling | BlissMoney",
        description="Comprehensive multi-decade financial planning, cashflow modeling, and bucket asset allocation for high-net-worth families and entrepreneurs.",
        depth=2,
        active_section="services",
        active_item="services-financial-planning",
        eyebrow="Strategic Blueprint",
        hero_title="Financial Planning &amp; Cashflow Modeling",
        hero_subtitle="Granular multi-decade financial modeling aligning liquidity events, tax efficiency, growth horizons, and risk tolerance.",
        breadcrumb_links=[("Home", "../../"), ("Services", "../"), ("Financial Planning", "./")],
        pills_html=pills_2,
        body_html=body_2
    )
    with open('services/financial-planning/index.html', 'w', encoding='utf-8') as f:
        f.write(html_2)

    # =========================================================================
    # 3. Estate & Succession Planning (depth 2)
    # =========================================================================
    pills_3 = make_pills(2, "estate-succession-planning")
    body_3 = '''      <div class="about-grid-2">
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Legacy Architecture</span>
            <h2 class="about-section-title">Private Family Trusts &amp; Governance</h2>
            <p class="about-section-desc">
              Shielding family assets from future liabilities, matrimonial disputes, and probate delay through customized trust deeds and family charters.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li><strong style="color: #FFFFFF;">Private Family Trust Drafting:</strong> Designing determinate and indeterminate revocable and irrevocable trusts tailored to tax efficiency.</li>
            <li><strong style="color: #FFFFFF;">Family Constitution:</strong> Codifying values, voting protocols, conflict-resolution mechanisms, and next-generation induction rules.</li>
            <li><strong style="color: #FFFFFF;">Probate Bypass:</strong> Ensuring immediate, uninterrupted transfer of operating assets without costly court probate procedures.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Business Continuity</span>
            <h2 class="about-section-title">Enterprise &amp; Cross-Border Structuring</h2>
            <p class="about-section-desc">
              Structuring the seamless transfer of operating company equity while keeping non-active heirs provided for without diluting management control.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Operating company shareholding separation: Economic interest vs. voting control.</li>
            <li>Cross-border inheritance harmonization across India, USA, UK, Singapore, and UAE jurisdictions.</li>
            <li>Asset ringfencing against commercial lawsuits, bankruptcy, and systemic creditor claims.</li>
            <li>End-to-end execution with Tier-1 corporate and succession legal counsels.</li>
          </ul>
        </section>
      </div>'''

    html_3 = render_page(
        title="Estate & Succession Planning | BlissMoney Private Advisory",
        description="Preserve family wealth, business continuity, and legacy across generations with private family trusts, wills, and institutional governance frameworks.",
        depth=2,
        active_section="services",
        active_item="services-estate-succession-planning",
        eyebrow="Generational Legacy",
        hero_title="Estate &amp; Family Succession Planning",
        hero_subtitle="Preserving family wealth, business continuity, and values across generations with institutional trust structures and seamless transition frameworks.",
        breadcrumb_links=[("Home", "../../"), ("Services", "../"), ("Estate & Succession Planning", "./")],
        pills_html=pills_3,
        body_html=body_3
    )
    with open('services/estate-succession-planning/index.html', 'w', encoding='utf-8') as f:
        f.write(html_3)

    # =========================================================================
    # 4. Real Estate Advisory (depth 2)
    # =========================================================================
    pills_4 = make_pills(2, "real-estate-advisory")
    body_4 = '''      <div class="about-grid-2">
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Institutional Rigor</span>
            <h2 class="about-section-title">Commercial Yield &amp; Grade-A Assets</h2>
            <p class="about-section-desc">
              We source and evaluate pre-leased Grade-A commercial properties offering consistent 8-10% net cash rental yields with institutional tenants.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li><strong style="color: #FFFFFF;">Zero Broker Bias:</strong> We represent you as a pure buy-side advisor; zero commission kickbacks from property developers.</li>
            <li><strong style="color: #FFFFFF;">Legal &amp; Title Forensic Audit:</strong> 30-year title trace, municipal compliance, and encumbrance verification.</li>
            <li><strong style="color: #FFFFFF;">Tenant Quality Scrutiny:</strong> Multi-national creditworthiness, lease escalation clauses, and lock-in durability.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Portfolio Scope</span>
            <h2 class="about-section-title">Prime Residential &amp; Syndications</h2>
            <p class="about-section-desc">
              Curated access to luxury residential assets, fractional real estate syndications, and listed REIT portfolio architectures.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Luxury trophy residential acquisitions in prime micro-markets (Mumbai, Delhi-NCR, Bengaluru, Goa).</li>
            <li>Fractional ownership platforms and SEBI-regulated SM-REIT structures for diversified commercial exposure.</li>
            <li>Tax-advantaged reinvestment under Section 54/54F for capital gains sheltering.</li>
            <li>Property lifecycle management: lease structuring, property tax filings, and exit liquidation.</li>
          </ul>
        </section>
      </div>'''

    html_4 = render_page(
        title="Real Estate Advisory — Commercial Yield & Prime Assets | BlissMoney",
        description="Independent real estate advisory for high-net-worth investors: Grade-A pre-leased commercial assets, luxury residential portfolios, and REIT syndications.",
        depth=2,
        active_section="services",
        active_item="services-real-estate-advisory",
        eyebrow="Alternative Real Assets",
        hero_title="Strategic Real Estate Advisory",
        hero_subtitle="Independent, institutional due diligence across Grade-A commercial yields, luxury prime residential acquisitions, and REIT syndications.",
        breadcrumb_links=[("Home", "../../"), ("Services", "../"), ("Real Estate Advisory", "./")],
        pills_html=pills_4,
        body_html=body_4
    )
    with open('services/real-estate-advisory/index.html', 'w', encoding='utf-8') as f:
        f.write(html_4)

    # =========================================================================
    # 5. Lending (depth 2)
    # =========================================================================
    pills_5 = make_pills(2, "lending")
    body_5 = '''      <div class="about-grid-2">
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Liquidity Without Selling</span>
            <h2 class="about-section-title">Loan Against Securities (LAS)</h2>
            <p class="about-section-desc">
              Unlock immediate liquidity against equity shares, mutual funds, and bonds without selling your holdings and triggering capital gains tax.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li><strong style="color: #FFFFFF;">Fast-Track Processing:</strong> Digital collateral pledge and credit line setup within 48 to 72 hours.</li>
            <li><strong style="color: #FFFFFF;">Low Institutional Rates:</strong> Negotiated rates through our partner banking consortium starting from competitive institutional benchmarks.</li>
            <li><strong style="color: #FFFFFF;">Flexible Overdraft Facility:</strong> Pay interest only on the amount drawn, with zero prepayment penalties.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Structured Credit</span>
            <h2 class="about-section-title">LAP &amp; Promoter Financing</h2>
            <p class="about-section-desc">
              Structured debt solutions against high-value commercial and residential real estate for business expansion or secondary share acquisitions.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Loan Against Property (LAP) with flexible tenures up to 15 years and ticket sizes from ₹5 Cr to ₹100 Cr+.</li>
            <li>Promoter funding and mezzanine capital for pre-IPO secondary transactions and ESOP financing.</li>
            <li>Multi-bank syndication to ensure optimal loan-to-value (LTV) ratios and covenant covenants.</li>
            <li>Dedicated credit advisory team structuring repayment schedules matched to your business dividend flows.</li>
          </ul>
        </section>
      </div>'''

    html_5 = render_page(
        title="Private Wealth Lending & Liquidity Solutions | BlissMoney",
        description="Unlock low-cost liquidity against equity portfolios, mutual funds, and real estate without triggering capital gains taxes.",
        depth=2,
        active_section="services",
        active_item="services-lending",
        eyebrow="Capital Structuring",
        hero_title="Private Wealth Lending &amp; Liquidity Solutions",
        hero_subtitle="Unlock low-cost liquidity against marketable securities, real estate, and private equity without triggering premature tax liquidation.",
        breadcrumb_links=[("Home", "../../"), ("Services", "../"), ("Lending", "./")],
        pills_html=pills_5,
        body_html=body_5
    )
    with open('services/lending/index.html', 'w', encoding='utf-8') as f:
        f.write(html_5)

    # =========================================================================
    # 6. Insurance and Risk Planning (depth 2)
    # =========================================================================
    pills_6 = make_pills(2, "insurance-risk-planning")
    body_6 = '''      <div class="about-grid-2">
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Asset Insulation</span>
            <h2 class="about-section-title">Enterprise &amp; Executive Shields</h2>
            <p class="about-section-desc">
              Protect your enterprise balance sheet and key decision-makers from catastrophic liabilities, lawsuits, and sudden leadership disruptions.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li><strong style="color: #FFFFFF;">Key-Man Insurance:</strong> Insuring critical executives and technical co-founders to protect business enterprise value.</li>
            <li><strong style="color: #FFFFFF;">Directors &amp; Officers (D&O) Liability:</strong> Insulating personal estates from shareholder lawsuits, regulatory investigations, and corporate claims.</li>
            <li><strong style="color: #FFFFFF;">Partnership Protection:</strong> Cross-purchase structures ensuring smooth share buyouts upon unexpected partner demise.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Family Preservation</span>
            <h2 class="about-section-title">MWPA &amp; Global Healthcare Shields</h2>
            <p class="about-section-desc">
              Ringfencing family policies under statutory legal frameworks to ensure policy proceeds cannot be attached by creditors or courts.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li><strong style="color: #FFFFFF;">Married Women's Property Act (MWPA):</strong> High-sum term insurance ringfenced exclusively for spouse and children, immune to court attachment.</li>
            <li><strong style="color: #FFFFFF;">Global Medical &amp; Critical Care:</strong> Multi-currency overseas medical coverage with cashless admission at world-renowned hospitals.</li>
            <li><strong style="color: #FFFFFF;">Forensic Policy Audit:</strong> Scrutinizing legacy policies for hidden exclusions, suboptimal premium structures, and insurer solvency.</li>
          </ul>
        </section>
      </div>'''

    html_6 = render_page(
        title="Insurance and Risk Planning | BlissMoney Private Advisory",
        description="Protect your enterprise, family wealth, and estate from liabilities, litigation, and health shocks with bespoke risk management frameworks.",
        depth=2,
        active_section="services",
        active_item="services-insurance-risk-planning",
        eyebrow="Capital Preservation",
        hero_title="Insurance &amp; Holistic Risk Planning",
        hero_subtitle="Insulating your enterprise, wealth, and family from systemic volatility, liability claims, and critical vulnerabilities.",
        breadcrumb_links=[("Home", "../../"), ("Services", "../"), ("Insurance and Risk Planning", "./")],
        pills_html=pills_6,
        body_html=body_6
    )
    with open('services/insurance-risk-planning/index.html', 'w', encoding='utf-8') as f:
        f.write(html_6)

    # =========================================================================
    # 7. Philanthropy (depth 2)
    # =========================================================================
    pills_7 = make_pills(2, "philanthropy")
    body_7 = '''      <div class="about-grid-2">
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Purposeful Giving</span>
            <h2 class="about-section-title">Foundation &amp; Endowment Structuring</h2>
            <p class="about-section-desc">
              Transforming charitable intention into enduring, professionally governed family foundations that compound impact over generations.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li><strong style="color: #FFFFFF;">Legal Vehicle Architecture:</strong> Establishing Section 8 non-profit companies and public charitable trusts with 12A/80G registrations.</li>
            <li><strong style="color: #FFFFFF;">Perpetual Endowment Design:</strong> Allocating capital into low-volatility yield instruments that generate consistent annual grant budgets.</li>
            <li><strong style="color: #FFFFFF;">Next-Gen Inception:</strong> Involving heirs on advisory boards to impart financial stewardship and family values early.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Impact Measurement</span>
            <h2 class="about-section-title">Blended Finance &amp; ESG Alignment</h2>
            <p class="about-section-desc">
              Deploying catalytic capital into social enterprises, green bonds, and impact funds with measurable social and environmental outcomes.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Rigorous NGO partner vetting, financial due diligence, and regulatory compliance (FCRA, CSR-1).</li>
            <li>Social Return on Investment (SROI) monitoring frameworks and milestone-based grant releases.</li>
            <li>Integration of ESG standards across family operating companies and public investment portfolios.</li>
          </ul>
        </section>
      </div>'''

    html_7 = render_page(
        title="Philanthropy & Social Impact Structuring | BlissMoney",
        description="Design enduring philanthropic vehicles, family foundations, and impact endowments that create measurable societal change.",
        depth=2,
        active_section="services",
        active_item="services-philanthropy",
        eyebrow="Purposeful Impact",
        hero_title="Strategic Philanthropy &amp; Social Impact",
        hero_subtitle="Designing enduring philanthropic vehicles, impact endowments, and family foundations to create measurable societal impact.",
        breadcrumb_links=[("Home", "../../"), ("Services", "../"), ("Philanthropy", "./")],
        pills_html=pills_7,
        body_html=body_7
    )
    with open('services/philanthropy/index.html', 'w', encoding='utf-8') as f:
        f.write(html_7)

    print('All 7 Services pages generated successfully!')

if __name__ == '__main__':
    build_services_pages()
