#!/usr/bin/env python3
"""
Database setup and testing script for Databricks Marketplace
"""
import os
import asyncio
import getpass
from pathlib import Path
from dotenv import load_dotenv, set_key

# Add the server directory to Python path
import sys
sys.path.insert(0, str(Path(__file__).parent))

from app.services.database_service import database_service

def setup_database_credentials():
    """
    Interactive setup for database credentials
    """
    print("🚀 Databricks Marketplace Database Setup")
    print("=" * 50)
    
    env_file = Path(__file__).parent / ".env"
    
    if not env_file.exists():
        print("❌ .env file not found. Creating from template...")
        template_file = Path(__file__).parent / "env.example"
        if template_file.exists():
            with open(template_file, 'r') as f:
                with open(env_file, 'w') as env_f:
                    env_f.write(f.read())
            print("✅ .env file created from template")
        else:
            print("❌ env.example not found!")
            return False
    
    # Load existing environment
    load_dotenv(env_file)
    
    # Display current settings
    print("\n📋 Current Database Configuration:")
    print(f"   Host: {os.getenv('PGHOST', 'not set')}")
    print(f"   Port: {os.getenv('PGPORT', 'not set')}")
    print(f"   Database: {os.getenv('PGDATABASE', 'not set')}")
    print(f"   User: {os.getenv('PGUSER', 'not set')}")
    print(f"   SSL Mode: {os.getenv('PGSSLMODE', 'not set')}")
    print(f"   Password: {'***set***' if os.getenv('PGPASSWORD') else 'not set'}")
    
    # Ask for password if not set
    if not os.getenv('PGPASSWORD'):
        print("\n🔐 Database password is required.")
        print("You can either:")
        print("1. Enter it now (will be saved to .env file)")
        print("2. Set the PGPASSWORD environment variable manually")
        print("3. Edit the .env file directly")
        
        choice = input("\nEnter password now? (y/n): ").lower().strip()
        
        if choice == 'y':
            password = getpass.getpass("Enter database password: ")
            if password:
                set_key(env_file, "PGPASSWORD", password)
                print("✅ Password saved to .env file")
                
                # Reload environment
                load_dotenv(env_file, override=True)
            else:
                print("❌ No password entered")
                return False
        else:
            print("💡 Please set PGPASSWORD in your .env file or environment")
            return False
    
    return True

async def test_database_connection():
    """
    Test the database connection
    """
    print("\n🔍 Testing Database Connection...")
    print("-" * 30)
    
    try:
        # Test basic connection
        is_connected = await database_service.test_connection()
        
        if is_connected:
            print("✅ Database connection successful!")
            
            # Test the actual query
            print("\n📊 Testing dataset query...")
            try:
                query = "SELECT COUNT(*) as total FROM elghali_benchekroun.dataset"
                result = await database_service.execute_query(query)
                
                if result and len(result) > 0:
                    total_count = result[0]['total']
                    print(f"✅ Found {total_count} datasets in database")
                    
                    # Test a sample query
                    print("\n🔎 Testing sample data retrieval...")
                    sample_query = "SELECT id, title, category FROM elghali_benchekroun.dataset LIMIT 3"
                    sample_result = await database_service.execute_query(sample_query)
                    
                    if sample_result:
                        print("✅ Sample data retrieved successfully:")
                        for row in sample_result:
                            print(f"   - {row['id']}: {row['title']} ({row['category']})")
                    else:
                        print("⚠️  No sample data found")
                        
                else:
                    print("⚠️  Query returned no results")
                    
            except Exception as e:
                print(f"❌ Dataset query failed: {e}")
                print("💡 Make sure the table 'elghali_benchekroun.dataset' exists")
                
        else:
            print("❌ Database connection failed")
            print("💡 Check your credentials and network connection")
            
    except Exception as e:
        print(f"❌ Connection test failed: {e}")
        
    finally:
        await database_service.close()

async def main():
    """
    Main setup function
    """
    # Setup credentials
    if setup_database_credentials():
        # Test connection
        await test_database_connection()
        
        print("\n" + "=" * 50)
        print("🎉 Database Setup Complete!")
        print("\n💡 Next Steps:")
        print("1. Start the backend: ./venv/bin/python scripts/dev.py")
        print("2. Test the API: curl http://localhost:8000/api/database/test")
        print("3. Check datasets: curl http://localhost:8000/api/datasets")
        print("\n📚 API Documentation: http://localhost:8000/api/docs")
    else:
        print("\n❌ Database setup incomplete")
        print("💡 Please set your database credentials and try again")

if __name__ == "__main__":
    asyncio.run(main()) 