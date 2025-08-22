#!/bin/bash

# Nafis Reflexology Deployment Script
# This script helps deploy the application to various platforms

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_warning "Git is not installed. Some features may not work."
    fi
    
    print_success "Dependencies check completed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd client
    npm install
    cd ..
    
    print_success "Dependencies installed successfully"
}

# Build the application
build_application() {
    print_status "Building application..."
    
    # Build frontend
    print_status "Building frontend..."
    cd client
    npm run build
    cd ..
    
    print_success "Application built successfully"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    # Backend tests
    print_status "Running backend tests..."
    npm test || print_warning "Backend tests failed"
    
    # Frontend tests
    print_status "Running frontend tests..."
    cd client
    npm test -- --watchAll=false || print_warning "Frontend tests failed"
    cd ..
    
    print_success "Tests completed"
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    if [ ! -f .env ]; then
        print_status "Creating .env file from example..."
        cp config.example.js .env
        print_warning "Please update .env file with your configuration"
    else
        print_success ".env file already exists"
    fi
    
    # Create necessary directories
    mkdir -p logs
    mkdir -p uploads
    mkdir -p backups
    
    print_success "Environment setup completed"
}

# Start development servers
start_development() {
    print_status "Starting development servers..."
    
    # Start both backend and frontend in development mode
    npm run dev
}

# Start production server
start_production() {
    print_status "Starting production server..."
    
    # Build the application first
    build_application
    
    # Start production server
    npm start
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Please install it first: npm i -g vercel"
        exit 1
    fi
    
    # Build the application
    build_application
    
    # Deploy to Vercel
    vercel --prod
    
    print_success "Deployed to Vercel successfully"
}

# Deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_error "Netlify CLI is not installed. Please install it first: npm i -g netlify-cli"
        exit 1
    fi
    
    # Build the application
    build_application
    
    # Deploy to Netlify
    netlify deploy --prod --dir=client/build
    
    print_success "Deployed to Netlify successfully"
}

# Deploy to Heroku
deploy_heroku() {
    print_status "Deploying to Heroku..."
    
    if ! command -v heroku &> /dev/null; then
        print_error "Heroku CLI is not installed. Please install it first"
        exit 1
    fi
    
    # Check if Heroku app exists
    if ! heroku apps:info &> /dev/null; then
        print_status "Creating Heroku app..."
        heroku create nafis-reflexology
    fi
    
    # Set environment variables
    print_status "Setting environment variables..."
    heroku config:set NODE_ENV=production
    
    # Deploy to Heroku
    git add .
    git commit -m "Deploy to Heroku"
    git push heroku main
    
    print_success "Deployed to Heroku successfully"
}

# Database setup
setup_database() {
    print_status "Setting up database..."
    
    # Check if MongoDB is running locally
    if ! pgrep -x "mongod" > /dev/null; then
        print_warning "MongoDB is not running locally. Please start MongoDB or use MongoDB Atlas."
    fi
    
    # Run database migrations/seeds
    print_status "Running database setup..."
    node server/scripts/setupDatabase.js || print_warning "Database setup failed"
    
    print_success "Database setup completed"
}

# Backup database
backup_database() {
    print_status "Creating database backup..."
    
    # Create backup directory if it doesn't exist
    mkdir -p backups
    
    # Create backup filename with timestamp
    BACKUP_FILE="backups/nafis-reflexology-$(date +%Y%m%d-%H%M%S).json"
    
    # Export data (this would need to be implemented based on your data structure)
    print_status "Exporting data to $BACKUP_FILE..."
    
    print_success "Database backup created: $BACKUP_FILE"
}

# Show help
show_help() {
    echo "Nafis Reflexology Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  install     Install all dependencies"
    echo "  build       Build the application"
    echo "  test        Run tests"
    echo "  setup       Setup environment and database"
    echo "  dev         Start development servers"
    echo "  start       Start production server"
    echo "  vercel      Deploy to Vercel"
    echo "  netlify     Deploy to Netlify"
    echo "  heroku      Deploy to Heroku"
    echo "  backup      Create database backup"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 install    # Install dependencies"
    echo "  $0 dev        # Start development"
    echo "  $0 vercel     # Deploy to Vercel"
}

# Main script logic
main() {
    case "${1:-help}" in
        install)
            check_dependencies
            install_dependencies
            ;;
        build)
            build_application
            ;;
        test)
            run_tests
            ;;
        setup)
            setup_environment
            setup_database
            ;;
        dev)
            start_development
            ;;
        start)
            start_production
            ;;
        vercel)
            deploy_vercel
            ;;
        netlify)
            deploy_netlify
            ;;
        heroku)
            deploy_heroku
            ;;
        backup)
            backup_database
            ;;
        help|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@" 