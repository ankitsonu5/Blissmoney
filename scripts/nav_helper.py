# BlissMoney Universal Navigation Helper
def get_nav_html(depth=0, active_section="", active_item=""):
    base = "" if depth == 0 else ("../" if depth == 1 else "../../")
    home_link = "#hero" if depth == 0 else base

    def act_parent(sec):
        return " active" if active_section == sec else ""

    def act_style(item):
        if active_item == item:
            return ' style="background: rgba(12, 175, 128, 0.12); border-color: rgba(12, 175, 128, 0.35);"'
        return ''

    def act_title_style(item):
        if active_item == item:
            return ' style="color: #0CAF80;"'
        return ''

    nav = f'''<nav class="site-menu-nav">
            <a href="{home_link}" class="site-nav-link{act_parent("home")}" role="menuitem">Home</a>
            
            <!-- About Menu -->
            <div class="site-nav-item has-submenu" id="navItemAbout">
              <a href="{base}about/" class="site-nav-link site-nav-link-parent{act_parent("about")}" role="menuitem" aria-haspopup="true" aria-expanded="false">
                <span class="submenu-arrow-indicator" aria-hidden="true">‹</span>
                <span>About</span>
              </a>
              <div class="site-submenu-box" id="aboutSubmenuBox" role="menu" aria-label="About Submenu">
                <div class="submenu-box-header">
                  <span class="submenu-box-eyebrow">The Firm</span>
                  <span class="submenu-box-title">About BlissMoney</span>
                </div>
                <div class="submenu-box-links">
                  <a href="{base}about/" class="submenu-box-item"{act_style("about-overview")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">01</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("about-overview")}>Overview</span>
                        <span class="sub-item-desc">Firm philosophy &amp; approach</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}about/our-people/" class="submenu-box-item"{act_style("about-our-people")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">02</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("about-our-people")}>Our People</span>
                        <span class="sub-item-desc">Senior advisors &amp; leadership</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}about/brand-story/" class="submenu-box-item"{act_style("about-brand-story")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">03</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("about-brand-story")}>Brand Story</span>
                        <span class="sub-item-desc">Origins &amp; fiduciary heritage</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}about/press-releases/" class="submenu-box-item"{act_style("about-press-releases")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">04</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("about-press-releases")}>Press Releases</span>
                        <span class="sub-item-desc">Media coverage &amp; updates</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}about/events-conferences/" class="submenu-box-item"{act_style("about-events-conferences")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">05</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("about-events-conferences")}>Events &amp; Conferences</span>
                        <span class="sub-item-desc">Private summits &amp; sessions</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Services Menu -->
            <div class="site-nav-item has-submenu" id="navItemServices">
              <a href="{base}services/" class="site-nav-link site-nav-link-parent{act_parent("services")}" role="menuitem" aria-haspopup="true" aria-expanded="false">
                <span class="submenu-arrow-indicator" aria-hidden="true">‹</span>
                <span>Services</span>
              </a>
              <div class="site-submenu-box" id="servicesSubmenuBox" role="menu" aria-label="Services Submenu">
                <div class="submenu-box-header">
                  <span class="submenu-box-eyebrow">Our Offerings</span>
                  <span class="submenu-box-title">Wealth Services</span>
                </div>
                <div class="submenu-box-links">
                  <a href="{base}services/" class="submenu-box-item"{act_style("services-overview")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">01</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("services-overview")}>Overview</span>
                        <span class="sub-item-desc">Bespoke advisory solutions</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}services/financial-planning/" class="submenu-box-item"{act_style("services-financial-planning")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">02</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("services-financial-planning")}>Financial Planning</span>
                        <span class="sub-item-desc">Strategic wealth &amp; cashflow roadmaps</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}services/estate-succession-planning/" class="submenu-box-item"{act_style("services-estate-succession-planning")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">03</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("services-estate-succession-planning")}>Estate &amp; Succession Planning</span>
                        <span class="sub-item-desc">Legacy architecture &amp; family trusts</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}services/real-estate-advisory/" class="submenu-box-item"{act_style("services-real-estate-advisory")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">04</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("services-real-estate-advisory")}>Real Estate Advisory</span>
                        <span class="sub-item-desc">Commercial &amp; high-yield property</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}services/lending/" class="submenu-box-item"{act_style("services-lending")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">05</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("services-lending")}>Lending</span>
                        <span class="sub-item-desc">Secured liquidity &amp; credit solutions</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}services/insurance-risk-planning/" class="submenu-box-item"{act_style("services-insurance-risk-planning")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">06</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("services-insurance-risk-planning")}>Insurance and Risk Planning</span>
                        <span class="sub-item-desc">Capital protection &amp; key-person cover</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}services/philanthropy/" class="submenu-box-item"{act_style("services-philanthropy")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">07</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("services-philanthropy")}>Philanthropy</span>
                        <span class="sub-item-desc">Impact endowments &amp; foundations</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Clients Menu -->
            <div class="site-nav-item has-submenu" id="navItemClients">
              <a href="{base}clients/" class="site-nav-link site-nav-link-parent{act_parent("clients")}" role="menuitem" aria-haspopup="true" aria-expanded="false">
                <span class="submenu-arrow-indicator" aria-hidden="true">‹</span>
                <span>Clients</span>
              </a>
              <div class="site-submenu-box" id="clientsSubmenuBox" role="menu" aria-label="Clients Submenu">
                <div class="submenu-box-header">
                  <span class="submenu-box-eyebrow">Partnerships</span>
                  <span class="submenu-box-title">Who We Serve</span>
                </div>
                <div class="submenu-box-links">
                  <a href="{base}clients/" class="submenu-box-item"{act_style("clients-overview")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">01</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("clients-overview")}>Who We Work With</span>
                        <span class="sub-item-desc">Tailored wealth criteria &amp; values</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}clients/investable-wealth/" class="submenu-box-item"{act_style("clients-investable-wealth")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">02</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("clients-investable-wealth")}>Investable Wealth</span>
                        <span class="sub-item-desc">Tiered portfolios &amp; allocation models</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}clients/client-segments/" class="submenu-box-item"{act_style("clients-client-segments")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">03</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("clients-client-segments")}>Client Segments</span>
                        <span class="sub-item-desc">Entrepreneurs, CXOs &amp; family offices</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Insights Menu -->
            <div class="site-nav-item has-submenu" id="navItemInsights">
              <a href="{base}insights/articles/" class="site-nav-link site-nav-link-parent{act_parent("insights")}" role="menuitem" aria-haspopup="true" aria-expanded="false">
                <span class="submenu-arrow-indicator" aria-hidden="true">‹</span>
                <span>Insights</span>
              </a>
              <div class="site-submenu-box" id="insightsSubmenuBox" role="menu" aria-label="Insights Submenu">
                <div class="submenu-box-header">
                  <span class="submenu-box-eyebrow">Intel &amp; Media</span>
                  <span class="submenu-box-title">Market Insights</span>
                </div>
                <div class="submenu-box-links">
                  <a href="{base}insights/articles/" class="submenu-box-item"{act_style("insights-articles")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">01</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("insights-articles")}>Articles</span>
                        <span class="sub-item-desc">Market analysis &amp; investment views</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}insights/reports/" class="submenu-box-item"{act_style("insights-reports")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">02</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("insights-reports")}>Reports</span>
                        <span class="sub-item-desc">Quarterly whitepapers &amp; research</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}insights/videos/" class="submenu-box-item"{act_style("insights-videos")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">03</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("insights-videos")}>Videos</span>
                        <span class="sub-item-desc">Advisor briefings &amp; market commentary</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="{base}insights/podcasts/" class="submenu-box-item"{act_style("insights-podcasts")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">04</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("insights-podcasts")}>Podcasts</span>
                        <span class="sub-item-desc">Conversations with global allocators</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Careers Menu -->
            <div class="site-nav-item has-submenu" id="navItemCareers">
              <a href="{base}careers/" class="site-nav-link site-nav-link-parent{act_parent("careers")}" role="menuitem" aria-haspopup="true" aria-expanded="false">
                <span class="submenu-arrow-indicator" aria-hidden="true">‹</span>
                <span>Careers</span>
              </a>
              <div class="site-submenu-box" id="careersSubmenuBox" role="menu" aria-label="Careers Submenu">
                <div class="submenu-box-header">
                  <span class="submenu-box-eyebrow">Join Us</span>
                  <span class="submenu-box-title">Careers</span>
                </div>
                <div class="submenu-box-links">
                  <a href="{base}careers/" class="submenu-box-item"{act_style("careers-overview")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">01</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("careers-overview")}>Careers</span>
                        <span class="sub-item-desc">Opportunities, culture &amp; growth</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Reach Us Menu -->
            <div class="site-nav-item has-submenu" id="navItemReachUs">
              <a href="{base}reach-us/" class="site-nav-link site-nav-link-parent{act_parent("reach-us")}" role="menuitem" aria-haspopup="true" aria-expanded="false">
                <span class="submenu-arrow-indicator" aria-hidden="true">‹</span>
                <span>Reach Us</span>
              </a>
              <div class="site-submenu-box" id="reachUsSubmenuBox" role="menu" aria-label="Reach Us Submenu">
                <div class="submenu-box-header">
                  <span class="submenu-box-eyebrow">Connect</span>
                  <span class="submenu-box-title">Reach Us</span>
                </div>
                <div class="submenu-box-links">
                  <a href="{base}reach-us/" class="submenu-box-item"{act_style("reach-us-overview")} role="menuitem">
                    <div class="sub-item-main">
                      <span class="sub-item-badge">01</span>
                      <div class="sub-item-text">
                        <span class="sub-item-title"{act_title_style("reach-us-overview")}>Reach Us</span>
                        <span class="sub-item-desc">Advisory offices, phone &amp; booking</span>
                      </div>
                    </div>
                    <span class="sub-item-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Login / Portal -->
            <a href="{base}client-portal/" class="site-nav-link site-nav-cta{act_parent("client-portal")}" role="menuitem">Login / Portal</a>
          </nav>'''
    return nav
