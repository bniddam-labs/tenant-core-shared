/**
 * User status enum
 */
declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    LOCKED = "locked",
    PENDING_VERIFICATION = "pending_verification"
}
/**
 * Organization tier/plan enum
 */
declare enum OrganizationTier {
    FREE = "FREE",
    PREMIUM = "PREMIUM"
}
/**
 * System role names for organization members
 */
declare enum SystemRoleName {
    OWNER = "owner",
    ADMIN = "admin",
    MEMBER = "member",
    VIEWER = "viewer"
}
/**
 * Granular permissions for organizations
 * These can be extended per application needs
 */
declare enum OrganizationPermission {
    ORG_READ = "organization.read",
    ORG_UPDATE = "organization.update",
    ORG_DELETE = "organization.delete",
    ORG_SETTINGS = "organization.settings",
    MEMBERS_READ = "organization.members.read",
    MEMBERS_INVITE = "organization.members.invite",
    MEMBERS_MANAGE = "organization.members.manage",
    MEMBERS_REMOVE = "organization.members.remove",
    ROLES_READ = "organization.roles.read",
    ROLES_CREATE = "organization.roles.create",
    ROLES_UPDATE = "organization.roles.update",
    ROLES_DELETE = "organization.roles.delete",
    CONTENT_CREATE = "organization.content.create",
    CONTENT_READ = "organization.content.read",
    CONTENT_UPDATE = "organization.content.update",
    CONTENT_DELETE = "organization.content.delete",
    CONTENT_PUBLISH = "organization.content.publish",
    CLIENTS_READ = "organization.clients.read",
    CLIENTS_CREATE = "organization.clients.create",
    CLIENTS_UPDATE = "organization.clients.update",
    CLIENTS_DELETE = "organization.clients.delete",
    CLIENTS_MANAGE_PORTAL = "organization.clients.manage_portal",
    BILLING_READ = "organization.billing.read",
    BILLING_MANAGE = "organization.billing.manage"
}

/**
 * Organization settings interface
 */
interface OrganizationSettings {
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
interface OrganizationContext {
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
interface TenantRequest {
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
interface PermissionCheckResult {
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
interface RoleHierarchy {
    /** Role name */
    role: SystemRoleName;
    /** Hierarchy level (higher = more privileged) */
    level: number;
    /** Default permissions for this role */
    defaultPermissions: (OrganizationPermission | '*')[];
}

/**
 * Check if user has a specific permission
 * Pure function - no dependencies, easily testable
 *
 * @param userPermissions - List of user's permissions (can include wildcard '*')
 * @param required - The required permission to check
 * @returns True if user has the permission
 */
declare function hasPermission(userPermissions: (OrganizationPermission | '*')[], required: OrganizationPermission): boolean;
/**
 * Check if user has any of the given permissions
 *
 * @param userPermissions - List of user's permissions
 * @param required - List of required permissions (user needs at least one)
 * @returns True if user has at least one of the required permissions
 */
declare function hasAnyPermission(userPermissions: (OrganizationPermission | '*')[], required: OrganizationPermission[]): boolean;
/**
 * Check if user has all of the given permissions
 *
 * @param userPermissions - List of user's permissions
 * @param required - List of required permissions (user needs all of them)
 * @returns True if user has all of the required permissions
 */
declare function hasAllPermissions(userPermissions: (OrganizationPermission | '*')[], required: OrganizationPermission[]): boolean;
/**
 * Get missing permissions from a list of required permissions
 *
 * @param userPermissions - List of user's permissions
 * @param required - List of required permissions
 * @returns Array of missing permissions (empty if user has all)
 */
declare function getMissingPermissions(userPermissions: (OrganizationPermission | '*')[], required: OrganizationPermission[]): OrganizationPermission[];
/**
 * Merge multiple permission sets (union)
 *
 * @param permissionSets - Multiple arrays of permissions to merge
 * @returns Unique permissions from all sets
 */
declare function mergePermissions(...permissionSets: (OrganizationPermission | '*')[][]): (OrganizationPermission | '*')[];
/**
 * Check if permission set includes wildcard (all permissions)
 *
 * @param permissions - List of permissions
 * @returns True if includes wildcard
 */
declare function hasWildcardPermission(permissions: (OrganizationPermission | '*')[]): boolean;

/**
 * Get the hierarchy level of a role
 * Higher number = more privileged
 *
 * @param role - System role name
 * @returns Hierarchy level (1-4, or 0 for unknown)
 */
declare function getRoleHierarchyLevel(role: SystemRoleName): number;
/**
 * Check if roleA is higher in hierarchy than roleB
 *
 * @param roleA - First role
 * @param roleB - Second role
 * @returns True if roleA is higher than roleB
 */
declare function isHigherRole(roleA: SystemRoleName, roleB: SystemRoleName): boolean;
/**
 * Check if roleA is higher or equal to roleB in hierarchy
 *
 * @param roleA - First role
 * @param roleB - Second role
 * @returns True if roleA is higher or equal to roleB
 */
declare function isHigherOrEqualRole(roleA: SystemRoleName, roleB: SystemRoleName): boolean;
/**
 * Check if user has a specific role
 *
 * @param userRoles - List of user's roles
 * @param required - Required role
 * @returns True if user has the role
 */
declare function hasRole(userRoles: SystemRoleName[], required: SystemRoleName): boolean;
/**
 * Check if user has any of the given roles
 *
 * @param userRoles - List of user's roles
 * @param required - List of required roles (user needs at least one)
 * @returns True if user has at least one of the required roles
 */
declare function hasAnyRole(userRoles: SystemRoleName[], required: SystemRoleName[]): boolean;
/**
 * Check if user has all of the given roles
 *
 * @param userRoles - List of user's roles
 * @param required - List of required roles (user needs all of them)
 * @returns True if user has all of the required roles
 */
declare function hasAllRoles(userRoles: SystemRoleName[], required: SystemRoleName[]): boolean;
/**
 * Get the highest role from a list of roles
 *
 * @param roles - List of roles
 * @returns The highest role in the list, or null if empty
 */
declare function getHighestRole(roles: SystemRoleName[]): SystemRoleName | null;
/**
 * Check if user is owner
 *
 * @param userRoles - List of user's roles
 * @returns True if user has owner role
 */
declare function isOwner(userRoles: SystemRoleName[]): boolean;
/**
 * Check if user is admin or owner
 *
 * @param userRoles - List of user's roles
 * @returns True if user has admin or owner role
 */
declare function isAdminOrOwner(userRoles: SystemRoleName[]): boolean;
/**
 * Sort roles by hierarchy (highest first)
 *
 * @param roles - List of roles to sort
 * @returns Sorted roles (highest to lowest)
 */
declare function sortRolesByHierarchy(roles: SystemRoleName[]): SystemRoleName[];

/**
 * Validation utilities for tenant/organization data
 */
/**
 * Validate organization slug format
 * Slug should be lowercase, alphanumeric with hyphens, 3-50 characters
 *
 * @param slug - Organization slug to validate
 * @returns True if valid
 */
declare function validateOrganizationSlug(slug: string): boolean;
/**
 * Validate organization name
 * Name should be 1-100 characters
 *
 * @param name - Organization name to validate
 * @returns True if valid
 */
declare function validateOrganizationName(name: string): boolean;
/**
 * Validate role name format
 * Role name should be lowercase, alphanumeric with underscores, 1-50 characters
 *
 * @param roleName - Role name to validate
 * @returns True if valid
 */
declare function validateRoleName(roleName: string): boolean;
/**
 * Validate email format
 * Basic email validation
 *
 * @param email - Email to validate
 * @returns True if valid
 */
declare function validateEmail(email: string): boolean;
/**
 * Normalize organization slug
 * Convert to lowercase, replace spaces with hyphens, remove invalid chars
 *
 * @param input - Input string
 * @returns Normalized slug
 */
declare function normalizeOrganizationSlug(input: string): string;
/**
 * Check if slug is reserved
 * Prevent using common reserved words as organization slugs
 *
 * @param slug - Slug to check
 * @returns True if reserved
 */
declare function isReservedSlug(slug: string): boolean;

/**
 * Default permissions for each system role
 */
declare const DEFAULT_PERMISSIONS_BY_ROLE: Record<SystemRoleName, (OrganizationPermission | '*')[]>;
/**
 * Get default permissions for a role
 *
 * @param role - System role name
 * @returns Array of default permissions for the role
 */
declare function getDefaultPermissionsForRole(role: SystemRoleName): (OrganizationPermission | '*')[];

/**
 * Role hierarchy configuration
 * Defines the hierarchy level and default permissions for each system role
 */
declare const ROLE_HIERARCHY: Record<SystemRoleName, RoleHierarchy>;
/**
 * Get role hierarchy information
 *
 * @param role - System role name
 * @returns Role hierarchy information
 */
declare function getRoleHierarchyInfo(role: SystemRoleName): RoleHierarchy | null;
/**
 * All system roles ordered by hierarchy (highest to lowest)
 */
declare const SYSTEM_ROLES_ORDERED: SystemRoleName[];

/**
 * Maximum number of members per organization tier
 */
declare const MAX_MEMBERS_BY_TIER: Record<OrganizationTier, number>;
/**
 * Default organization settings
 */
declare const DEFAULT_ORGANIZATION_SETTINGS: {
    allowMemberInvite: boolean;
    features: never[];
    maxMembers: number;
};
/**
 * Organization slug constraints
 */
declare const ORGANIZATION_SLUG_CONSTRAINTS: {
    MIN_LENGTH: number;
    MAX_LENGTH: number;
    PATTERN: RegExp;
};
/**
 * Organization name constraints
 */
declare const ORGANIZATION_NAME_CONSTRAINTS: {
    MIN_LENGTH: number;
    MAX_LENGTH: number;
};
/**
 * Get max members for a tier
 *
 * @param tier - Organization tier
 * @returns Maximum number of members allowed
 */
declare function getMaxMembersForTier(tier: OrganizationTier): number;

export { DEFAULT_ORGANIZATION_SETTINGS, DEFAULT_PERMISSIONS_BY_ROLE, MAX_MEMBERS_BY_TIER, ORGANIZATION_NAME_CONSTRAINTS, ORGANIZATION_SLUG_CONSTRAINTS, type OrganizationContext, OrganizationPermission, type OrganizationSettings, OrganizationTier, type PermissionCheckResult, ROLE_HIERARCHY, type RoleHierarchy, SYSTEM_ROLES_ORDERED, SystemRoleName, type TenantRequest, UserStatus, getDefaultPermissionsForRole, getHighestRole, getMaxMembersForTier, getMissingPermissions, getRoleHierarchyInfo, getRoleHierarchyLevel, hasAllPermissions, hasAllRoles, hasAnyPermission, hasAnyRole, hasPermission, hasRole, hasWildcardPermission, isAdminOrOwner, isHigherOrEqualRole, isHigherRole, isOwner, isReservedSlug, mergePermissions, normalizeOrganizationSlug, sortRolesByHierarchy, validateEmail, validateOrganizationName, validateOrganizationSlug, validateRoleName };
