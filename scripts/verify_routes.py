# Route & Payload Verification Script
import http.server
import socketserver
import threading
import urllib.request
import time
import os

PORT = 8765

routes_to_test = [
    "/index.html",
    # About
    "/about/index.html",
    "/about/our-people/index.html",
    "/about/brand-story/index.html",
    "/about/press-releases/index.html",
    "/about/events-conferences/index.html",
    # Services
    "/services/index.html",
    "/services/financial-planning/index.html",
    "/services/estate-succession-planning/index.html",
    "/services/real-estate-advisory/index.html",
    "/services/lending/index.html",
    "/services/insurance-risk-planning/index.html",
    "/services/philanthropy/index.html",
    # Clients
    "/clients/index.html",
    "/clients/investable-wealth/index.html",
    "/clients/client-segments/index.html",
    # Insights
    "/insights/index.html",
    "/insights/articles/index.html",
    "/insights/reports/index.html",
    "/insights/videos/index.html",
    "/insights/podcasts/index.html",
    # Careers
    "/careers/index.html",
    # Reach Us
    "/reach-us/index.html",
    # Client Portal
    "/client-portal/index.html",
    # CSS
    "/assets/css/about.css",
    "/assets/css/style.css"
]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server():
    with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
        httpd.serve_forever()

def main():
    t = threading.Thread(target=run_server, daemon=True)
    t.start()
    time.sleep(0.5)

    success_count = 0
    fail_count = 0

    print(f"Testing {len(routes_to_test)} routes on http://localhost:{PORT}...")
    for route in routes_to_test:
        url = f"http://localhost:{PORT}{route}"
        try:
            req = urllib.request.urlopen(url, timeout=3)
            status = req.getcode()
            length = len(req.read())
            if status == 200 and length > 0:
                print(f" [PASS] {status} - {length:6d} bytes - {route}")
                success_count += 1
            else:
                print(f" [FAIL] Status {status} - {route}")
                fail_count += 1
        except Exception as e:
            print(f" [ERROR] {route} -> {e}")
            fail_count += 1

    print(f"\nVerification Results: {success_count} Passed, {fail_count} Failed out of {len(routes_to_test)} tested.", flush=True)
    if fail_count == 0:
        print("ALL ROUTES VERIFIED SUCCESSFULLY WITH HTTP 200 OK!", flush=True)
    os._exit(0 if fail_count == 0 else 1)

if __name__ == '__main__':
    main()

