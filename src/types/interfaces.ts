import type { OrganizationPermission, SystemRoleName } from './enums.js';

/**
 * Organization settings interface
 */
export interface OrganizationSettings {
  /** Whether members can invite other members */
  allowMemberInvite: boolean;
  /** Default role ID for new members */
  defaultRoleId?: string;
  /** Feature flags */
  features: string[];
  /** Custom domain (if applicable) */
  customDomain?: string;
  /** Maximum number of members (according to plan) */
  maxMembers?: number;
}

/**
 * Organization context for current request
 */
export interface OrganizationContext {
  /** Current organization ID */
  organizationId: string;
  /** Current user ID */
  userId: string;
  /** User's roles in this organization */
  roles: SystemRoleName[];
  /** User's permissions in this organization */
  permissions: (OrganizationPermission | '*')[];
}

/**
 * Authenticated request interface
 * Extended by backend applications
 */
export interface TenantRequest {
  /** Authenticated user */
  user: any;
  /** Current organization ID */
  organizationId?: string;
  /** Current organization membership */
  organizationMembership?: any;
}

/**
 * Permission check result
 */
export interface PermissionCheckResult {
  /** Whether the permission check passed */
  granted: boolean;
  /** Reason for denial (if not granted) */
  reason?: string;
  /** Missing permissions (if any) */
  missingPermissions?: OrganizationPermission[];
}

/**
 * Role hierarchy information
 */
export interface RoleHierarchy {
  /** Role name */
  role: SystemRoleName;
  /** Hierarchy level (higher = more privileged) */
  level: number;
  /** Default permissions for this role */
  defaultPermissions: (OrganizationPermission | '*')[];
}
