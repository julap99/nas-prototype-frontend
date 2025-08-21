# CI/CD Pipeline Setup Guide

This guide will help you set up the GitHub Actions CI/CD pipeline for your frontend application.

## Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **Server Access**: SSH access to your deployment server
3. **PM2**: PM2 must be installed on your server for process management

## Step 1: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add the following secrets:

### Required Secrets

- `SSH_PRIVATE_KEY`: Your SSH private key for server access
- `SERVER_HOST`: Your server's IP address or domain name
- `SERVER_USER`: SSH username for your server

### Optional Secrets

- `SNYK_TOKEN`: Snyk API token for security scanning

## Step 2: Generate SSH Key Pair

If you don't have an SSH key pair:

```bash
# Generate a new SSH key pair
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copy the public key to your server
ssh-copy-id username@your-server-ip

# Copy the private key content to GitHub secrets
cat ~/.ssh/id_rsa
```

## Step 3: Server Preparation

### Install PM2 on your server:

```bash
# Install Node.js and npm (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Start PM2 on system boot
pm2 startup
```

### Create deployment directory:

```bash
sudo mkdir -p /var/www/corrad-af
sudo chown $USER:$USER /var/www/corrad-af
```

## Step 4: Configure Firewall

Ensure port 3000 is open on your server:

```bash
# For UFW
sudo ufw allow 3000

# For iptables
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
```

## Step 5: Test the Pipeline

1. Push your code to the `main` or `develop` branch
2. Go to Actions tab in your GitHub repository
3. Monitor the deployment process
4. Check the logs for any errors

## Workflow Files

### 1. `ci-cd.yml` - Comprehensive Pipeline
- Linting and testing
- Building and security scanning
- Staging and production deployments
- Performance testing

### 2. `deploy.yml` - Simple Deployment
- Build and deploy to server
- PM2 process management
- Health checks

## Customization

### Environment-Specific Deployments

You can create separate workflows for different environments:

```yaml
# For staging
if: github.ref == 'refs/heads/develop'

# For production  
if: github.ref == 'refs/heads/main'
```

### Deployment Commands

Modify the deployment steps in `deploy.yml`:

```yaml
- name: Deploy to server
  run: |
    # Your custom deployment commands here
    ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} "cd /var/www/corrad-af && git pull origin main"
```

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify SSH_PRIVATE_KEY secret is correct
   - Check SERVER_HOST and SERVER_USER values
   - Ensure server allows SSH connections

2. **Permission Denied**
   - Check file permissions on server
   - Verify user has write access to deployment directory

3. **PM2 Process Failed**
   - Check PM2 logs: `pm2 logs`
   - Verify ecosystem.config.js is correct
   - Check if port 3000 is available

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript compilation errors

### Debug Mode

Enable debug logging:

1. Add secret `ACTIONS_STEP_DEBUG` with value `true`
2. Re-run the workflow
3. Check detailed logs for debugging information

## Monitoring

### PM2 Commands

```bash
# Check process status
pm2 status

# View logs
pm2 logs corradAF

# Monitor resources
pm2 monit

# Restart application
pm2 restart corradAF
```

### Health Check

The pipeline includes a health check that verifies the application is responding on port 3000.

## Security Considerations

1. **SSH Keys**: Use dedicated deployment keys, not personal SSH keys
2. **Server Access**: Limit server access to deployment user only
3. **Environment Variables**: Never commit sensitive data to the repository
4. **Firewall**: Only open necessary ports

## Support

For issues with the CI/CD pipeline:

1. Check GitHub Actions logs
2. Verify all secrets are correctly configured
3. Test SSH connection manually
4. Check server logs and PM2 status
