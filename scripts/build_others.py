# Builder for Careers, Reach Us, and Client Portal (3 pages)
import os
from scripts.layout_helper import render_page

def build_other_pages():
    os.makedirs('careers', exist_ok=True)
    os.makedirs('reach-us', exist_ok=True)
    os.makedirs('client-portal', exist_ok=True)

    # =========================================================================
    # 1. Careers (depth 1)
    # =========================================================================
    body_careers = '''      <!-- Stats Ribbon -->
      <div class="about-stats-ribbon">
        <div class="about-stat-item">
          <div class="about-stat-number">100%</div>
          <div class="about-stat-label">Meritocratic Culture</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">Equity</div>
          <div class="about-stat-label">Partner Ownership</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">Zero</div>
          <div class="about-stat-label">Product Sales Pressure</div>
        </div>
        <div class="about-stat-item">
          <div class="about-stat-number">Tier-1</div>
          <div class="about-stat-label">Client Network</div>
        </div>
      </div>

      <!-- Why BlissMoney -->
      <section class="about-card">
        <div class="about-section-header">
          <span class="about-section-badge">Why BlissMoney</span>
          <h2 class="about-section-title">A Different Kind of Wealth Management Firm</h2>
          <p class="about-section-desc">
            We are replacing transactional banking sales quotas with deep, long-term fiduciary partnerships. If you are intellectually rigorous, obsessed with client outcomes, and want equity ownership in your practice, you belong here.
          </p>
        </div>

        <div class="about-grid-3">
          <div style="padding: 24px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
            <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 10px 0;">True Fiduciary Independence</h4>
            <p style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              No third-party distributor revenue targets. Recommend only what you would put your own family capital into.
            </p>
          </div>
          <div style="padding: 24px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
            <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 10px 0;">Partner Equity Track</h4>
            <p style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              Senior advisors participate directly in company equity and firm-level profitability, creating real generational wealth.
            </p>
          </div>
          <div style="padding: 24px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
            <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 10px 0;">Institutional Tech Stack</h4>
            <p style="color: var(--bm-text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">
              Proprietary asset allocation algorithms, real-time risk intelligence, and automated client reporting so you spend time advising, not preparing spreadsheets.
            </p>
          </div>
        </div>
      </section>

      <!-- Open Positions -->
      <section class="about-card">
        <div class="about-section-header">
          <span class="about-section-badge">Opportunities</span>
          <h2 class="about-section-title">Open Advisory &amp; Research Roles</h2>
          <p class="about-section-desc">
            We are actively hiring exceptional talent across Mumbai, Bengaluru, and New Delhi.
          </p>
        </div>

        <div class="career-card">
          <div>
            <span class="career-badge">Private Wealth • Mumbai / Bengaluru</span>
            <h3 class="service-card-title" style="margin: 0 0 6px 0;">Senior Wealth Partner (Managing Director Track)</h3>
            <p class="service-card-desc" style="margin: 0;">
              8+ years experience managing ₹100 Cr+ in HNW/UHNW client relationships. Strong multi-asset allocation background and fiduciary integrity.
            </p>
          </div>
          <a href="mailto:careers@blissmoney.com?subject=Application: Senior Wealth Partner" class="btn btn-outline" style="white-space: nowrap;">Apply Now</a>
        </div>

        <div class="career-card">
          <div>
            <span class="career-badge">Research &amp; Strategy • Bengaluru</span>
            <h3 class="service-card-title" style="margin: 0 0 6px 0;">Quantitative Investment Research Analyst (Equities &amp; AIFs)</h3>
            <p class="service-card-desc" style="margin: 0;">
              3-6 years evaluating equity mutual funds, PMS strategies, and private credit AIFs. CFA charter or Level 3 preferred.
            </p>
          </div>
          <a href="mailto:careers@blissmoney.com?subject=Application: Quantitative Investment Analyst" class="btn btn-outline" style="white-space: nowrap;">Apply Now</a>
        </div>

        <div class="career-card">
          <div>
            <span class="career-badge">Legal &amp; Estate • Mumbai</span>
            <h3 class="service-card-title" style="margin: 0 0 6px 0;">Estate &amp; Succession Planning Specialist</h3>
            <p class="service-card-desc" style="margin: 0;">
              5+ years drafting private family trust deeds, family charters, and cross-border inheritance structures. LLB / LLM required.
            </p>
          </div>
          <a href="mailto:careers@blissmoney.com?subject=Application: Estate Planning Specialist" class="btn btn-outline" style="white-space: nowrap;">Apply Now</a>
        </div>

        <div class="career-card">
          <div>
            <span class="career-badge">Client Advisory • Delhi NCR</span>
            <h3 class="service-card-title" style="margin: 0 0 6px 0;">Client Relationship Associate</h3>
            <p class="service-card-desc" style="margin: 0;">
              2-4 years supporting UHNW portfolio onboarding, trade execution, and executive reporting. High attention to detail.
            </p>
          </div>
          <a href="mailto:careers@blissmoney.com?subject=Application: Client Relationship Associate" class="btn btn-outline" style="white-space: nowrap;">Apply Now</a>
        </div>

        <div style="margin-top: 24px; padding: 20px; background: rgba(0, 0, 0, 0.35); border-radius: 8px; text-align: center; color: var(--bm-text-muted); font-size: 0.9rem;">
          Don't see your specific role? Send your resume and a brief note on how you can add value to <a href="mailto:careers@blissmoney.com" style="color: #0CAF80; font-weight: 600;">careers@blissmoney.com</a>.
        </div>
      </section>'''

    html_careers = render_page(
        title="Careers at BlissMoney — Private Wealth Advisory & Research",
        description="Join an elite team of wealth advisors, researchers, and legal architects reshaping private wealth in India. View open roles in Mumbai, Bengaluru, and Delhi.",
        depth=1,
        active_section="careers",
        active_item="careers-overview",
        eyebrow="Join Our Team",
        hero_title="Careers at BlissMoney",
        hero_subtitle="Join an elite team of wealth advisors, researchers, and financial architects committed to independent fiduciary stewardship.",
        breadcrumb_links=[("Home", "../"), ("Careers", "./")],
        pills_html="",
        body_html=body_careers
    )
    with open('careers/index.html', 'w', encoding='utf-8') as f:
        f.write(html_careers)

    # =========================================================================
    # 2. Reach Us (depth 1)
    # =========================================================================
    body_reach_us = '''      <div class="about-grid-2" style="align-items: start;">
        <!-- Contact Information & Offices -->
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Direct Access</span>
            <h2 class="about-section-title">Advisory Desks &amp; Offices</h2>
            <p class="about-section-desc">
              Connect with our senior partners for an unhurried, confidential discussion regarding your balance sheet and generational objectives.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div style="padding: 20px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
              <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 6px 0;">Corporate Headquarters — Mumbai</h4>
              <p style="color: #D1E3DC; font-size: 0.9rem; line-height: 1.6; margin: 0 0 10px 0;">
                One BKC, G Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051
              </p>
              <div style="font-size: 0.85rem; color: var(--bm-text-muted);">
                Advisory Hours: Monday – Friday, 9:00 AM – 7:00 PM IST
              </div>
            </div>

            <div style="padding: 20px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
              <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 6px 0;">Southern Regional Desk — Bengaluru</h4>
              <p style="color: #D1E3DC; font-size: 0.9rem; line-height: 1.6; margin: 0 0 10px 0;">
                Concorde Towers, UB City, 1 Vittal Mallya Road, Bengaluru, Karnataka 560001
              </p>
              <div style="font-size: 0.85rem; color: var(--bm-text-muted);">
                Advisory Hours: Monday – Friday, 9:00 AM – 7:00 PM IST
              </div>
            </div>

            <div style="padding: 20px; background: rgba(12, 175, 128, 0.06); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px;">
              <h4 style="color: #0CAF80; font-size: 1.1rem; margin: 0 0 6px 0;">Direct Partner Communication</h4>
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: #FFFFFF; margin-top: 10px;">
                <div>📞 <strong>Telephone:</strong> <a href="tel:+916364833952" style="color: #0CAF80; text-decoration: none;">+91 63648 33952</a></div>
                <div>💬 <strong>WhatsApp Concierge:</strong> <a href="https://wa.me/916364833952" target="_blank" rel="noopener noreferrer" style="color: #0CAF80; text-decoration: none;">Start Encrypted Chat</a></div>
                <div>✉️ <strong>Confidential Inquiries:</strong> <a href="mailto:advisory@blissmoney.com" style="color: #0CAF80; text-decoration: none;">advisory@blissmoney.com</a></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Structured Consultation Form -->
        <section class="about-card">
          <div class="about-section-header">
            <span class="about-section-badge">Confidential Inquiry</span>
            <h2 class="about-section-title">Schedule a Strategic Briefing</h2>
            <p class="about-section-desc">
              Share preliminary context. A Senior Partner will review and confirm your session within 24 business hours.
            </p>
          </div>

          <form action="#" method="POST" onsubmit="event.preventDefault(); alert('Thank you for reaching out. A Senior Partner from BlissMoney will contact you confidentially within 24 business hours.');" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="bm-form-grid">
              <div class="bm-form-group">
                <label class="bm-label" for="reachFullName">Full Name *</label>
                <input type="text" id="reachFullName" name="name" class="bm-input" placeholder="e.g. Vikramaditya Singhania" required>
              </div>

              <div class="bm-form-group">
                <label class="bm-label" for="reachPhone">Phone / WhatsApp *</label>
                <input type="tel" id="reachPhone" name="phone" class="bm-input" placeholder="+91 98765 43210" required>
              </div>
            </div>

            <div class="bm-form-group">
              <label class="bm-label" for="reachEmail">Email Address *</label>
              <input type="email" id="reachEmail" name="email" class="bm-input" placeholder="vikram@familyenterprise.com" required>
            </div>

            <div class="bm-form-grid">
              <div class="bm-form-group">
                <label class="bm-label" for="reachWealthScale">Investable Capital Scale *</label>
                <select id="reachWealthScale" name="wealth_scale" class="bm-select" required>
                  <option value="" disabled selected>Select surplus range</option>
                  <option value="5cr-25cr">₹5 Crore – ₹25 Crore</option>
                  <option value="25cr-100cr">₹25 Crore – ₹100 Crore</option>
                  <option value="100cr+">₹100 Crore+ (Family Office)</option>
                </select>
              </div>

              <div class="bm-form-group">
                <label class="bm-label" for="reachMeetingPref">Meeting Preference</label>
                <select id="reachMeetingPref" name="meeting_preference" class="bm-select">
                  <option value="virtual">Secure Virtual Briefing (Zoom / Teams)</option>
                  <option value="mumbai">In-Person: Mumbai BKC Office</option>
                  <option value="bengaluru">In-Person: Bengaluru UB City</option>
                  <option value="private-residence">Private Residence / Office Visit</option>
                </select>
              </div>
            </div>

            <div class="bm-form-group">
              <label class="bm-label" for="reachNotes">Primary Focus / Context (Optional)</label>
              <textarea id="reachNotes" name="notes" rows="4" class="bm-textarea" placeholder="Brief context: e.g. recent liquidity event, family trust structuring, multi-asset portfolio audit..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 8px; width: 100%;">
              Confirm Confidential Consultation
            </button>

            <div style="font-size: 0.78rem; color: var(--bm-text-muted); text-align: center; margin-top: 6px;">
              🔒 Strictly private. We adhere to nondisclosure standards and never share your data.
            </div>
          </form>
        </section>
      </div>'''

    html_reach_us = render_page(
        title="Reach Us — Private Wealth Advisory Desks | BlissMoney",
        description="Schedule a confidential consultation with a senior partner at BlissMoney. Offices in Mumbai (BKC) and Bengaluru (UB City).",
        depth=1,
        active_section="reach-us",
        active_item="reach-us-overview",
        eyebrow="Confidential Connect",
        hero_title="Reach Us — Connect with Our Advisory Desk",
        hero_subtitle="Schedule a confidential consultation with a senior partner at our private offices or via secure virtual briefing.",
        breadcrumb_links=[("Home", "../"), ("Reach Us", "./")],
        pills_html="",
        body_html=body_reach_us
    )
    with open('reach-us/index.html', 'w', encoding='utf-8') as f:
        f.write(html_reach_us)

    # =========================================================================
    # 3. Client Portal (depth 1)
    # =========================================================================
    body_portal = '''      <div class="portal-container">
        <!-- Left: Portal Features Showcase -->
        <div class="portal-preview-card">
          <div>
            <span class="about-eyebrow" style="margin-bottom: 16px;">Institutional Stack</span>
            <h2 class="about-section-title" style="font-size: 2rem;">Fortress-Grade Private Client Portal</h2>
            <p class="about-section-desc" style="font-size: 1rem; margin-bottom: 28px;">
              Experience real-time consolidated balance sheet intelligence with institutional security, direct advisor chat, and encrypted document storage.
            </p>

            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: flex; gap: 14px; align-items: start;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(12, 175, 128, 0.15); display: flex; align-items: center; justify-content: center; color: #0CAF80; font-weight: 700; flex-shrink: 0;">01</div>
                <div>
                  <h4 style="color: #FFFFFF; font-size: 1rem; margin: 0 0 4px 0;">Consolidated Net Worth Tracking</h4>
                  <p style="color: var(--bm-text-muted); font-size: 0.88rem; margin: 0; line-height: 1.5;">Single live dashboard aggregating mutual funds, direct equities, PMS, AIFs, and real estate yields.</p>
                </div>
              </div>

              <div style="display: flex; gap: 14px; align-items: start;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(12, 175, 128, 0.15); display: flex; align-items: center; justify-content: center; color: #0CAF80; font-weight: 700; flex-shrink: 0;">02</div>
                <div>
                  <h4 style="color: #FFFFFF; font-size: 1rem; margin: 0 0 4px 0;">Encrypted Document Vault</h4>
                  <p style="color: var(--bm-text-muted); font-size: 0.88rem; margin: 0; line-height: 1.5;">256-bit AES encrypted storage for family trust deeds, wills, title papers, and tax filings.</p>
                </div>
              </div>

              <div style="display: flex; gap: 14px; align-items: start;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(12, 175, 128, 0.15); display: flex; align-items: center; justify-content: center; color: #0CAF80; font-weight: 700; flex-shrink: 0;">03</div>
                <div>
                  <h4 style="color: #FFFFFF; font-size: 1rem; margin: 0 0 4px 0;">Automated Tax &amp; Capital Gains P&amp;L</h4>
                  <p style="color: var(--bm-text-muted); font-size: 0.88rem; margin: 0; line-height: 1.5;">Instant 1-click reports formatted for your Chartered Accountant across LTCG, STCG, and dividends.</p>
                </div>
              </div>

              <div style="display: flex; gap: 14px; align-items: start;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(12, 175, 128, 0.15); display: flex; align-items: center; justify-content: center; color: #0CAF80; font-weight: 700; flex-shrink: 0;">04</div>
                <div>
                  <h4 style="color: #FFFFFF; font-size: 1rem; margin: 0 0 4px 0;">Direct Partner Hotline</h4>
                  <p style="color: var(--bm-text-muted); font-size: 0.88rem; margin: 0; line-height: 1.5;">Direct end-to-end encrypted messaging with your dedicated Senior Wealth Partner.</p>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 32px; padding: 16px; background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(12, 175, 128, 0.2); border-radius: 8px;">
            <div style="font-size: 0.8rem; color: #0CAF80; font-weight: 700; margin-bottom: 4px;">NEED CLIENT PORTAL ONBOARDING?</div>
            <div style="font-size: 0.85rem; color: var(--bm-text-muted);">Contact your Senior Partner or call our private desk at <a href="tel:+916364833952" style="color: #FFFFFF; text-decoration: none;">+91 63648 33952</a> to activate your biometric credentials.</div>
          </div>
        </div>

        <!-- Right: Secure Login Card -->
        <div class="portal-login-card">
          <div class="portal-tab-bar">
            <button type="button" class="portal-tab-btn active" id="tabClientLogin">Private Client</button>
            <button type="button" class="portal-tab-btn" id="tabFamilyOffice">Family Office CIO</button>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
            <h3 style="color: #FFFFFF; font-size: 1.45rem; font-weight: 700; margin: 0 0 8px 0;">Sign In to Your Portfolio</h3>
            <p style="color: var(--bm-text-muted); font-size: 0.88rem; margin: 0;">Enter your institutional credentials to access your live balance sheet.</p>
          </div>

          <form action="#" method="POST" onsubmit="event.preventDefault(); alert('Authentication demo: Please contact your Senior Partner to obtain biometric 2FA security tokens for live portfolio access.');" style="display: flex; flex-direction: column; gap: 18px;">
            <div class="bm-form-group">
              <label class="bm-label" for="portalClientId">Client ID or Registered Email *</label>
              <input type="text" id="portalClientId" name="client_id" class="bm-input" placeholder="e.g. BM-784920 or client@domain.com" required>
            </div>

            <div class="bm-form-group">
              <label class="bm-label" for="portalPassword">Encrypted Password *</label>
              <input type="password" id="portalPassword" name="password" class="bm-input" placeholder="••••••••••••••••" required>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; color: var(--bm-text-muted);">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" name="remember" style="accent-color: #0CAF80;"> Remember device
              </label>
              <a href="#" onclick="alert('Password reset link sent to your registered email on file.'); return false;" style="color: #0CAF80; text-decoration: none;">Forgot password?</a>
            </div>

            <div style="padding: 12px; background: rgba(12, 175, 128, 0.08); border: 1px solid rgba(12, 175, 128, 0.25); border-radius: 8px; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.2rem;">🛡️</span>
              <span style="font-size: 0.82rem; color: #D1E3DC;">Two-Factor Authentication (SMS/TOTP token) will be required upon next step.</span>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 6px;">
              Secure Log In
            </button>
          </form>

          <!-- Security Badges -->
          <div class="security-badge-row">
            <span class="sec-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              256-Bit SSL
            </span>
            <span class="sec-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              ISO 27001
            </span>
            <span class="sec-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
              Auto Timeout
            </span>
          </div>
        </div>
      </div>'''

    html_portal = render_page(
        title="Client Portal — Secure Portfolio & Net Worth Access | BlissMoney",
        description="Institutional-grade client portal for BlissMoney private wealth clients. Real-time net worth tracking, encrypted document vault, and tax P&L.",
        depth=1,
        active_section="client-portal",
        active_item="",
        eyebrow="Encrypted Portal",
        hero_title="BlissMoney Private Client Portal",
        hero_subtitle="Institutional-grade, real-time portfolio tracking, multi-asset analytics, encrypted document vault, and direct partner access.",
        breadcrumb_links=[("Home", "../"), ("Client Portal", "./")],
        pills_html="",
        body_html=body_portal
    )
    with open('client-portal/index.html', 'w', encoding='utf-8') as f:
        f.write(html_portal)

    print('Careers, Reach Us, and Client Portal generated successfully!')

if __name__ == '__main__':
    build_other_pages()
