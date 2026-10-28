# Synchronize Navigation Across All Existing HTML Pages & Update vercel.json
import os, re, json
from scripts.nav_helper import get_nav_html

def sync_page_nav(filepath, depth, active_section, active_item):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ensure about.css is included in head
    base = "" if depth == 0 else ("../" if depth == 1 else "../../")
    css_link = f'<link rel="stylesheet" href="{base}assets/css/about.css?v=1.2">'
    if 'about.css' not in content:
        content = content.replace('</head>', f'  {css_link}\n</head>')

    # Generate new navigation HTML
    new_nav = get_nav_html(depth, active_section, active_item)

    # Replace <nav class="site-menu-nav">...</nav>
    pattern = r'<nav\s+class="site-menu-nav".*?</nav>'
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, new_nav, content, flags=re.DOTALL)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated navigation in: {filepath}")
    else:
        print(f"Warning: <nav class='site-menu-nav'> not found in: {filepath}")

def update_vercel_json():
    rewrites = [
        # About
        {"source": "/about", "destination": "/about/index.html"},
        {"source": "/about/", "destination": "/about/index.html"},
        {"source": "/about/our-people", "destination": "/about/our-people/index.html"},
        {"source": "/about/our-people/", "destination": "/about/our-people/index.html"},
        {"source": "/about/brand-story", "destination": "/about/brand-story/index.html"},
        {"source": "/about/brand-story/", "destination": "/about/brand-story/index.html"},
        {"source": "/about/press-releases", "destination": "/about/press-releases/index.html"},
        {"source": "/about/press-releases/", "destination": "/about/press-releases/index.html"},
        {"source": "/about/events-conferences", "destination": "/about/events-conferences/index.html"},
        {"source": "/about/events-conferences/", "destination": "/about/events-conferences/index.html"},

        # Services
        {"source": "/services", "destination": "/services/index.html"},
        {"source": "/services/", "destination": "/services/index.html"},
        {"source": "/services/financial-planning", "destination": "/services/financial-planning/index.html"},
        {"source": "/services/financial-planning/", "destination": "/services/financial-planning/index.html"},
        {"source": "/services/estate-succession-planning", "destination": "/services/estate-succession-planning/index.html"},
        {"source": "/services/estate-succession-planning/", "destination": "/services/estate-succession-planning/index.html"},
        {"source": "/services/real-estate-advisory", "destination": "/services/real-estate-advisory/index.html"},
        {"source": "/services/real-estate-advisory/", "destination": "/services/real-estate-advisory/index.html"},
        {"source": "/services/lending", "destination": "/services/lending/index.html"},
        {"source": "/services/lending/", "destination": "/services/lending/index.html"},
        {"source": "/services/insurance-risk-planning", "destination": "/services/insurance-risk-planning/index.html"},
        {"source": "/services/insurance-risk-planning/", "destination": "/services/insurance-risk-planning/index.html"},
        {"source": "/services/philanthropy", "destination": "/services/philanthropy/index.html"},
        {"source": "/services/philanthropy/", "destination": "/services/philanthropy/index.html"},

        # Clients
        {"source": "/clients", "destination": "/clients/index.html"},
        {"source": "/clients/", "destination": "/clients/index.html"},
        {"source": "/clients/investable-wealth", "destination": "/clients/investable-wealth/index.html"},
        {"source": "/clients/investable-wealth/", "destination": "/clients/investable-wealth/index.html"},
        {"source": "/clients/client-segments", "destination": "/clients/client-segments/index.html"},
        {"source": "/clients/client-segments/", "destination": "/clients/client-segments/index.html"},

        # Insights
        {"source": "/insights", "destination": "/insights/index.html"},
        {"source": "/insights/", "destination": "/insights/index.html"},
        {"source": "/insights/articles", "destination": "/insights/articles/index.html"},
        {"source": "/insights/articles/", "destination": "/insights/articles/index.html"},
        {"source": "/insights/reports", "destination": "/insights/reports/index.html"},
        {"source": "/insights/reports/", "destination": "/insights/reports/index.html"},
        {"source": "/insights/videos", "destination": "/insights/videos/index.html"},
        {"source": "/insights/videos/", "destination": "/insights/videos/index.html"},
        {"source": "/insights/podcasts", "destination": "/insights/podcasts/index.html"},
        {"source": "/insights/podcasts/", "destination": "/insights/podcasts/index.html"},

        # Careers
        {"source": "/careers", "destination": "/careers/index.html"},
        {"source": "/careers/", "destination": "/careers/index.html"},

        # Reach Us
        {"source": "/reach-us", "destination": "/reach-us/index.html"},
        {"source": "/reach-us/", "destination": "/reach-us/index.html"},

        # Client Portal
        {"source": "/client-portal", "destination": "/client-portal/index.html"},
        {"source": "/client-portal/", "destination": "/client-portal/index.html"}
    ]

    config = {
        "cleanUrls": True,
        "trailingSlash": False,
        "rewrites": rewrites
    }

    with open('vercel.json', 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)
    print("vercel.json updated with all rewrites!")

def main():
    # 1. Update index.html
    sync_page_nav('index.html', depth=0, active_section="home", active_item="")

    # 2. Update About pages
    sync_page_nav('about/index.html', depth=1, active_section="about", active_item="about-overview")
    sync_page_nav('about/our-people/index.html', depth=2, active_section="about", active_item="about-our-people")
    sync_page_nav('about/brand-story/index.html', depth=2, active_section="about", active_item="about-brand-story")
    sync_page_nav('about/press-releases/index.html', depth=2, active_section="about", active_item="about-press-releases")
    sync_page_nav('about/events-conferences/index.html', depth=2, active_section="about", active_item="about-events-conferences")

    # 3. Update Blog and Tool pages
    sync_page_nav('blog.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('blog-detail.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('blog-weekly-market-briefing.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('blog-us-economy.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('blog-thematic-mutual-funds.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('blog-sebi-mutual-fund-rules.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('blog-market-wrap-5-may.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('blog-market-wrap-15-april.html', depth=0, active_section="insights", active_item="insights-articles")
    sync_page_nav('calculator.html', depth=0, active_section="", active_item="")

    # 4. Update vercel.json
    update_vercel_json()

if __name__ == '__main__':
    main()
