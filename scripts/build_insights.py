# Builder for Insights Pages (5 pages)
import os
from scripts.layout_helper import render_page

def build_insights_pages():
    os.makedirs('insights/articles', exist_ok=True)
    os.makedirs('insights/reports', exist_ok=True)
    os.makedirs('insights/videos', exist_ok=True)
    os.makedirs('insights/podcasts', exist_ok=True)

    def make_pills(depth, active_slug):
        return ""

    # =========================================================================
    # 1. Insights Overview / Hub (depth 1)
    # =========================================================================
    pills_1 = make_pills(1, "overview")
    body_1 = '''      <div class="about-grid-2">
        <div class="service-feature-card">
          <div>
            <span class="career-badge">Featured Analysis</span>
            <h3 class="service-card-title">Research Articles</h3>
            <p class="service-card-desc">
              Timely strategic commentary on Indian equity valuations, global monetary policy, SEBI regulatory updates, and tactical allocation shifts.
            </p>
          </div>
          <a href="articles/" class="service-card-link">Browse All Articles →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Institutional Intel</span>
            <h3 class="service-card-title">Quarterly Whitepapers &amp; Reports</h3>
            <p class="service-card-desc">
              Data-intensive research papers dissecting private debt markets, real estate yields, family office governance, and estate ringfencing.
            </p>
          </div>
          <a href="reports/" class="service-card-link">Download Reports →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Visual Briefings</span>
            <h3 class="service-card-title">Video Market Briefings</h3>
            <p class="service-card-desc">
              Executive discussions with senior partners analyzing quarterly earnings seasons, geopolitical shocks, and portfolio risk management.
            </p>
          </div>
          <a href="videos/" class="service-card-link">Watch Videos →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Audio Deep Dives</span>
            <h3 class="service-card-title">The BlissMoney Podcast</h3>
            <p class="service-card-desc">
              Unfiltered, in-depth conversations with institutional CIOs, unicorn founders, and generational custodians on wealth creation and preservation.
            </p>
          </div>
          <a href="podcasts/" class="service-card-link">Listen to Episodes →</a>
        </div>
      </div>'''

    html_1 = render_page(
        title="Insights & Intelligence Hub | BlissMoney Private Wealth",
        description="Proprietary market insights, macroeconomic research, quarterly reports, video briefings, and wealth management podcasts from BlissMoney.",
        depth=1,
        active_section="insights",
        active_item="insights-overview",
        eyebrow="Intel & Media",
        hero_title="BlissMoney Intelligence Hub",
        hero_subtitle="Original research, macroeconomic forecasts, and proprietary investment frameworks from our research desk.",
        breadcrumb_links=[("Home", "../"), ("Insights", "./"), ("Overview", "./")],
        pills_html=pills_1,
        body_html=body_1
    )
    with open('insights/index.html', 'w', encoding='utf-8') as f:
        f.write(html_1)

    # =========================================================================
    # 2. Articles (depth 2)
    # =========================================================================
    pills_2 = make_pills(2, "articles")
    body_2 = '''      <div class="about-grid-3">
        <div class="service-feature-card">
          <div>
            <span class="career-badge">Equities &amp; Macro</span>
            <h3 class="service-card-title" style="font-size: 1.15rem;">Weekly Market Briefing: Rate Cuts and Valuation Pressures</h3>
            <p class="service-card-desc" style="font-size: 0.88rem;">
              An analysis of central bank interest rate trajectories, mid-cap valuation spreads, and tactical asset allocation strategies for private investors.
            </p>
          </div>
          <a href="../../blog-weekly-market-briefing.html" class="service-card-link">Read Full Briefing →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Global Markets</span>
            <h3 class="service-card-title" style="font-size: 1.15rem;">US Economy &amp; Sticky Inflation: Ramifications for Indian Assets</h3>
            <p class="service-card-desc" style="font-size: 0.88rem;">
              How US Treasury yield spikes and strong dollar dynamics impact emerging market capital flows, FII positioning, and Indian rupee stability.
            </p>
          </div>
          <a href="../../blog-us-economy.html" class="service-card-link">Read Full Analysis →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Alternative Alpha</span>
            <h3 class="service-card-title" style="font-size: 1.15rem;">Thematic Mutual Funds: Growth Catalyst or Timing Trap?</h3>
            <p class="service-card-desc" style="font-size: 0.88rem;">
              Quantitative scrutiny of thematic fund performance across 3-year post-launch horizons and the structural risks of chasing trending sectors.
            </p>
          </div>
          <a href="../../blog-thematic-mutual-funds.html" class="service-card-link">Read Full Article →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Regulatory Intel</span>
            <h3 class="service-card-title" style="font-size: 1.15rem;">SEBI Mutual Fund Rules: What High-Net-Worth Portfolios Need to Know</h3>
            <p class="service-card-desc" style="font-size: 0.88rem;">
              Understanding the recent regulatory frameworks around total expense ratio transparency, stress-testing mandates, and small-cap liquidity disclosures.
            </p>
          </div>
          <a href="../../blog-sebi-mutual-fund-rules.html" class="service-card-link">Read Full Guide →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Market Wrap</span>
            <h3 class="service-card-title" style="font-size: 1.15rem;">Market Wrap 5 May: Navigating Earnings Season Volatility</h3>
            <p class="service-card-desc" style="font-size: 0.88rem;">
              Review of corporate earnings surprises, sectoral rotation into banking and capital goods, and cash deployment triggers.
            </p>
          </div>
          <a href="../../blog-market-wrap-5-may.html" class="service-card-link">Read Market Wrap →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Market Wrap</span>
            <h3 class="service-card-title" style="font-size: 1.15rem;">Market Wrap 15 April: Geopolitical Shocks &amp; Safe-Haven Assets</h3>
            <p class="service-card-desc" style="font-size: 0.88rem;">
              Gold allocation frameworks and sovereign debt hedging during times of sudden regional instability and commodity spikes.
            </p>
          </div>
          <a href="../../blog-market-wrap-15-april.html" class="service-card-link">Read Market Wrap →</a>
        </div>
      </div>'''

    html_2 = render_page(
        title="Research Articles & Market Analysis | BlissMoney",
        description="Read research articles, market analysis, and fiduciary perspectives from the BlissMoney investment committee.",
        depth=2,
        active_section="insights",
        active_item="insights-articles",
        eyebrow="Market Perspectives",
        hero_title="Research Articles &amp; Market Analysis",
        hero_subtitle="Timely strategic commentary on Indian equity valuations, global monetary policy, and private asset opportunities.",
        breadcrumb_links=[("Home", "../../"), ("Insights", "../"), ("Articles", "./")],
        pills_html=pills_2,
        body_html=body_2
    )
    with open('insights/articles/index.html', 'w', encoding='utf-8') as f:
        f.write(html_2)

    # =========================================================================
    # 3. Reports (depth 2)
    # =========================================================================
    pills_3 = make_pills(2, "reports")
    body_3 = '''      <div class="about-grid-2">
        <div class="service-feature-card" style="padding: 36px;">
          <div>
            <span class="career-badge">Annual Flagship Report</span>
            <h3 class="service-card-title">India Private Wealth Outlook 2026–2030</h3>
            <p class="service-card-desc">
              A comprehensive 48-page study analyzing the structural wealth creation boom across Tier-1 and Tier-2 Indian cities, family office formalization, and tactical asset allocation models.
            </p>
            <div style="font-size: 0.85rem; color: #0CAF80; margin-bottom: 20px;">
              Format: Institutional PDF • 48 Pages • Released October 2026
            </div>
          </div>
          <a href="../../reach-us/" class="btn btn-outline" style="text-align: center;">Request Institutional Copy</a>
        </div>

        <div class="service-feature-card" style="padding: 36px;">
          <div>
            <span class="career-badge">Alternative Credit</span>
            <h3 class="service-card-title">Private Debt in India: Risk-Adjusted Alpha</h3>
            <p class="service-card-desc">
              Evaluating Category-II private credit funds against traditional fixed deposits and corporate bonds. Yield underwriting, security cover analysis, and default probability models.
            </p>
            <div style="font-size: 0.85rem; color: #0CAF80; margin-bottom: 20px;">
              Format: Research Whitepaper • 32 Pages • Released August 2026
            </div>
          </div>
          <a href="../../reach-us/" class="btn btn-outline" style="text-align: center;">Request Institutional Copy</a>
        </div>

        <div class="service-feature-card" style="padding: 36px;">
          <div>
            <span class="career-badge">Governance Handbook</span>
            <h3 class="service-card-title">Family Office Governance &amp; Constitution Playbook</h3>
            <p class="service-card-desc">
              Practical blueprint for business families drafting their first family charter, establishing investment committees, and inducting second-generation heirs into asset governance.
            </p>
            <div style="font-size: 0.85rem; color: #0CAF80; margin-bottom: 20px;">
              Format: Executive Guide • 28 Pages • Released July 2026
            </div>
          </div>
          <a href="../../reach-us/" class="btn btn-outline" style="text-align: center;">Request Institutional Copy</a>
        </div>

        <div class="service-feature-card" style="padding: 36px;">
          <div>
            <span class="career-badge">Estate Architecture</span>
            <h3 class="service-card-title">Estate Tax &amp; Asset Ringfencing Guide</h3>
            <p class="service-card-desc">
              An exhaustive legal-tax analysis on the Married Women's Property Act, private irrevocable trust structuring, and ringfencing personal assets from enterprise commercial liabilities.
            </p>
            <div style="font-size: 0.85rem; color: #0CAF80; margin-bottom: 20px;">
              Format: Legal Whitepaper • 36 Pages • Released June 2026
            </div>
          </div>
          <a href="../../reach-us/" class="btn btn-outline" style="text-align: center;">Request Institutional Copy</a>
        </div>
      </div>'''

    html_3 = render_page(
        title="Quarterly Reports & Whitepapers | BlissMoney Research",
        description="Download institutional private wealth whitepapers, macro reports, family office governance playbooks, and asset allocation studies.",
        depth=2,
        active_section="insights",
        active_item="insights-reports",
        eyebrow="Institutional Research",
        hero_title="Quarterly Reports &amp; Whitepapers",
        hero_subtitle="In-depth, data-driven research documents providing comprehensive asset class analysis and strategic asset allocation guidelines.",
        breadcrumb_links=[("Home", "../../"), ("Insights", "../"), ("Reports", "./")],
        pills_html=pills_3,
        body_html=body_3
    )
    with open('insights/reports/index.html', 'w', encoding='utf-8') as f:
        f.write(html_3)

    # =========================================================================
    # 4. Videos (depth 2)
    # =========================================================================
    pills_4 = make_pills(2, "videos")
    body_4 = '''      <div class="about-grid-2">
        <div class="media-card">
          <div class="media-thumb-wrap">
            <div class="media-play-btn">▶</div>
            <span class="media-duration">18:42</span>
          </div>
          <div class="media-body">
            <span class="career-badge">Market Strategy</span>
            <h3 class="service-card-title" style="font-size: 1.2rem; margin: 6px 0 10px 0;">Navigating Market Highs: Asset Allocation Rules</h3>
            <p class="service-card-desc" style="font-size: 0.9rem;">
              Senior Partners break down how to handle euphoric bull markets without succumbing to FOMO or premature cash hoarding.
            </p>
            <div style="margin-top: auto; font-size: 0.82rem; color: #0CAF80;">Speakers: Senior Investment Partners • October 2026</div>
          </div>
        </div>

        <div class="media-card">
          <div class="media-thumb-wrap">
            <div class="media-play-btn">▶</div>
            <span class="media-duration">24:15</span>
          </div>
          <div class="media-body">
            <span class="career-badge">Founder Masterclass</span>
            <h3 class="service-card-title" style="font-size: 1.2rem; margin: 6px 0 10px 0;">Managing Pre-IPO Wealth: ESOPs, Secondaries &amp; Taxes</h3>
            <p class="service-card-desc" style="font-size: 0.9rem;">
              A step-by-step masterclass for startup executives facing unexpected capital gains liabilities and liquidity timing traps.
            </p>
            <div style="margin-top: auto; font-size: 0.82rem; color: #0CAF80;">Speakers: Private Client Advisory Desk • September 2026</div>
          </div>
        </div>

        <div class="media-card">
          <div class="media-thumb-wrap">
            <div class="media-play-btn">▶</div>
            <span class="media-duration">15:50</span>
          </div>
          <div class="media-body">
            <span class="career-badge">Estate Planning</span>
            <h3 class="service-card-title" style="font-size: 1.2rem; margin: 6px 0 10px 0;">Why Every Business Family Needs a Trust, Not Just a Will</h3>
            <p class="service-card-desc" style="font-size: 0.9rem;">
              Understanding the critical differences between probate-delayed wills and private irrevocable trusts for wealth transfer.
            </p>
            <div style="margin-top: auto; font-size: 0.82rem; color: #0CAF80;">Speakers: Senior Estate Counsel • August 2026</div>
          </div>
        </div>

        <div class="media-card">
          <div class="media-thumb-wrap">
            <div class="media-play-btn">▶</div>
            <span class="media-duration">21:30</span>
          </div>
          <div class="media-body">
            <span class="career-badge">Real Assets</span>
            <h3 class="service-card-title" style="font-size: 1.2rem; margin: 6px 0 10px 0;">Commercial Yield Due Diligence: Avoiding Traps</h3>
            <p class="service-card-desc" style="font-size: 0.9rem;">
              How to stress-test rent escalation clauses, weighted average lease expiries (WALE), and tenant credit health before purchasing.
            </p>
            <div style="margin-top: auto; font-size: 0.82rem; color: #0CAF80;">Speakers: Real Estate Advisory Desk • July 2026</div>
          </div>
        </div>
      </div>'''

    html_4 = render_page(
        title="Advisor Video Briefings & Discussions | BlissMoney",
        description="Watch market discussions, asset allocation masterclasses, and executive briefings with BlissMoney senior partners.",
        depth=2,
        active_section="insights",
        active_item="insights-videos",
        eyebrow="Visual Intel",
        hero_title="Advisor Video Briefings &amp; Market Discussions",
        hero_subtitle="Engaging multimedia briefings with BlissMoney partners exploring market corrections, macro tailwinds, and wealth strategies.",
        breadcrumb_links=[("Home", "../../"), ("Insights", "../"), ("Videos", "./")],
        pills_html=pills_4,
        body_html=body_4
    )
    with open('insights/videos/index.html', 'w', encoding='utf-8') as f:
        f.write(html_4)

    # =========================================================================
    # 5. Podcasts (depth 2)
    # =========================================================================
    pills_5 = make_pills(2, "podcasts")
    body_5 = '''      <div class="about-grid-2">
        <div class="service-feature-card">
          <div>
            <span class="career-badge">Episode 14</span>
            <h3 class="service-card-title">From ₹0 to ₹1,000 Cr: Navigating the Founder's Second Act</h3>
            <p class="service-card-desc">
              In-depth conversation with a veteran tech founder on emotional detachment from an operating business, capital redeployment, and setting up an endowment.
            </p>
            <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px; padding: 12px 16px; margin: 16px 0; display: flex; align-items: center; justify-content: space-between;">
              <span style="color: #0CAF80; font-size: 0.85rem;">▶ 00:00 / 44:20</span>
              <span style="font-size: 0.78rem; color: var(--bm-text-muted);">Spotify • Apple Podcasts</span>
            </div>
          </div>
          <a href="#" class="service-card-link">Episode Show Notes &amp; Transcript →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Episode 13</span>
            <h3 class="service-card-title">Inside Institutional Private Credit in India</h3>
            <p class="service-card-desc">
              A deep-dive with a leading Category-II AIF CIO discussing senior-secured structured lending, promoter guarantees, and underwriting discipline.
            </p>
            <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px; padding: 12px 16px; margin: 16px 0; display: flex; align-items: center; justify-content: space-between;">
              <span style="color: #0CAF80; font-size: 0.85rem;">▶ 00:00 / 51:10</span>
              <span style="font-size: 0.78rem; color: var(--bm-text-muted);">Spotify • Apple Podcasts</span>
            </div>
          </div>
          <a href="#" class="service-card-link">Episode Show Notes &amp; Transcript →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Episode 12</span>
            <h3 class="service-card-title">The Psychology of Family Succession: Avoiding Sibling Rifts</h3>
            <p class="service-card-desc">
              Prominent family governance mediator shares real-world case studies of successful generational leadership handoffs in Indian industrial families.
            </p>
            <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px; padding: 12px 16px; margin: 16px 0; display: flex; align-items: center; justify-content: space-between;">
              <span style="color: #0CAF80; font-size: 0.85rem;">▶ 00:00 / 38:45</span>
              <span style="font-size: 0.78rem; color: var(--bm-text-muted);">Spotify • Apple Podcasts</span>
            </div>
          </div>
          <a href="#" class="service-card-link">Episode Show Notes &amp; Transcript →</a>
        </div>

        <div class="service-feature-card">
          <div>
            <span class="career-badge">Episode 11</span>
            <h3 class="service-card-title">Macro Signals: Why Global Allocators Are Expanding India Bets</h3>
            <p class="service-card-desc">
              Discussion on demographic dividends, domestic mutual fund SIP inflows, and the multi-decade structural transformation of India's capital markets.
            </p>
            <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px; padding: 12px 16px; margin: 16px 0; display: flex; align-items: center; justify-content: space-between;">
              <span style="color: #0CAF80; font-size: 0.85rem;">▶ 00:00 / 47:05</span>
              <span style="font-size: 0.78rem; color: var(--bm-text-muted);">Spotify • Apple Podcasts</span>
            </div>
          </div>
          <a href="#" class="service-card-link">Episode Show Notes &amp; Transcript →</a>
        </div>
      </div>'''

    html_5 = render_page(
        title="The BlissMoney Private Wealth Podcast | Audio Deep-Dives",
        description="Listen to in-depth conversations with institutional asset managers, family office CIOs, and visionary business builders.",
        depth=2,
        active_section="insights",
        active_item="insights-podcasts",
        eyebrow="Audio Intel",
        hero_title="The BlissMoney Private Wealth Podcast",
        hero_subtitle="In-depth conversations with institutional asset managers, family office CIOs, and visionary business builders.",
        breadcrumb_links=[("Home", "../../"), ("Insights", "../"), ("Podcasts", "./")],
        pills_html=pills_5,
        body_html=body_5
    )
    with open('insights/podcasts/index.html', 'w', encoding='utf-8') as f:
        f.write(html_5)

    print('All 5 Insights pages generated successfully!')

if __name__ == '__main__':
    build_insights_pages()
