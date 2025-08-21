# Frontend CI/CD Pipeline

This directory contains GitHub Actions workflows for automated testing, building, and deployment of the frontend application.

## Workflows

### Main CI/CD Pipeline (`ci-cd.yml`)

The main pipeline includes the following stages:

1. **Lint and Test** - Code quality checks and testing
2. **Build** - Application building and artifact creation
3. **Security Scan** - Vulnerability scanning
4. **Deploy to Staging** - Automatic deployment to staging environment
5. **Deploy to Production** - Automatic deployment to production environment
6. **Performance Test** - Lighthouse performance testing

## Triggers

- **Push to `main` branch**: Triggers full pipeline including production deployment
- **Push to `develop` branch**: Triggers pipeline including staging deployment
- **Pull Request**: Triggers lint, test, and build validation
- **Manual trigger**: Available via GitHub Actions UI

## Prerequisites

### Required Secrets

Set the following secrets in your GitHub repository settings:

- `SNYK_TOKEN`: Snyk API token for security scanning (optional)

### Environment Protection

The pipeline uses GitHub Environments for deployment protection:

- **staging**: For staging deployments
- **production**: For production deployments

## Customization

### Deployment Commands

Update the deployment steps in the workflow file:

```yaml
- name: Deploy to staging server
  run: |
    # Add your deployment commands here
    # Examples:
    # rsync -avz .output/ user@staging-server:/var/www/
    # scp -r .output/ user@staging-server:/var/www/
```

### Environment Variables

Modify the `env` section to match your project requirements:

```yaml
env:
  NODE_VERSION: '18'
  PNPM_VERSION: '8'
```

### Branch Names

Update the branch names in the workflow triggers:

```yaml
on:
  push:
    branches: [ main, develop ]  # Update with your branch names
  pull_request:
    branches: [ main, develop ]  # Update with your branch names
```

## Adding New Jobs

To add new jobs to the pipeline:

1. Define the job in the `jobs` section
2. Set appropriate `needs` dependencies
3. Configure the `if` conditions for when the job should run
4. Add the necessary steps

## Troubleshooting

### Common Issues

1. **Build failures**: Check Node.js version compatibility
2. **Deployment failures**: Verify server access and deployment scripts
3. **Security scan failures**: Ensure Snyk token is properly configured

### Debug Mode

Enable debug logging by setting the `ACTIONS_STEP_DEBUG` secret to `true` in your repository.

## Support

For issues with the CI/CD pipeline, check:
1. GitHub Actions logs for detailed error messages
2. Repository secrets configuration
3. Environment protection rules
4. Server deployment permissions
