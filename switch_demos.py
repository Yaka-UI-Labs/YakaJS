#!/usr/bin/env python3
"""
Switch YakaJS demos between CDN and local dist paths.
Useful for testing before CDN is updated.
"""

import sys
import os
import glob

CDN_URL = 'https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js'
LOCAL_PATH = '../dist/min.yaka.js'

def switch_to_local():
    """Switch all demos to use local dist path"""
    print("Switching demos to LOCAL dist paths...")
    count = 0
    
    demo_files = glob.glob('demos/*.html')
    if not demo_files:
        print("⚠️  WARNING: No demo files found!")
        print("   Make sure you run this script from the repository root.")
        return
    
    for html_file in demo_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if CDN_URL in content:
            content = content.replace(CDN_URL, LOCAL_PATH)
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"  ✅ {os.path.basename(html_file)}")
    
    if count == 0:
        print("  ℹ️  No files needed updating (already using local paths)")
    else:
        print(f"\n✅ Switched {count} files to use local dist paths")
        print("⚠️  Remember to switch back to CDN before committing!")

def switch_to_cdn():
    """Switch all demos to use CDN"""
    print("Switching demos to CDN...")
    count = 0
    
    demo_files = glob.glob('demos/*.html')
    if not demo_files:
        print("⚠️  WARNING: No demo files found!")
        print("   Make sure you run this script from the repository root.")
        return
    
    for html_file in demo_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if LOCAL_PATH in content:
            content = content.replace(LOCAL_PATH, CDN_URL)
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"  ✅ {os.path.basename(html_file)}")
    
    if count == 0:
        print("  ℹ️  No files needed updating (already using CDN)")
    else:
        print(f"\n✅ Switched {count} files to use CDN")

def check_status():
    """Check which mode demos are currently in"""
    local_count = 0
    cdn_count = 0
    
    for html_file in glob.glob('demos/*.html'):
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if LOCAL_PATH in content:
            local_count += 1
        elif CDN_URL in content:
            cdn_count += 1
    
    print(f"\n📊 Demo Status:")
    print(f"  🌐 CDN: {cdn_count} files")
    print(f"  💻 Local: {local_count} files")
    
    if local_count > 0 and cdn_count > 0:
        print(f"  ⚠️  WARNING: Mixed mode! Some files use CDN, some use local.")
    elif local_count > 0:
        print(f"  ✅ All demos using LOCAL dist paths")
        print(f"  ⚠️  Remember to switch back to CDN before committing!")
    elif cdn_count > 0:
        print(f"  ✅ All demos using CDN (production mode)")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 switch_demos.py [local|cdn|status]")
        print("")
        print("Commands:")
        print("  local  - Switch demos to use local dist files (for testing)")
        print("  cdn    - Switch demos to use CDN (for production)")
        print("  status - Check current mode")
        sys.exit(1)
    
    command = sys.argv[1].lower()
    
    if command == 'local':
        switch_to_local()
    elif command == 'cdn':
        switch_to_cdn()
    elif command == 'status':
        check_status()
    else:
        print(f"Unknown command: {command}")
        print("Use: local, cdn, or status")
        sys.exit(1)
