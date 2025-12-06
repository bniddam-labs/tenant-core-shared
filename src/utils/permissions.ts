import { OrganizationPermission } from '../types/enums';

/**
 * Check if user has a specific permission
 * Pure function - no dependencies, easily testable
 *
 * @param userPermissions - List of user's permissions (can include wildcard '*')
 * @param required - The required permission to check
 * @returns True if user has the permission
 */
export function hasPermission(
  userPermissions: (OrganizationPermission | '*')[],
  required: OrganizationPermission,
): boolean {
  return userPermissions.includes('*') || userPermissions.includes(required);
}

/**
 * Check if user has any of the given permissions
 *
 * @param userPermissions - List of user's permissions
 * @param required - List of required permissions (user needs at least one)
 * @returns True if user has at least one of the required permissions
 */
export function hasAnyPermission(
  userPermissions: (OrganizationPermission | '*')[],
  required: OrganizationPermission[],
): boolean {
  if (userPermissions.includes('*')) {
    return true;
  }
  return required.some((permission) => userPermissions.includes(permission));
}

/**
 * Check if user has all of the given permissions
 *
 * @param userPermissions - List of user's permissions
 * @param required - List of required permissions (user needs all of them)
 * @returns True if user has all of the required permissions
 */
export function hasAllPermissions(
  userPermissions: (OrganizationPermission | '*')[],
  required: OrganizationPermission[],
): boolean {
  if (userPermissions.includes('*')) {
    return true;
  }
  return required.every((permission) => userPermissions.includes(permission));
}

/**
 * Get missing permissions from a list of required permissions
 *
 * @param userPermissions - List of user's permissions
 * @param required - List of required permissions
 * @returns Array of missing permissions (empty if user has all)
 */
export function getMissingPermissions(
  userPermissions: (OrganizationPermission | '*')[],
  required: OrganizationPermission[],
): OrganizationPermission[] {
  if (userPermissions.includes('*')) {
    return [];
  }
  return required.filter((permission) => !userPermissions.includes(permission));
}

/**
 * Merge multiple permission sets (union)
 *
 * @param permissionSets - Multiple arrays of permissions to merge
 * @returns Unique permissions from all sets
 */
export function mergePermissions(
  ...permissionSets: (OrganizationPermission | '*')[][]
): (OrganizationPermission | '*')[] {
  // If any set has wildcard, return wildcard
  const hasWildcard = permissionSets.some((set) => set.includes('*'));
  if (hasWildcard) {
    return ['*'];
  }

  // Otherwise merge and deduplicate
  const merged = permissionSets.flat();
  return Array.from(new Set(merged));
}

/**
 * Check if permission set includes wildcard (all permissions)
 *
 * @param permissions - List of permissions
 * @returns True if includes wildcard
 */
export function hasWildcardPermission(permissions: (OrganizationPermission | '*')[]): boolean {
  return permissions.includes('*');
}
