#!/usr/bin/env python3
"""
Backend setup script
Creates virtual environment and installs dependencies
"""
import subprocess
import sys
import os
from pathlib import Path

def run_command(command, check=True):
    """Run a command and print output"""
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    if check and result.returncode != 0:
        sys.exit(f"Command failed: {command}")
    return result.returncode == 0

def main():
    # Ensure we're in the server directory
    server_dir = Path(__file__).parent
    os.chdir(server_dir)
    
    print("🚀 Setting up Databricks Marketplace Backend")
    print("=" * 50)
    
    # Create virtual environment
    print("\n1. Creating virtual environment...")
    if not Path("venv").exists():
        run_command("python3 -m venv venv")
        print("✅ Virtual environment created")
    else:
        print("✅ Virtual environment already exists")
    
    # Install dependencies
    print("\n2. Installing dependencies...")
    if os.name == 'nt':  # Windows
        pip_path = "venv/Scripts/pip"
        python_path = "venv/Scripts/python"
    else:  # Unix/Linux/macOS
        pip_path = "venv/bin/pip"
        python_path = "venv/bin/python"
    
    run_command(f"{pip_path} install --upgrade pip")
    run_command(f"{pip_path} install -r requirements.txt")
    print("✅ Dependencies installed")
    
    # Test import with proper Python path
    print("\n3. Testing FastAPI setup...")
    test_script = f'''
import sys
from pathlib import Path
sys.path.insert(0, str(Path.cwd()))
from app.main import app
print("FastAPI app loaded successfully")
'''
    
    test_success = run_command(
        f'{python_path} -c "{test_script}"',
        check=False
    )
    
    if test_success:
        print("✅ Backend setup completed successfully!")
    else:
        print("❌ Backend setup failed - check error messages above")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 Setup Complete!")
    print("\nTo start the development server:")
    print("  cd server")
    print("  ./venv/bin/python scripts/dev.py")
    print("\nOr use the npm scripts from project root:")
    print("  npm run dev:backend")
    
    return True

if __name__ == "__main__":
    main() 