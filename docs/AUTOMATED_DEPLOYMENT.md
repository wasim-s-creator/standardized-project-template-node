# 🚀 Automated Deployment Guide

This guide explains how to set up and use the **automated merge-triggered CD pipeline** for your Node.js application.

## 🎯 Overview: Merge Triggers CD Pipeline

Your repository now has **automated deployment** that triggers when:

1. ✨ **Code is merged to main branch** (Pull Request merged)
2. 🔄 **Manual deployment is triggered** (workflow_dispatch)

When either happens, the system automatically:
- 🔍 Validates deployment criteria
- 🏗️ Builds production artifacts
- 🚀 Deploys to target environment
- 🏥 Performs health checks
- 📊 Generates deployment reports

## 📋 How It Works

### 1. Trigger Detection
The CD pipeline activates when:
```yaml
on:
  push:
    branches: [main]  # 🚨 KEY: Triggers on merge to main!
```

### 2. Quality Gate Validation
Before deployment, the system checks:
- ✅ Code coverage ≥ 70%
- ✅ Zero critical security vulnerabilities
- ✅ All tests pass
- ✅ Build artifact < 100MB
- ✅ No sensitive files in production build

### 3. Production Artifact Creation
```bash
# Creates optimized production build
npm ci --omit=dev --production

# Packages as compressed artifact
tar -czf app-{date}-{commit}.tar.gz -C dist .

# Generates integrity checksums
sha256sum artifact.tar.gz > artifact.sha256
```

## 🔧 Setup Instructions

### Step 1: Configure Deployment Target

Edit [`.github/deployment-config.yml`](../.github/deployment-config.yml) and uncomment your deployment platform:

#### For **AWS S3 + CloudFront**:
```yaml
deployment_targets:
  aws:
    enabled: true
    region: "us-east-1"
    s3_bucket: "your-app-bucket"
    cloudfront_distribution: "E1234567890"
```

#### For **Docker**:
```yaml
deployment_targets:
  docker:
    enabled: true
    registry: "your-registry.com"
    image_name: "your-app"
    tag_strategy: "commit-sha"
```

#### For **VPS/Server**:
```yaml
deployment_targets:
  vps:
    enabled: true
    host: "your-server.com"
    user: "deploy"
    path: "/var/www/your-app"
    restart_command: "pm2 restart your-app"
```

#### For **Vercel**:
```yaml
deployment_targets:
  vercel:
    enabled: true
    project_id: "your-project-id"
    org_id: "your-org-id"
```

### Step 2: Set GitHub Secrets

Add these secrets in **Settings > Secrets and variables > Actions**:

#### For AWS:
```bash
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
```

#### For Docker:
```bash
DOCKER_REGISTRY_URL=your-registry.com
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=your-password
```

#### For VPS:
```bash
VPS_HOST=your-server.com
VPS_USER=deploy
VPS_SSH_KEY=your-private-ssh-key
VPS_PATH=/var/www/your-app
```

#### For Vercel:
```bash
VERCEL_TOKEN=your-vercel-token
VERCEL_PROJECT_ID=your-project-id
VERCEL_ORG_ID=your-org-id
```

### Step 3: Configure Environments

In **Settings > Environments**, create:
- `staging` environment
- `production` environment

Optionally add:
- ✅ **Required reviewers** (for manual approval)
- 🕒 **Wait timer** (delay before deployment)
- 🌍 **Environment variables**

### Step 4: Update Deployment Script

Modify [`scripts/deploy.sh`](../scripts/deploy.sh) to match your deployment method:

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Test deployment locally
./scripts/deploy.sh
```

## 🎨 Example Workflow

### Typical Development Flow:

1. **Developer creates feature branch**
   ```bash
   git checkout -b feature/new-api-endpoint
   ```

2. **Developer makes changes and creates PR**
   ```bash
   git add .
   git commit -m "feat: add new API endpoint"
   git push origin feature/new-api-endpoint
   ```

3. **PR triggers CI pipeline** (tests, linting, security scans)

4. **PR gets reviewed and merged to main**
   ```bash
   # Reviewer clicks "Merge pull request"
   ```

5. **🚀 CD PIPELINE AUTOMATICALLY TRIGGERS!**
   - 🔍 Validates merge criteria
   - 🏗️ Builds production artifact
   - 🚀 Deploys to production
   - 🏥 Runs health checks
   - 📧 Sends notifications

6. **Application is live!** 🎉

## 📏 Deployment Monitoring

### View Deployment Status

1. **Go to Actions tab** in your repository
2. **Click on latest "Continuous Deployment"** workflow
3. **Monitor real-time progress**:
   - 🔍 Pre-deployment Validation
   - 🏗️ Build Production Artifacts
   - 🚀 Deploy to Environment
   - 📊 Post-deployment Tasks

### Deployment Reports

Each deployment generates:
- 📊 **GitHub Step Summary** (visible in Actions)
- 📋 **Deployment Report** (downloadable artifact)
- 📊 **Build Manifest** (included in artifact)

Example report:
```json
{
  "buildTime": "2025-01-15T10:30:00.000Z",
  "gitCommit": "abc123def456",
  "environment": "production",
  "deploymentStatus": "success",
  "healthChecksPassed": true
}
```

## 🔄 Manual Deployment

Trigger deployment manually:

1. **Go to Actions tab**
2. **Select "Continuous Deployment" workflow**
3. **Click "Run workflow"**
4. **Choose environment** (staging/production)
5. **Click "Run workflow"**

## 🚫 Rollback

### Automatic Rollback
If health checks fail, the system automatically:
1. 🚨 Detects failure
2. 🔄 Restores previous version
3. 🏥 Verifies rollback health
4. 📧 Notifies team

### Manual Rollback
```bash
# Find previous deployment
ARTIFACT_NAME="app-20250115-previous-commit"

# Download and deploy previous version
gh run download --name $ARTIFACT_NAME
./scripts/deploy.sh
```

## 🔐 Security Features

### Artifact Security
- ✅ **SHA256 checksums** for integrity verification
- ✅ **Sensitive file detection** (blocks .env files)
- ✅ **Security scanning** before deployment
- ✅ **Production dependency audit**

### Access Control
- 🔒 **Environment protection rules**
- 👥 **Required reviewers** for production
- 🔑 **Secrets management** via GitHub Secrets
- 📋 **Audit trail** of all deployments

## 🐛 Troubleshooting

### Common Issues

#### 1. Deployment Skipped
```
⚠️ Direct push detected - skipping deployment
```
**Solution**: Only merge commits trigger deployment. Use PR workflow.

#### 2. Quality Gate Failure
```
❌ Code coverage below 70%
```
**Solution**: Add more tests or adjust coverage threshold in config.

#### 3. Health Check Timeout
```
❌ Health check failed after 10 attempts
```
**Solution**: Check application startup time and health endpoint.

#### 4. Artifact Too Large
```
❌ Build artifact exceeds 100MB limit
```
**Solution**: Optimize dependencies or increase limit in config.

### Debug Mode

Enable debug logging:
```yaml
env:
  DEBUG: "true"
  VERBOSE_LOGGING: "true"
```

### Support

1. 📝 **Check deployment logs** in Actions tab
2. 📊 **Download deployment reports** for analysis
3. 🐛 **Create issue** with deployment logs
4. 📧 **Contact team** via configured notification channels

## 📈 Metrics and Analytics

### Deployment Frequency
Track how often you deploy (daily/weekly)

### Lead Time
Time from commit to production

### Change Failure Rate
Percentage of deployments requiring rollback

### Mean Time to Recovery (MTTR)
Time to recover from failed deployment

## 🎆 Advanced Features

### Blue-Green Deployment
```yaml
feature_flags:
  enable_blue_green_deployment: true
```

### Canary Deployment
```yaml
feature_flags:
  enable_canary_deployment: true
```

### A/B Testing
```yaml
feature_flags:
  enable_a_b_testing: true
```

---

## 🎉 Congratulations!

You now have a **fully automated CI/CD pipeline** that:
- ✅ **Deploys on every merge** to main branch
- ✅ **Validates quality gates** before deployment
- ✅ **Creates production-ready artifacts**
- ✅ **Monitors deployment health**
- ✅ **Provides automatic rollback**
- ✅ **Generates detailed reports**

**Your deployment is now as simple as merging a PR!** 🚀
