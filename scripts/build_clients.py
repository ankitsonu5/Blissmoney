# Builder for Clients Pages (3 pages)
import os
from scripts.layout_helper import render_page

def build_clients_pages():
    os.makedirs('clients/investable-wealth', exist_ok=True)
    os.makedirs('clients/client-segments', exist_ok=True)

    def make_pills(depth, active_slug):
        return ""

    # =========================================================================
    # 1. Who We Work With (depth 1)
    # =========================================================================
    pills_1 = make_pills(1, "who-we-work-with")
    body_1 = '''      <!-- Stats Ribbon -->
      <div class="about-stats-ribbon">
        <div class="about-stat-item">
          <div class="about-stat-number">₹5 Cr+</div>
          <div class="about-stat-label">Minimum Mandate</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">50+</div>
          <div class="about-stat-label">Family Relationships</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">98%</div>
          <div class="about-stat-label">Client Retention</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">100%</div>
          <div class="about-stat-label">Direct Senior Partner Access</div>
        </div>
      </div>

      <!-- Client Archetypes Grid -->
      <section class="about-card">
        <div class="about-section-header">
          <span class="about-section-badge">Client Profiles</span>
          <h2 class="about-section-title">Whom We Are Engineered to Serve</h2>
          <p class="about-section-desc">
            We partner with individuals and families whose financial complexity requires sophisticated multi-asset strategy, independent legal-tax coordination, and relentless research rigor.
          </p>
        </div>

        <div class="about-grid-2">
          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">01</div>
              <h3 class="service-card-title">Founders &amp; Tech Entrepreneurs</h3>
              <p class="service-card-desc">
                Builders navigating major liquidity events, secondary sales, ESOP buybacks, and pre-IPO restructurings. We help institutionalize newly minted wealth, diversify out of concentrated business risk, and engineer defensive asset allocations.
              </p>
            </div>
            <a href="client-segments/" class="service-card-link">View Founder Mandates →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">02</div>
              <h3 class="service-card-title">Promoters &amp; Family Business Owners</h3>
              <p class="service-card-desc">
                Custodians of multi-generational industrial and consumer enterprises seeking clear separation between operating business treasury and private family surplus. We handle family constitution, trust structuring, and dividend reinvestment.
              </p>
            </div>
            <a href="client-segments/" class="service-card-link">View Promoter Mandates →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">03</div>
              <h3 class="service-card-title">Senior Corporate Executives &amp; CXOs</h3>
              <p class="service-card-desc">
                Managing Directors, CEOs, and C-suite leaders with high current income, complex deferred compensation, concentrated employer stock options (RSUs/ESOPs), and limited personal bandwidth to oversee multiple advisor relationships.
              </p>
            </div>
            <a href="client-segments/" class="service-card-link">View Executive Mandates →</a>
          </div>

          <div class="service-feature-card">
            <div>
              <div class="service-icon-box">04</div>
              <h3 class="service-card-title">Global NRIs &amp; Cross-Border Families</h3>
              <p class="service-card-desc">
                Indian citizens and diaspora families across the USA, UK, Singapore, and GCC managing dual-jurisdiction assets, FEMA compliance, NRE/NRO banking structures, and seeking strategic participation in India's macroeconomic growth story.
              </p>
            </div>
            <a href="client-segments/" class="service-card-link">View NRI Mandates →</a>
          </div>
        </div>
      </section>

      <!-- Mutual Criteria Section -->
      <section class="about-card">
        <div class="about-section-header">
          <span class="about-section-badge">Mutual Alignment</span>
          <h2 class="about-section-title">The Partnership Standard</h2>
          <p class="about-section-desc">
            We intentionally cap the number of families each Senior Partner manages to preserve uncompromising advisory depth. In return, we seek clients aligned with our long-term principles.
          </p>
        </div>

        <div class="about-grid-3">
          <div style="padding: 20px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
            <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 10px 0;">Capital Scale</h4>
            <p style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              Minimum investable portfolio commitment of ₹5 Crore, allowing meaningful allocation across private debt, PMS, direct equities, and alternative real assets.
            </p>
          </div>
          <div style="padding: 20px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
            <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 10px 0;">Long-Term Orientation</h4>
            <p style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              Commitment to multi-year compounding (5-10+ year horizons). We do not trade speculative short-term derivatives or chase hot sector tips.
            </p>
          </div>
          <div style="padding: 20px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
            <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 10px 0;">Total Transparency</h4>
            <p style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              Willingness to share the complete balance sheet picture so we can accurately diagnose liabilities, tax drag, and asset-liability mismatches.
            </p>
          </div>
        </div>
      </section>'''

    html_1 = render_page(
        title="Who We Work With — Client Profiles & Partnerships | BlissMoney",
        description="We partner with visionary founders, promoters, corporate executives, and global NRIs seeking uncompromised fiduciary private wealth stewardship.",
        depth=1,
        active_section="clients",
        active_item="clients-overview",
        eyebrow="Private Partnerships",
        hero_title="Who We Work With",
        hero_subtitle="We partner with visionary entrepreneurs, corporate leaders, single-family offices, and generational custodians who demand uncompromised fiduciary stewardship.",
        breadcrumb_links=[("Home", "../"), ("Clients", "./"), ("Who We Work With", "./")],
        pills_html=pills_1,
        body_html=body_1
    )
    with open('clients/index.html', 'w', encoding='utf-8') as f:
        f.write(html_1)

    # =========================================================================
    # 2. Investable Wealth (depth 2)
    # =========================================================================
    pills_2 = make_pills(2, "investable-wealth")
    body_2 = '''      <!-- Wealth Tiers Grid -->
      <section class="about-card">
        <div class="about-section-header">
          <span class="about-section-badge">Tiered Architectures</span>
          <h2 class="about-section-title">Portfolio Architecture Calibrated by Capital Scale</h2>
          <p class="about-section-desc">
            As capital expands, portfolio requirements evolve from mutual fund allocation to bespoke private credit, offshore diversification, and direct co-investments.
          </p>
        </div>

        <div class="about-grid-3">
          <div class="service-feature-card" style="border-color: rgba(12, 175, 128, 0.35);">
            <div>
              <span class="career-badge">Tier 1</span>
              <h3 class="service-card-title">High Net Worth (HNW)</h3>
              <p style="font-size: 1.25rem; font-weight: 700; color: #0CAF80; margin: 8px 0 16px 0;">₹5 Cr – ₹25 Cr</p>
              <ul style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.7; padding-left: 18px; margin: 0 0 20px 0;">
                <li>Direct equity &amp; customized PMS portfolios</li>
                <li>Curated Category-III Long-Short AIFs</li>
                <li>Strategic bucket cashflow modeling</li>
                <li>Personalized tax-loss harvesting</li>
                <li>Annual estate &amp; trust health check</li>
              </ul>
            </div>
            <a href="../../reach-us/" class="btn btn-outline" style="width: 100%; text-align: center;">Inquire Mandate</a>
          </div>

          <div class="service-feature-card" style="border-color: rgba(12, 175, 128, 0.55); background: linear-gradient(165deg, rgba(16, 45, 36, 0.85) 0%, rgba(7, 23, 18, 0.95) 100%);">
            <div>
              <span class="career-badge" style="background: rgba(12, 175, 128, 0.25); color: #19D79F;">Tier 2</span>
              <h3 class="service-card-title">Very High Net Worth (VHNW)</h3>
              <p style="font-size: 1.25rem; font-weight: 700; color: #19D79F; margin: 8px 0 16px 0;">₹25 Cr – ₹100 Cr</p>
              <ul style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.7; padding-left: 18px; margin: 0 0 20px 0;">
                <li>Private credit &amp; mezzanine debt syndication</li>
                <li>Pre-leased Grade-A commercial real estate</li>
                <li>Category-II Venture &amp; Growth PE syndicates</li>
                <li>Family trust &amp; succession charter execution</li>
                <li>Direct liquidity lines against portfolio</li>
              </ul>
            </div>
            <a href="../../reach-us/" class="btn btn-primary" style="width: 100%; text-align: center;">Inquire Mandate</a>
          </div>

          <div class="service-feature-card" style="border-color: rgba(12, 175, 128, 0.35);">
            <div>
              <span class="career-badge">Tier 3</span>
              <h3 class="service-card-title">Family Office &amp; UHNW</h3>
              <p style="font-size: 1.25rem; font-weight: 700; color: #0CAF80; margin: 8px 0 16px 0;">₹100 Cr+</p>
              <ul style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.7; padding-left: 18px; margin: 0 0 20px 0;">
                <li>Virtual / Dedicated Single Family Office (SFO)</li>
                <li>Direct founder-to-founder co-investments</li>
                <li>Cross-border multi-currency treasury</li>
                <li>Operating enterprise governance &amp; M&amp;A credit</li>
                <li>Next-gen wealth leadership academy</li>
              </ul>
            </div>
            <a href="../../reach-us/" class="btn btn-outline" style="width: 100%; text-align: center;">Inquire Mandate</a>
          </div>
        </div>
      </section>'''

    html_2 = render_page(
        title="Investable Wealth & Portfolio Tiers | BlissMoney Private Advisory",
        description="Tailored wealth management mandates calibrated to your capital scale: HNW (₹5-25 Cr), VHNW (₹25-100 Cr), and Family Office (₹100 Cr+).",
        depth=2,
        active_section="clients",
        active_item="clients-investable-wealth",
        eyebrow="Portfolio Archetypes",
        hero_title="Investable Wealth &amp; Capital Tiers",
        hero_subtitle="Tailored wealth management mandates calibrated to your capital scale, risk parameters, and liquidity objectives.",
        breadcrumb_links=[("Home", "../../"), ("Clients", "../"), ("Investable Wealth", "./")],
        pills_html=pills_2,
        body_html=body_2
    )
    with open('clients/investable-wealth/index.html', 'w', encoding='utf-8') as f:
        f.write(html_2)

    # =========================================================================
    # 3. Client Segments (depth 2)
    # =========================================================================
    pills_3 = make_pills(2, "client-segments")
    body_3 = '''      <!-- Client Segments Grid -->
      <div class="about-grid-2">
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Segment 01</span>
            <h2 class="about-section-title">Startup Founders &amp; Tech Innovators</h2>
            <p class="about-section-desc">
              From Series B secondary liquidity to blockbuster IPO exits, we help founders turn illiquid paper gains into fortress generational capital.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Pre-liquidity trust structuring before ESOP exercise or share buyback.</li>
            <li>Post-exit capital deployment protecting founders from reckless angel dispersion.</li>
            <li>Concentrated founder stock risk hedging and low-cost liquidity lines.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Segment 02</span>
            <h2 class="about-section-title">Senior Corporate CXOs &amp; Board Directors</h2>
            <p class="about-section-desc">
              Bespoke advisory addressing complex salary structures, deferred bonuses, multi-national stock options, and retirement milestones.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Holistic RSU/ESOP monetization schedule factoring lock-in periods.</li>
            <li>Personal asset ringfencing protecting personal wealth from board liability claims.</li>
            <li>Tax-optimized capital transition from high active salary to self-sustaining passive cashflow.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Segment 03</span>
            <h2 class="about-section-title">Multi-Generational Business Families</h2>
            <p class="about-section-desc">
              Balancing operating enterprise capital requirements with family lifestyle continuity and generational wealth protection.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Family constitution and formal governance charters avoiding sibling disputes.</li>
            <li>Operating company dividend reinvestment into diversified asset classes.</li>
            <li>Private family trust architecture ringfenced from business creditor liabilities.</li>
          </ul>
        </section>

        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Segment 04</span>
            <h2 class="about-section-title">Non-Resident Indians (NRIs) &amp; Global Citizens</h2>
            <p class="about-section-desc">
              Seamless cross-border wealth management enabling global Indians to participate in India's growth with zero tax surprises.
            </p>
          </div>
          <ul style="color: #D1E3DC; font-size: 0.95rem; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>FEMA and RBI regulatory compliance across NRE, NRO, and FCNR accounts.</li>
            <li>Repatriation assistance with Form 15CA/CB documentation support.</li>
            <li>Double Taxation Avoidance Agreement (DTAA) optimization across USA, UAE, UK, and Singapore.</li>
          </ul>
        </section>
      </div>'''

    html_3 = render_page(
        title="Dedicated Client Segments | BlissMoney Private Wealth",
        description="Specialized private wealth management playbooks for tech founders, corporate CXOs, multi-generational business families, and global NRIs.",
        depth=2,
        active_section="clients",
        active_item="clients-client-segments",
        eyebrow="Specialized Mandates",
        hero_title="Dedicated Client Segments",
        hero_subtitle="Specialized advisory playbooks tailored to the unique financial dynamics of founders, executives, families, and global Indians.",
        breadcrumb_links=[("Home", "../../"), ("Clients", "../"), ("Client Segments", "./")],
        pills_html=pills_3,
        body_html=body_3
    )
    with open('clients/client-segments/index.html', 'w', encoding='utf-8') as f:
        f.write(html_3)

    print('All 3 Clients pages generated successfully!')

if __name__ == '__main__':
    build_clients_pages()
