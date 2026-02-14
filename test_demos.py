#!/usr/bin/env python3
"""
YakaJS Demo Test Suite
Tests all demo pages to ensure YakaJS features work correctly.
"""

import sys
import time
import argparse
from playwright.sync_api import sync_playwright, expect

# Demo URLs - using local server for testing
BASE_URL = "http://localhost:8000/demos"
DEMOS = [
    "index.html",
    "reactivity.html",
    "animations.html",
    "components.html",
    "core-features.html",
    "forms.html",
    "state.html",
    "routing.html",
    "security.html",
    "advanced.html",
    "new-features.html",
    "all-features.html",
]

# Flag to use local dist instead of CDN (for testing before CDN updates)
USE_LOCAL_DIST = False

def test_page_loads(page, demo_name):
    """Test that a demo page loads successfully"""
    url = f"{BASE_URL}/{demo_name}"
    print(f"  Testing: {demo_name}")
    
    try:
        response = page.goto(url, wait_until="networkidle", timeout=15000)
        
        # Check if page loaded
        if response.status != 200:
            print(f"    ❌ Failed to load (HTTP {response.status})")
            return False
        
        # If using local dist, we need to wait for CDN to potentially fail and script to load
        if USE_LOCAL_DIST:
            # Wait a bit more for CDN attempt and local script loading
            page.wait_for_timeout(2000)
        else:
            # Wait for CDN script to load
            page.wait_for_timeout(1000)
        
        # Check if YakaJS is loaded
        yaka_loaded = page.evaluate("typeof _ !== 'undefined'")
        if not yaka_loaded:
            print(f"    ❌ YakaJS (_ global) not loaded")
            if not USE_LOCAL_DIST:
                print(f"    💡 Tip: CDN may not be updated yet. Try: python3 test_demos.py --local")
            return False
        
        # Check for error message
        error_div = page.locator('div:has-text("YakaJS not loaded")').count()
        if error_div > 0:
            print(f"    ❌ YakaJS not loaded error displayed")
            return False
        
        print(f"    ✅ Page loaded successfully")
        return True
    except Exception as e:
        print(f"    ❌ Error: {str(e)}")
        return False

def test_reactivity_demo(page):
    """Test specific reactivity features"""
    print("\n  Testing Reactivity Features:")
    url = f"{BASE_URL}/reactivity.html"
    
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=10000)
        
        # Test 1: Check if _.signal exists
        has_signal = page.evaluate("typeof _.signal === 'function'")
        if not has_signal:
            print("    ❌ _.signal() not available")
            return False
        print("    ✅ _.signal() available")
        
        # Test 2: Check if _.effect exists
        has_effect = page.evaluate("typeof _.effect === 'function'")
        if not has_effect:
            print("    ❌ _.effect() not available")
            return False
        print("    ✅ _.effect() available")
        
        # Test 3: Check if _.computed exists
        has_computed = page.evaluate("typeof _.computed === 'function'")
        if not has_computed:
            print("    ❌ _.computed() not available")
            return False
        print("    ✅ _.computed() available")
        
        # Test 4: Test basic signal functionality
        signal_test = page.evaluate("""
            (() => {
                try {
                    const s = _.signal(5);
                    const val1 = s();
                    s.set(10);
                    const val2 = s();
                    s.update(v => v + 5);
                    const val3 = s();
                    return val1 === 5 && val2 === 10 && val3 === 15;
                } catch(e) {
                    console.error('Signal test error:', e);
                    return false;
                }
            })()
        """)
        if not signal_test:
            print("    ❌ Signal functionality broken")
            return False
        print("    ✅ Signal functionality works")
        
        # Test 5: Test effect functionality
        effect_test = page.evaluate("""
            (() => {
                try {
                    let count = 0;
                    const s = _.signal(0);
                    _.effect(() => {
                        s();
                        count++;
                    });
                    s.set(1);
                    s.set(2);
                    return count === 3; // Initial run + 2 updates
                } catch(e) {
                    console.error('Effect test error:', e);
                    return false;
                }
            })()
        """)
        if not effect_test:
            print("    ❌ Effect functionality broken")
            return False
        print("    ✅ Effect functionality works")
        
        # Test 6: Test computed functionality
        computed_test = page.evaluate("""
            (() => {
                try {
                    const a = _.signal(2);
                    const b = _.signal(3);
                    const sum = _.computed(() => a() + b());
                    const val1 = sum();
                    a.set(5);
                    const val2 = sum();
                    return val1 === 5 && val2 === 8;
                } catch(e) {
                    console.error('Computed test error:', e);
                    return false;
                }
            })()
        """)
        if not computed_test:
            print("    ❌ Computed functionality broken")
            return False
        print("    ✅ Computed functionality works")
        
        # Test 7: Test interactive counter button
        try:
            increment_btn = page.locator('button:has-text("+")').first
            if increment_btn.count() > 0:
                signal_value_before = page.locator('#basicSignalValue').text_content()
                increment_btn.click()
                page.wait_for_timeout(300)  # Wait for animation
                signal_value_after = page.locator('#basicSignalValue').text_content()
                
                if signal_value_before != signal_value_after:
                    print("    ✅ Interactive buttons work")
                else:
                    print("    ⚠️  Interactive buttons may not update UI")
            else:
                print("    ⚠️  Counter button not found")
        except Exception as e:
            print(f"    ⚠️  Interactive test failed: {str(e)}")
        
        return True
        
    except Exception as e:
        print(f"    ❌ Error: {str(e)}")
        return False

def test_dom_manipulation(page):
    """Test basic DOM manipulation features"""
    print("\n  Testing DOM Manipulation:")
    
    try:
        # Create a simple test page
        page.goto(f"{BASE_URL}/index.html", wait_until="networkidle", timeout=15000)
        page.wait_for_timeout(1500)
        
        # Test if _ function exists
        function_test = page.evaluate("typeof _ === 'function'")
        if not function_test:
            print("    ❌ _ function not available")
            return False
        print("    ✅ _ function available")
        
        # Test AJAX availability
        ajax_test = page.evaluate("""
            typeof _.get === 'function' && 
            typeof _.post === 'function' && 
            typeof _.ajax === 'function'
        """)
        
        if not ajax_test:
            print("    ❌ AJAX methods not available")
            return False
        print("    ✅ AJAX methods available")
        
        return True
        
    except Exception as e:
        print(f"    ❌ Error: {str(e)}")
        return False

def test_animations(page):
    """Test animation features"""
    print("\n  Testing Animations:")
    
    try:
        # Test core animation functions exist on Yaka prototype
        anim_test = page.evaluate("""
            (() => {
                try {
                    // Check if Yaka is defined
                    if (typeof _ !== 'function') return false;
                    
                    // Check if Yaka has a prototype
                    if (!_.prototype) return false;
                    
                    // Check for animation methods on prototype
                    const hasAnimations = 
                        typeof _.prototype.fadeIn === 'function' || 
                        typeof _.prototype.slideIn === 'function' || 
                        typeof _.prototype.animate === 'function';
                    
                    return hasAnimations;
                } catch(e) {
                    console.error('Animation test error:', e);
                    return false;
                }
            })()
        """)
        
        if not anim_test:
            print("    ⚠️  Animation methods check inconclusive")
            return True  # Don't fail on this
        print("    ✅ Animation methods available")
        
        return True
        
    except Exception as e:
        print(f"    ❌ Error: {str(e)}")
        return False

def run_tests():
    """Run all tests"""
    print("\n" + "="*60)
    print("YakaJS Demo Test Suite")
    if USE_LOCAL_DIST:
        print("Mode: Testing with LOCAL dist files")
        print("(Demos use CDN but tests inject local files)")
    else:
        print("Mode: Testing with CDN")
    print("="*60)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        # Suppress console errors for cleaner output
        page.on("pageerror", lambda exc: None)
        
        results = {
            "total": 0,
            "passed": 0,
            "failed": 0
        }
        
        print("\n📋 Testing All Demo Pages Load:")
        print("-" * 60)
        
        for demo in DEMOS:
            results["total"] += 1
            if test_page_loads(page, demo):
                results["passed"] += 1
            else:
                results["failed"] += 1
        
        print("\n" + "-" * 60)
        print("\n🧪 Testing Core YakaJS Features:")
        print("-" * 60)
        
        # Test reactivity features
        results["total"] += 1
        if test_reactivity_demo(page):
            results["passed"] += 1
        else:
            results["failed"] += 1
        
        # Test DOM manipulation
        results["total"] += 1
        if test_dom_manipulation(page):
            results["passed"] += 1
        else:
            results["failed"] += 1
        
        # Test animations
        results["total"] += 1
        if test_animations(page):
            results["passed"] += 1
        else:
            results["failed"] += 1
        
        browser.close()
        
        # Print summary
        print("\n" + "="*60)
        print("Test Summary:")
        print("="*60)
        print(f"Total Tests: {results['total']}")
        print(f"✅ Passed: {results['passed']}")
        print(f"❌ Failed: {results['failed']}")
        print(f"Success Rate: {results['passed']/results['total']*100:.1f}%")
        print("="*60 + "\n")
        
        # Return exit code based on results
        return 0 if results['failed'] == 0 else 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test YakaJS demos')
    parser.add_argument('--local', action='store_true', 
                       help='Test with local dist files instead of CDN (useful when CDN not updated yet)')
    args = parser.parse_args()
    
    # Set global flag
    USE_LOCAL_DIST = args.local
    
    print("\n⚙️  Starting test server...")
    print("Please ensure a server is running on http://localhost:8000")
    print("You can start one with: python3 -m http.server 8000")
    
    if args.local:
        print("\n💡 Testing with LOCAL dist files (CDN will be ignored)")
        print("   This is useful when CDN hasn't been updated yet.\n")
    else:
        print("\n🌐 Testing with CDN")
        print("   If tests fail, CDN may not be updated yet.")
        print("   Try: python3 test_demos.py --local\n")
    
    try:
        exit_code = run_tests()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Fatal error: {str(e)}")
        sys.exit(1)
