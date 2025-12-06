# @bniddam-labs/tenant-core-shared

Framework-agnostic multi-tenant types, utilities and business logic for SaaS applications.

## Overview

This package provides the **core business logic** for multi-tenant applications, completely framework-agnostic. It includes:

- ✅ **Type definitions** - Enums, interfaces for organizations, roles, permissions
- ✅ **Pure business logic** - Permission checking, role hierarchy
- ✅ **Validation utilities** - Slug validation, email validation
- ✅ **Constants** - Default permissions, role configurations

## Installation

```bash
npm install @bniddam-labs/tenant-core-shared

# Or with pnpm
pnpm add @bniddam-labs/tenant-core-shared
```

## Usage

### Types and Enums

```typescript
import {
  OrganizationPermission,
  SystemRoleName,
  UserStatus,
  OrganizationTier,
  type OrganizationContext,
  type OrganizationSettings,
} from '@bniddam-labs/tenant-core-shared';

// Use in your application
const permission = OrganizationPermission.CONTENT_CREATE;
const role = SystemRoleName.ADMIN;
```

### Permission Utilities

```typescript
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getMissingPermissions,
} from '@bniddam-labs/tenant-core-shared';

const userPermissions = [
  OrganizationPermission.CONTENT_READ,
  OrganizationPermission.CONTENT_CREATE,
];

// Check single permission
const canCreate = hasPermission(userPermissions, OrganizationPermission.CONTENT_CREATE);
// => true

// Check if has any of multiple permissions
const canEdit = hasAnyPermission(userPermissions, [
  OrganizationPermission.CONTENT_UPDATE,
  OrganizationPermission.CONTENT_DELETE,
]);
// => false

// Get missing permissions
const missing = getMissingPermissions(userPermissions, [
  OrganizationPermission.CONTENT_READ,
  OrganizationPermission.CONTENT_UPDATE,
]);
// => [OrganizationPermission.CONTENT_UPDATE]
```

### Role Utilities

```typescript
import {
  getRoleHierarchyLevel,
  isHigherRole,
  hasRole,
  isOwner,
  isAdminOrOwner,
  getHighestRole,
} from '@bniddam-labs/tenant-core-shared';

const userRoles = [SystemRoleName.ADMIN, SystemRoleName.MEMBER];

// Check role hierarchy
const level = getRoleHierarchyLevel(SystemRoleName.ADMIN);
// => 3

const isHigher = isHigherRole(SystemRoleName.ADMIN, SystemRoleName.MEMBER);
// => true

// Check specific roles
const admin = isAdminOrOwner(userRoles);
// => true

// Get highest role
const highest = getHighestRole(userRoles);
// => SystemRoleName.ADMIN
```

### Validation Utilities

```typescript
import {
  validateOrganizationSlug,
  normalizeOrganizationSlug,
  isReservedSlug,
  validateEmail,
} from '@bniddam-labs/tenant-core-shared';

// Validate slug
const isValid = validateOrganizationSlug('my-company');
// => true

// Normalize slug
const normalized = normalizeOrganizationSlug('My Company!!!');
// => 'my-company'

// Check reserved slugs
const reserved = isReservedSlug('admin');
// => true
```

### Constants

```typescript
import {
  DEFAULT_PERMISSIONS_BY_ROLE,
  ROLE_HIERARCHY,
  MAX_MEMBERS_BY_TIER,
  getDefaultPermissionsForRole,
} from '@bniddam-labs/tenant-core-shared';

// Get default permissions for a role
const adminPerms = getDefaultPermissionsForRole(SystemRoleName.ADMIN);
// => [OrganizationPermission.ORG_READ, ...]

// Get max members for a tier
const maxMembers = MAX_MEMBERS_BY_TIER[OrganizationTier.FREE];
// => 5
```

## Framework Integration

This package is designed to work with framework-specific adapters:

### With NestJS

```bash
npm install @bniddam-labs/tenant-core-shared @bniddam-labs/tenant-core-nestjs
```

See [@bniddam-labs/tenant-core-nestjs](../tenant-core-nestjs) for NestJS integration.

### With AdonisJS (Coming Soon)

```bash
npm install @bniddam-labs/tenant-core-shared @bniddam-labs/tenant-core-adonis
```

## API Reference

### Types

- `UserStatus` - User status enum
- `OrganizationTier` - Organization tier/plan enum
- `SystemRoleName` - System role names enum
- `OrganizationPermission` - Organization permissions enum
- `OrganizationSettings` - Organization settings interface
- `OrganizationContext` - Organization context interface
- `TenantRequest` - Authenticated request interface

### Permission Utils

- `hasPermission(userPermissions, required)` - Check single permission
- `hasAnyPermission(userPermissions, required[])` - Check any of permissions
- `hasAllPermissions(userPermissions, required[])` - Check all permissions
- `getMissingPermissions(userPermissions, required[])` - Get missing permissions
- `mergePermissions(...sets)` - Merge permission sets
- `hasWildcardPermission(permissions)` - Check for wildcard

### Role Utils

- `getRoleHierarchyLevel(role)` - Get hierarchy level
- `isHigherRole(roleA, roleB)` - Compare role hierarchy
- `hasRole(userRoles, required)` - Check specific role
- `hasAnyRole(userRoles, required[])` - Check any of roles
- `isOwner(userRoles)` - Check if owner
- `isAdminOrOwner(userRoles)` - Check if admin or owner
- `getHighestRole(roles)` - Get highest role from list

### Validation Utils

- `validateOrganizationSlug(slug)` - Validate slug format
- `validateOrganizationName(name)` - Validate organization name
- `validateRoleName(roleName)` - Validate role name
- `validateEmail(email)` - Validate email format
- `normalizeOrganizationSlug(input)` - Normalize slug
- `isReservedSlug(slug)` - Check if slug is reserved

### Constants

- `DEFAULT_PERMISSIONS_BY_ROLE` - Default permissions per role
- `ROLE_HIERARCHY` - Role hierarchy configuration
- `MAX_MEMBERS_BY_TIER` - Max members per tier
- `SYSTEM_ROLES_ORDERED` - System roles ordered by hierarchy

## License

MIT
