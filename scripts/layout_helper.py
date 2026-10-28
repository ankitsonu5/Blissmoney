# BlissMoney Universal Page Layout Helper
from scripts.nav_helper import get_nav_html

def get_head(title, description, depth=0):
    base = "" if depth == 0 else ("../" if depth == 1 else "../../")
    return f'''<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{description}">
  <title>{title}</title>

  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/png" href="{base}assets/images/bm_faicon.png">
  <link rel="shortcut icon" href="{base}assets/images/bm_faicon.png" type="image/png">
  <link rel="apple-touch-icon" href="{base}assets/images/bm_faicon.png">

  <!-- Google Fonts: Raleway -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="{base}assets/css/style.css?v=2.5">
  <link rel="stylesheet" href="{base}assets/css/lead-popup.css?v=2.0">
  <link rel="stylesheet" href="{base}assets/css/about.css?v=1.2">
</head>'''

def get_header(depth=0, active_section="", active_item=""):
    base = "" if depth == 0 else ("../" if depth == 1 else "../../")
    home_link = base if depth > 0 else "#hero"
    nav_html = get_nav_html(depth, active_section, active_item)
    return f'''  <!-- Fixed Site Header with Brand Logo & Interactive Dropdown Menu -->
  <header class="site-header scrolled" id="siteHeader">
    <div class="header-inner">
      <a href="{home_link}" class="site-logo" aria-label="BlissMoney Home">
        <img src="{base}assets/images/blissmoney_logo.png" alt="BlissMoney Logo" class="site-logo-img">
      </a>

      <!-- Menu Wrapper -->
      <div class="site-menu-wrap" id="siteMenuWrap">
        <button class="site-menu-btn" id="siteMenuBtn" aria-label="Toggle navigation menu" aria-expanded="false" aria-haspopup="true">
          <span class="site-menu-text">Menu</span>
          <img src="{base}assets/images/hamburger_menu_icon.svg" alt="" class="site-menu-icon" width="20" height="14">
        </button>

        <div class="site-menu-dropdown" id="siteMenuDropdown" role="menu" aria-label="Main Navigation">
          <button class="site-menu-btn site-menu-btn-inside" id="siteMenuBtnInside" aria-label="Close navigation menu">
            <span class="site-menu-text">Menu</span>
            <img src="{base}assets/images/hamburger_menu_icon.svg" alt="" class="site-menu-icon" width="20" height="14">
          </button>
          {nav_html}
        </div>
      </div>
    </div>
  </header>'''

def get_footer(depth=0):
    base = "" if depth == 0 else ("../" if depth == 1 else "../../")
    home_link = base if depth > 0 else "#hero"
    return f'''  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="foot-top">
        <div class="foot-brand">
          <img src="{base}assets/images/blissmoney_logo.png" alt="BlissMoney Logo" class="foot-logo-img">
          <p class="foot-tagline">Advisory-led private wealth management for people who've decided that hope isn't a strategy.</p>
        </div>
        <div class="foot-cols">
          <div>
            <h4>About</h4>
            <a href="{base}about/">Overview</a>
            <a href="{base}about/our-people/">Our People</a>
            <a href="{base}about/brand-story/">Brand Story</a>
            <a href="{base}about/press-releases/">Press Releases</a>
            <a href="{base}about/events-conferences/">Events &amp; Conferences</a>
          </div>
          <div>
            <h4>Services</h4>
            <a href="{base}services/">Overview</a>
            <a href="{base}services/financial-planning/">Financial Planning</a>
            <a href="{base}services/estate-succession-planning/">Estate &amp; Succession</a>
            <a href="{base}services/real-estate-advisory/">Real Estate Advisory</a>
            <a href="{base}services/lending/">Lending Solutions</a>
            <a href="{base}services/insurance-risk-planning/">Insurance &amp; Risk</a>
            <a href="{base}services/philanthropy/">Philanthropy</a>
          </div>
          <div>
            <h4>Clients &amp; Insights</h4>
            <a href="{base}clients/">Who We Work With</a>
            <a href="{base}clients/investable-wealth/">Investable Wealth</a>
            <a href="{base}clients/client-segments/">Client Segments</a>
            <a href="{base}insights/articles/">Articles</a>
            <a href="{base}insights/reports/">Reports</a>
            <a href="{base}insights/videos/">Videos</a>
            <a href="{base}insights/podcasts/">Podcasts</a>
          </div>
          <div>
            <h4>Connect &amp; Legal</h4>
            <a href="{base}careers/">Careers</a>
            <a href="{base}reach-us/">Reach Us</a>
            <a href="{base}client-portal/">Client Portal</a>
            <a href="#">Disclosures &amp; registrations</a>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of use</a>
            <a href="#">Investor grievance</a>
          </div>
        </div>
      </div>
      <div class="foot-bottom">
        <p>© 2026 BlissMoney. All rights reserved. Bangalore, India.</p>
        <p class="disclaimer">Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</p>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="{base}assets/js/main.js"></script>
  <script src="{base}assets/js/lead-popup.js"></script>
</body>

</html>'''

def get_bottom_cta(depth=0):
    base = "" if depth == 0 else ("../" if depth == 1 else "../../")
    return f'''      <!-- Bottom CTA Card -->
      <div class="about-cta-card">
        <span class="about-eyebrow" style="margin-bottom: 14px;">Next Steps</span>
        <h3 class="about-cta-title">Bring us the full picture.</h3>
        <p class="about-cta-desc">
          One structured conversation. No obligation. We will tell you honestly whether we can add value, and where.
        </p>
        <div class="about-cta-buttons">
          <a href="{base}reach-us/" class="btn btn-primary btn-consult-primary">
            Schedule a Confidential Consultation
          </a>
          <a href="https://wa.me/916364833952" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            Chat on WhatsApp
          </a>
        </div>
      </div>'''

def render_page(title, description, depth, active_section, active_item, eyebrow, hero_title, hero_subtitle, breadcrumb_links, pills_html, body_html):
    head = get_head(title, description, depth)
    header = get_header(depth, active_section, active_item)
    footer = get_footer(depth)
    cta = get_bottom_cta(depth)

    # Breadcrumbs
    bc_items = []
    for label, url in breadcrumb_links[:-1]:
        bc_items.append(f'<a href="{url}">{label}</a>')
    bc_items.append(f'<span class="bc-current">{breadcrumb_links[-1][0]}</span>')
    bc_html = ' <span class="bc-sep">/</span> '.join(bc_items)

    html = f'''{head}

<body class="about-subpage">

{header}

  <main class="about-page-wrapper">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="about-hero-glow" aria-hidden="true"></div>
      <div class="about-hero-content">
        <!-- Breadcrumbs -->
        <nav class="about-breadcrumbs" aria-label="Breadcrumb">
          {bc_html}
        </nav>

        <span class="about-eyebrow">
          <span class="about-eyebrow-dot"></span>
          {eyebrow}
        </span>
        <h1 class="about-hero-title">{hero_title}</h1>
        <p class="about-hero-subtitle">
          {hero_subtitle}
        </p>
      </div>
    </section>

{pills_html}

    <!-- Main Content Container -->
    <div class="about-container">
{body_html}

{cta}
    </div>
  </main>

{footer}'''
    return html
