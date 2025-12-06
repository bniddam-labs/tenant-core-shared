import { type RoleHierarchy } from '../types/interfaces';
import { SystemRoleName } from '../types/enums';
import { DEFAULT_PERMISSIONS_BY_ROLE } from './permissions';

/**
 * Role hierarchy configuration
 * Defines the hierarchy level and default permissions for each system role
 */
export const ROLE_HIERARCHY: Record<SystemRoleName, RoleHierarchy> = {
  [SystemRoleName.OWNER]: {
    role: SystemRoleName.OWNER,
    level: 4,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE[SystemRoleName.OWNER],
  },
  [SystemRoleName.ADMIN]: {
    role: SystemRoleName.ADMIN,
    level: 3,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE[SystemRoleName.ADMIN],
  },
  [SystemRoleName.MEMBER]: {
    role: SystemRoleName.MEMBER,
    level: 2,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE[SystemRoleName.MEMBER],
  },
  [SystemRoleName.VIEWER]: {
    role: SystemRoleName.VIEWER,
    level: 1,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE[SystemRoleName.VIEWER],
  },
};

/**
 * Get role hierarchy information
 *
 * @param role - System role name
 * @returns Role hierarchy information
 */
export function getRoleHierarchyInfo(role: SystemRoleName): RoleHierarchy | null {
  return ROLE_HIERARCHY[role] ?? null;
}

/**
 * All system roles ordered by hierarchy (highest to lowest)
 */
export const SYSTEM_ROLES_ORDERED: SystemRoleName[] = [
  SystemRoleName.OWNER,
  SystemRoleName.ADMIN,
  SystemRoleName.MEMBER,
  SystemRoleName.VIEWER,
];
