import { SystemRoleName } from '../types/enums';

/**
 * Get the hierarchy level of a role
 * Higher number = more privileged
 *
 * @param role - System role name
 * @returns Hierarchy level (1-4, or 0 for unknown)
 */
export function getRoleHierarchyLevel(role: SystemRoleName): number {
  const hierarchy: Record<SystemRoleName, number> = {
    [SystemRoleName.OWNER]: 4,
    [SystemRoleName.ADMIN]: 3,
    [SystemRoleName.MEMBER]: 2,
    [SystemRoleName.VIEWER]: 1,
  };
  return hierarchy[role] ?? 0;
}

/**
 * Check if roleA is higher in hierarchy than roleB
 *
 * @param roleA - First role
 * @param roleB - Second role
 * @returns True if roleA is higher than roleB
 */
export function isHigherRole(roleA: SystemRoleName, roleB: SystemRoleName): boolean {
  return getRoleHierarchyLevel(roleA) > getRoleHierarchyLevel(roleB);
}

/**
 * Check if roleA is higher or equal to roleB in hierarchy
 *
 * @param roleA - First role
 * @param roleB - Second role
 * @returns True if roleA is higher or equal to roleB
 */
export function isHigherOrEqualRole(roleA: SystemRoleName, roleB: SystemRoleName): boolean {
  return getRoleHierarchyLevel(roleA) >= getRoleHierarchyLevel(roleB);
}

/**
 * Check if user has a specific role
 *
 * @param userRoles - List of user's roles
 * @param required - Required role
 * @returns True if user has the role
 */
export function hasRole(userRoles: SystemRoleName[], required: SystemRoleName): boolean {
  return userRoles.includes(required);
}

/**
 * Check if user has any of the given roles
 *
 * @param userRoles - List of user's roles
 * @param required - List of required roles (user needs at least one)
 * @returns True if user has at least one of the required roles
 */
export function hasAnyRole(userRoles: SystemRoleName[], required: SystemRoleName[]): boolean {
  return required.some((role) => userRoles.includes(role));
}

/**
 * Check if user has all of the given roles
 *
 * @param userRoles - List of user's roles
 * @param required - List of required roles (user needs all of them)
 * @returns True if user has all of the required roles
 */
export function hasAllRoles(userRoles: SystemRoleName[], required: SystemRoleName[]): boolean {
  return required.every((role) => userRoles.includes(role));
}

/**
 * Get the highest role from a list of roles
 *
 * @param roles - List of roles
 * @returns The highest role in the list, or null if empty
 */
export function getHighestRole(roles: SystemRoleName[]): SystemRoleName | null {
  if (roles.length === 0) return null;

  return roles.reduce((highest, current) => {
    return isHigherRole(current, highest) ? current : highest;
  }, roles[0]);
}

/**
 * Check if user is owner
 *
 * @param userRoles - List of user's roles
 * @returns True if user has owner role
 */
export function isOwner(userRoles: SystemRoleName[]): boolean {
  return hasRole(userRoles, SystemRoleName.OWNER);
}

/**
 * Check if user is admin or owner
 *
 * @param userRoles - List of user's roles
 * @returns True if user has admin or owner role
 */
export function isAdminOrOwner(userRoles: SystemRoleName[]): boolean {
  return hasAnyRole(userRoles, [SystemRoleName.OWNER, SystemRoleName.ADMIN]);
}

/**
 * Sort roles by hierarchy (highest first)
 *
 * @param roles - List of roles to sort
 * @returns Sorted roles (highest to lowest)
 */
export function sortRolesByHierarchy(roles: SystemRoleName[]): SystemRoleName[] {
  return [...roles].sort((a, b) => getRoleHierarchyLevel(b) - getRoleHierarchyLevel(a));
}
