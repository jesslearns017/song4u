# Songs4u Repository Migration Plan

## Current Situation
- Student account (`jesslearns017/songs4u-test`) will be disabled in a few months
- Need to migrate to personal account (`wonderjess/songs4u`)
- Domain `songs4u.com` purchased for deployment
- Two Netlify accounts need coordination

## Migration Timeline

### Phase 1: Immediate Actions (This Week)
**Priority: HIGH - Transfer ownership before access is lost**

#### 1. Repository Transfer
```bash
# In student GitHub account:
1. Go to repository: https://github.com/jesslearns017/songs4u-test
2. Settings → Transfer ownership
3. Transfer to: wonderjess
4. Accept transfer in personal account
```

#### 2. Local Development Setup
```bash
# Update local repository to point to personal account
git remote set-url origin https://github.com/wonderjess/songs4u.git
git remote -v  # Verify the change
```

#### 3. Create Personal Repository
- Option A: Transfer existing repository
- Option B: Create new `wonderjess/songs4u` and copy code
- Option C: Rename transferred repository

### Phase 2: Parallel Setup (Next 2 Months)
**Priority: MEDIUM - Gradual migration with testing**

#### 1. Netlify Account Setup
- Student account: Keep existing deployment (backup/testing)
- Personal account: New primary deployment
- Both pointing to same repository (after transfer)

#### 2. Domain Configuration
- Student account: Use subdomain (staging.songs4u.com) or temporary URL
- Personal account: Configure songs4u.com
- Test both deployments thoroughly

#### 3. Environment Variables
- Copy all environment variables to new Netlify account
- API keys, database connections, etc.
- Test functionality on both deployments

### Phase 3: Final Migration (Before Student Expires)
**Priority: HIGH - Complete migration**

#### 1. Domain Pointing
- Update DNS to point songs4u.com to personal Netlify account
- Verify SSL certificate installation
- Test all functionality

#### 2. Backup Verification
- Ensure all code is in personal repository
- Local backups created
- Database backups (if applicable)

#### 3. Cleanup
- Delete old Netlify deployment
- Close student account
- Update documentation

## Technical Steps

### Git Repository Management
```bash
# Before transfer - ensure clean state
git status
git add .
git commit -m "Pre-migration commit"

# After transfer
git remote set-url origin https://github.com/wonderjess/songs4u.git
git push origin main

# Verify everything works
git pull origin main
```

### Netlify Configuration
```yaml
# netlify.toml (if needed)
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables Checklist
- [ ] API keys
- [ ] Database URLs
- [ ] Third-party service credentials
- [ ] Build environment variables
- [ ] Production vs staging settings

## Risk Mitigation

### What Could Go Wrong
1. **Repository transfer fails** - Have local backup ready
2. **Domain pointing issues** - Plan downtime window
3. **Environment variables missing** - Document all settings
4. **Deployment differences** - Test thoroughly before switch

### Backup Strategies
1. **Local Git Repository**: Complete clone on local machine
2. **Code Archive**: ZIP file of entire project
3. **Configuration Backup**: Export all Netlify settings
4. **Database Backup**: If applicable, export all data

## Success Criteria

### Migration Complete When:
- [ ] Repository owned by personal account
- [ ] Domain points to personal Netlify account
- [ ] All functionality tested and working
- [ ] Student account access no longer needed
- [ ] No data loss or downtime
- [ ] Team members updated on new repository

### Testing Checklist
- [ ] Website loads correctly
- [ ] All pages function properly
- [ ] Forms and submissions work
- [ ] API integrations functional
- [ ] Mobile responsive design works
- [ ] SSL certificate valid
- [ ] Performance metrics acceptable

## Timeline Summary

| Week | Action | Status |
|------|--------|--------|
| Week 1 | Repository transfer | ⏳ TODO |
| Week 2 | Netlify setup | ⏳ TODO |
| Week 3-4 | Parallel testing | ⏳ TODO |
| Week 5-6 | Domain migration | ⏳ TODO |
| Week 7 | Cleanup | ⏳ TODO |

## Emergency Contacts

- GitHub Support: For repository transfer issues
- Netlify Support: For deployment problems
- Domain Registrar: For DNS configuration help

## Notes
- Keep student account active until migration is complete
- Document all passwords and access credentials
- Test all user flows during migration
- Have rollback plan ready if issues occur