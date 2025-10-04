#!/bin/bash

# 🚀 Automated Deployment Script
# This script handles the actual deployment process called by GitHub Actions

set -e  # Exit on any error

# 🎨 Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 📋 Configuration
DEPLOYMENT_DIR="${DEPLOYMENT_DIR:-./deployment}"
ENVIRONMENT="${ENVIRONMENT:-production}"
ARTIFACT_PATH="${ARTIFACT_PATH:-./artifact.tar.gz}"
HEALTH_CHECK_URL="${HEALTH_CHECK_URL:-http://localhost:3000/health}"
MAX_WAIT_TIME="${MAX_WAIT_TIME:-300}"  # 5 minutes

# 📝 Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 🔍 Pre-deployment checks
precheck() {
    log_info "Running pre-deployment checks..."
    
    # Check if artifact exists
    if [ ! -f "$ARTIFACT_PATH" ]; then
        log_error "Artifact not found: $ARTIFACT_PATH"
        exit 1
    fi
    
    # Check deployment directory
    if [ -d "$DEPLOYMENT_DIR" ]; then
        log_warning "Deployment directory exists, backing up..."
        mv "$DEPLOYMENT_DIR" "${DEPLOYMENT_DIR}.backup.$(date +%s)"
    fi
    
    # Create deployment directory
    mkdir -p "$DEPLOYMENT_DIR"
    
    log_success "Pre-deployment checks completed"
}

# 📦 Extract deployment artifact
extract_artifact() {
    log_info "Extracting deployment artifact..."
    
    tar -xzf "$ARTIFACT_PATH" -C "$DEPLOYMENT_DIR"
    
    # Verify extraction
    if [ ! -f "$DEPLOYMENT_DIR/package.json" ]; then
        log_error "Invalid artifact: package.json not found"
        exit 1
    fi
    
    log_success "Artifact extracted successfully"
}

# 🔧 Install dependencies
install_dependencies() {
    log_info "Installing production dependencies..."
    
    cd "$DEPLOYMENT_DIR"
    
    # Install dependencies
    npm ci --omit=dev --production
    
    cd - > /dev/null
    
    log_success "Dependencies installed"
}

# 🔄 Deploy based on target platform
deploy() {
    log_info "Starting deployment to $ENVIRONMENT..."
    
    case "$DEPLOYMENT_TARGET" in
        "docker")
            deploy_docker
            ;;
        "pm2")
            deploy_pm2
            ;;
        "systemd")
            deploy_systemd
            ;;
        "aws")
            deploy_aws
            ;;
        "vercel")
            deploy_vercel
            ;;
        "heroku")
            deploy_heroku
            ;;
        *)
            deploy_simple
            ;;
    esac
    
    log_success "Deployment completed"
}

# 🐳 Docker deployment
deploy_docker() {
    log_info "Deploying with Docker..."
    
    # Build Docker image
    docker build -t "$APP_NAME:$ENVIRONMENT" "$DEPLOYMENT_DIR"
    
    # Stop existing container
    docker stop "$APP_NAME-$ENVIRONMENT" 2>/dev/null || true
    docker rm "$APP_NAME-$ENVIRONMENT" 2>/dev/null || true
    
    # Run new container
    docker run -d \
        --name "$APP_NAME-$ENVIRONMENT" \
        --restart unless-stopped \
        -p "$PORT:3000" \
        "$APP_NAME:$ENVIRONMENT"
    
    log_success "Docker deployment completed"
}

# 🚀 PM2 deployment
deploy_pm2() {
    log_info "Deploying with PM2..."
    
    cd "$DEPLOYMENT_DIR"
    
    # Create PM2 ecosystem file
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$APP_NAME-$ENVIRONMENT',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: '$ENVIRONMENT',
      PORT: '$PORT'
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log'
  }]
}
EOF
    
    # Create logs directory
    mkdir -p logs
    
    # Deploy with PM2
    pm2 startOrRestart ecosystem.config.js --env $ENVIRONMENT
    
    cd - > /dev/null
    
    log_success "PM2 deployment completed"
}

# 🚫 Simple deployment (copy files)
deploy_simple() {
    log_info "Performing simple file deployment..."
    
    # If APP_PATH is set, copy files there
    if [ -n "$APP_PATH" ]; then
        log_info "Copying files to $APP_PATH..."
        
        # Backup existing deployment
        if [ -d "$APP_PATH" ]; then
            mv "$APP_PATH" "${APP_PATH}.backup.$(date +%s)"
        fi
        
        # Copy new files
        cp -r "$DEPLOYMENT_DIR" "$APP_PATH"
        
        # Restart application (if restart command is provided)
        if [ -n "$RESTART_COMMAND" ]; then
            log_info "Restarting application..."
            eval "$RESTART_COMMAND"
        fi
    else
        log_info "Files extracted to $DEPLOYMENT_DIR - ready for manual deployment"
    fi
    
    log_success "Simple deployment completed"
}

# 🏥 Health check
health_check() {
    log_info "Performing health check..."
    
    local attempt=1
    local max_attempts=10
    local wait_time=10
    
    while [ $attempt -le $max_attempts ]; do
        log_info "Health check attempt $attempt/$max_attempts..."
        
        if curl -f -s "$HEALTH_CHECK_URL" > /dev/null 2>&1; then
            log_success "Health check passed!"
            return 0
        fi
        
        if [ $attempt -lt $max_attempts ]; then
            log_warning "Health check failed, waiting ${wait_time}s before retry..."
            sleep $wait_time
        fi
        
        ((attempt++))
    done
    
    log_error "Health check failed after $max_attempts attempts"
    return 1
}

# 🔄 Rollback function
rollback() {
    log_warning "Performing rollback..."
    
    # Find the latest backup
    local backup_dir=$(ls -t "${DEPLOYMENT_DIR}.backup."* 2>/dev/null | head -n1)
    
    if [ -n "$backup_dir" ] && [ -d "$backup_dir" ]; then
        log_info "Rolling back to: $backup_dir"
        
        # Remove failed deployment
        rm -rf "$DEPLOYMENT_DIR"
        
        # Restore backup
        mv "$backup_dir" "$DEPLOYMENT_DIR"
        
        # Restart application
        if [ -n "$RESTART_COMMAND" ]; then
            eval "$RESTART_COMMAND"
        fi
        
        log_success "Rollback completed"
    else
        log_error "No backup found for rollback"
        return 1
    fi
}

# 📊 Deployment report
generate_report() {
    log_info "Generating deployment report..."
    
    local report_file="deployment-report-$(date +%Y%m%d-%H%M%S).json"
    
    cat > "$report_file" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)",
  "environment": "$ENVIRONMENT",
  "deployment_target": "${DEPLOYMENT_TARGET:-simple}",
  "artifact_path": "$ARTIFACT_PATH",
  "deployment_dir": "$DEPLOYMENT_DIR",
  "health_check_url": "$HEALTH_CHECK_URL",
  "status": "success",
  "duration_seconds": $(($(date +%s) - $DEPLOYMENT_START_TIME))
}
EOF
    
    log_success "Deployment report generated: $report_file"
}

# 🏁 Main deployment function
main() {
    local DEPLOYMENT_START_TIME=$(date +%s)
    
    log_info "Starting deployment process..."
    log_info "Environment: $ENVIRONMENT"
    log_info "Artifact: $ARTIFACT_PATH"
    log_info "Target: ${DEPLOYMENT_TARGET:-simple}"
    
    # Run deployment steps
    precheck
    extract_artifact
    install_dependencies
    deploy
    
    # Health check with rollback on failure
    if [ "$SKIP_HEALTH_CHECK" != "true" ]; then
        if ! health_check; then
            if [ "$AUTO_ROLLBACK" = "true" ]; then
                rollback
                exit 1
            else
                log_error "Health check failed - manual intervention required"
                exit 1
            fi
        fi
    else
        log_warning "Health check skipped"
    fi
    
    generate_report
    
    log_success "🎉 Deployment completed successfully!"
}

# 🚑 Error handling
trap 'log_error "Deployment failed at line $LINENO"' ERR

# Run main function
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi
