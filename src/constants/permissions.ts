import { OrganizationPermission, SystemRoleName } from '../types/enums';

/**
 * Default permissions for each system role
 */
export const DEFAULT_PERMISSIONS_BY_ROLE: Record<
  SystemRoleName,
  (OrganizationPermission | '*')[]
> = {
  [SystemRoleName.OWNER]: ['*'], // Owner has all permissions

  [SystemRoleName.ADMIN]: [
    // Organization
    OrganizationPermission.ORG_READ,
    OrganizationPermission.ORG_UPDATE,
    OrganizationPermission.ORG_SETTINGS,

    // Members
    OrganizationPermission.MEMBERS_READ,
    OrganizationPermission.MEMBERS_INVITE,
    OrganizationPermission.MEMBERS_MANAGE,
    OrganizationPermission.MEMBERS_REMOVE,

    // Roles
    OrganizationPermission.ROLES_READ,
    OrganizationPermission.ROLES_CREATE,
    OrganizationPermission.ROLES_UPDATE,
    OrganizationPermission.ROLES_DELETE,

    // Content
    OrganizationPermission.CONTENT_CREATE,
    OrganizationPermission.CONTENT_READ,
    OrganizationPermission.CONTENT_UPDATE,
    OrganizationPermission.CONTENT_DELETE,
    OrganizationPermission.CONTENT_PUBLISH,

    // Clients
    OrganizationPermission.CLIENTS_READ,
    OrganizationPermission.CLIENTS_CREATE,
    OrganizationPermission.CLIENTS_UPDATE,
    OrganizationPermission.CLIENTS_DELETE,
    OrganizationPermission.CLIENTS_MANAGE_PORTAL,

    // Billing
    OrganizationPermission.BILLING_READ,
    OrganizationPermission.BILLING_MANAGE,
  ],

  [SystemRoleName.MEMBER]: [
    // Organization
    OrganizationPermission.ORG_READ,

    // Members
    OrganizationPermission.MEMBERS_READ,

    // Roles
    OrganizationPermission.ROLES_READ,

    // Content
    OrganizationPermission.CONTENT_CREATE,
    OrganizationPermission.CONTENT_READ,
    OrganizationPermission.CONTENT_UPDATE,

    // Clients
    OrganizationPermission.CLIENTS_READ,
    OrganizationPermission.CLIENTS_CREATE,
    OrganizationPermission.CLIENTS_UPDATE,

    // Billing
    OrganizationPermission.BILLING_READ,
  ],

  [SystemRoleName.VIEWER]: [
    // Organization
    OrganizationPermission.ORG_READ,

    // Members
    OrganizationPermission.MEMBERS_READ,

    // Content
    OrganizationPermission.CONTENT_READ,

    // Clients
    OrganizationPermission.CLIENTS_READ,
  ],
};

/**
 * Get default permissions for a role
 *
 * @param role - System role name
 * @returns Array of default permissions for the role
 */
export function getDefaultPermissionsForRole(
  role: SystemRoleName,
): (OrganizationPermission | '*')[] {
  return DEFAULT_PERMISSIONS_BY_ROLE[role] ?? [];
}
