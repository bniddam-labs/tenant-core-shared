/**
 * User status enum
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  LOCKED = 'locked',
  PENDING_VERIFICATION = 'pending_verification',
}

/**
 * Organization tier/plan enum
 */
export enum OrganizationTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

/**
 * System role names for organization members
 */
export enum SystemRoleName {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

/**
 * Granular permissions for organizations
 * These can be extended per application needs
 */
export enum OrganizationPermission {
  // Organization management
  ORG_READ = 'organization.read',
  ORG_UPDATE = 'organization.update',
  ORG_DELETE = 'organization.delete',
  ORG_SETTINGS = 'organization.settings',

  // Member management
  MEMBERS_READ = 'organization.members.read',
  MEMBERS_INVITE = 'organization.members.invite',
  MEMBERS_MANAGE = 'organization.members.manage',
  MEMBERS_REMOVE = 'organization.members.remove',

  // Role management
  ROLES_READ = 'organization.roles.read',
  ROLES_CREATE = 'organization.roles.create',
  ROLES_UPDATE = 'organization.roles.update',
  ROLES_DELETE = 'organization.roles.delete',

  // Content management (generic, can be adapted)
  CONTENT_CREATE = 'organization.content.create',
  CONTENT_READ = 'organization.content.read',
  CONTENT_UPDATE = 'organization.content.update',
  CONTENT_DELETE = 'organization.content.delete',
  CONTENT_PUBLISH = 'organization.content.publish',

  // Client management (if applicable)
  CLIENTS_READ = 'organization.clients.read',
  CLIENTS_CREATE = 'organization.clients.create',
  CLIENTS_UPDATE = 'organization.clients.update',
  CLIENTS_DELETE = 'organization.clients.delete',
  CLIENTS_MANAGE_PORTAL = 'organization.clients.manage_portal',

  // Billing
  BILLING_READ = 'organization.billing.read',
  BILLING_MANAGE = 'organization.billing.manage',
}
