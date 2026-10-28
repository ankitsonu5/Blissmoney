import os
import re

def remove_tab_sections():
    # 1. Update scripts/update_about.py
    with open('scripts/update_about.py', 'r', encoding='utf-8') as f:
        content = f.read()

    pills_pattern = re.compile(r'\s*<!-- Subpage Navigation Pills -->\s*<nav class="about-pills-nav".*?</nav>', re.DOTALL)
    content = pills_pattern.sub('', content)

    with open('scripts/update_about.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated scripts/update_about.py")

    # 2. Update scripts/build_services.py
    with open('scripts/build_services.py', 'r', encoding='utf-8') as f:
        s_content = f.read()
    s_content = re.sub(r'def make_pills\(depth, active_slug\):[\s\S]*?return f\'\'\'[\s\S]*?\'\'\'', 'def make_pills(depth, active_slug):\n        return ""', s_content)
    with open('scripts/build_services.py', 'w', encoding='utf-8') as f:
        f.write(s_content)
    print("Updated scripts/build_services.py")

    # 3. Update scripts/build_clients.py
    with open('scripts/build_clients.py', 'r', encoding='utf-8') as f:
        c_content = f.read()
    c_content = re.sub(r'def make_pills\(depth, active_slug\):[\s\S]*?return f\'\'\'[\s\S]*?\'\'\'', 'def make_pills(depth, active_slug):\n        return ""', c_content)
    with open('scripts/build_clients.py', 'w', encoding='utf-8') as f:
        f.write(c_content)
    print("Updated scripts/build_clients.py")

    # 4. Update scripts/build_insights.py
    with open('scripts/build_insights.py', 'r', encoding='utf-8') as f:
        i_content = f.read()
    i_content = re.sub(r'def make_pills\(depth, active_slug\):[\s\S]*?return f\'\'\'[\s\S]*?\'\'\'', 'def make_pills(depth, active_slug):\n        return ""', i_content)
    with open('scripts/build_insights.py', 'w', encoding='utf-8') as f:
        f.write(i_content)
    print("Updated scripts/build_insights.py")

    # 5. Remove tabs from static about subpages
    about_subpages = [
        'about/our-people/index.html',
        'about/brand-story/index.html',
        'about/press-releases/index.html',
        'about/events-conferences/index.html'
    ]
    for page in about_subpages:
        if os.path.exists(page):
            with open(page, 'r', encoding='utf-8') as f:
                html = f.read()
            html = pills_pattern.sub('', html)
            with open(page, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Removed tabs from {page}")

    # 6. Re-run builders
    print("\nRebuilding all pages...")
    import sys
    sys.path.insert(0, '.')

    from scripts.update_about import build_about_page
    build_about_page()

    from scripts.build_services import build_services_pages
    build_services_pages()

    from scripts.build_clients import build_clients_pages
    build_clients_pages()

    from scripts.build_insights import build_insights_pages
    build_insights_pages()

    print("\nAll builders finished executing!")

if __name__ == '__main__':
    remove_tab_sections()
