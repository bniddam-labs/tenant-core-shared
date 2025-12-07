// src/types/enums.ts
var UserStatus = /* @__PURE__ */ ((UserStatus2) => {
  UserStatus2["ACTIVE"] = "active";
  UserStatus2["INACTIVE"] = "inactive";
  UserStatus2["SUSPENDED"] = "suspended";
  UserStatus2["LOCKED"] = "locked";
  UserStatus2["PENDING_VERIFICATION"] = "pending_verification";
  return UserStatus2;
})(UserStatus || {});
var OrganizationTier = /* @__PURE__ */ ((OrganizationTier2) => {
  OrganizationTier2["FREE"] = "FREE";
  OrganizationTier2["PREMIUM"] = "PREMIUM";
  return OrganizationTier2;
})(OrganizationTier || {});
var SystemRoleName = /* @__PURE__ */ ((SystemRoleName2) => {
  SystemRoleName2["OWNER"] = "owner";
  SystemRoleName2["ADMIN"] = "admin";
  SystemRoleName2["MEMBER"] = "member";
  SystemRoleName2["VIEWER"] = "viewer";
  return SystemRoleName2;
})(SystemRoleName || {});
var OrganizationPermission = /* @__PURE__ */ ((OrganizationPermission2) => {
  OrganizationPermission2["ORG_READ"] = "organization.read";
  OrganizationPermission2["ORG_UPDATE"] = "organization.update";
  OrganizationPermission2["ORG_DELETE"] = "organization.delete";
  OrganizationPermission2["ORG_SETTINGS"] = "organization.settings";
  OrganizationPermission2["MEMBERS_READ"] = "organization.members.read";
  OrganizationPermission2["MEMBERS_INVITE"] = "organization.members.invite";
  OrganizationPermission2["MEMBERS_MANAGE"] = "organization.members.manage";
  OrganizationPermission2["MEMBERS_REMOVE"] = "organization.members.remove";
  OrganizationPermission2["ROLES_READ"] = "organization.roles.read";
  OrganizationPermission2["ROLES_CREATE"] = "organization.roles.create";
  OrganizationPermission2["ROLES_UPDATE"] = "organization.roles.update";
  OrganizationPermission2["ROLES_DELETE"] = "organization.roles.delete";
  OrganizationPermission2["CONTENT_CREATE"] = "organization.content.create";
  OrganizationPermission2["CONTENT_READ"] = "organization.content.read";
  OrganizationPermission2["CONTENT_UPDATE"] = "organization.content.update";
  OrganizationPermission2["CONTENT_DELETE"] = "organization.content.delete";
  OrganizationPermission2["CONTENT_PUBLISH"] = "organization.content.publish";
  OrganizationPermission2["CLIENTS_READ"] = "organization.clients.read";
  OrganizationPermission2["CLIENTS_CREATE"] = "organization.clients.create";
  OrganizationPermission2["CLIENTS_UPDATE"] = "organization.clients.update";
  OrganizationPermission2["CLIENTS_DELETE"] = "organization.clients.delete";
  OrganizationPermission2["CLIENTS_MANAGE_PORTAL"] = "organization.clients.manage_portal";
  OrganizationPermission2["BILLING_READ"] = "organization.billing.read";
  OrganizationPermission2["BILLING_MANAGE"] = "organization.billing.manage";
  return OrganizationPermission2;
})(OrganizationPermission || {});

// src/utils/permissions.ts
function hasPermission(userPermissions, required) {
  return userPermissions.includes("*") || userPermissions.includes(required);
}
function hasAnyPermission(userPermissions, required) {
  if (userPermissions.includes("*")) {
    return true;
  }
  return required.some((permission) => userPermissions.includes(permission));
}
function hasAllPermissions(userPermissions, required) {
  if (userPermissions.includes("*")) {
    return true;
  }
  return required.every((permission) => userPermissions.includes(permission));
}
function getMissingPermissions(userPermissions, required) {
  if (userPermissions.includes("*")) {
    return [];
  }
  return required.filter((permission) => !userPermissions.includes(permission));
}
function mergePermissions(...permissionSets) {
  const hasWildcard = permissionSets.some((set) => set.includes("*"));
  if (hasWildcard) {
    return ["*"];
  }
  const merged = permissionSets.flat();
  return Array.from(new Set(merged));
}
function hasWildcardPermission(permissions) {
  return permissions.includes("*");
}

// src/utils/roles.ts
function getRoleHierarchyLevel(role) {
  const hierarchy = {
    ["owner" /* OWNER */]: 4,
    ["admin" /* ADMIN */]: 3,
    ["member" /* MEMBER */]: 2,
    ["viewer" /* VIEWER */]: 1
  };
  return hierarchy[role] ?? 0;
}
function isHigherRole(roleA, roleB) {
  return getRoleHierarchyLevel(roleA) > getRoleHierarchyLevel(roleB);
}
function isHigherOrEqualRole(roleA, roleB) {
  return getRoleHierarchyLevel(roleA) >= getRoleHierarchyLevel(roleB);
}
function hasRole(userRoles, required) {
  return userRoles.includes(required);
}
function hasAnyRole(userRoles, required) {
  return required.some((role) => userRoles.includes(role));
}
function hasAllRoles(userRoles, required) {
  return required.every((role) => userRoles.includes(role));
}
function getHighestRole(roles) {
  if (roles.length === 0) return null;
  return roles.reduce((highest, current) => {
    return isHigherRole(current, highest) ? current : highest;
  }, roles[0]);
}
function isOwner(userRoles) {
  return hasRole(userRoles, "owner" /* OWNER */);
}
function isAdminOrOwner(userRoles) {
  return hasAnyRole(userRoles, ["owner" /* OWNER */, "admin" /* ADMIN */]);
}
function sortRolesByHierarchy(roles) {
  return [...roles].sort((a, b) => getRoleHierarchyLevel(b) - getRoleHierarchyLevel(a));
}

// src/utils/validators.ts
function validateOrganizationSlug(slug) {
  if (!slug || typeof slug !== "string") return false;
  const slugRegex = /^[a-z0-9]([a-z0-9-]{1,48}[a-z0-9])?$/;
  return slugRegex.test(slug);
}
function validateOrganizationName(name) {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= 1 && trimmed.length <= 100;
}
function validateRoleName(roleName) {
  if (!roleName || typeof roleName !== "string") return false;
  const roleRegex = /^[a-z0-9_]{1,50}$/;
  return roleRegex.test(roleName);
}
function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function normalizeOrganizationSlug(input) {
  if (!input || typeof input !== "string") return "";
  return input.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function isReservedSlug(slug) {
  const reserved = [
    "admin",
    "api",
    "app",
    "auth",
    "billing",
    "dashboard",
    "docs",
    "help",
    "home",
    "login",
    "logout",
    "new",
    "null",
    "pricing",
    "register",
    "settings",
    "signup",
    "support",
    "terms",
    "undefined",
    "www"
  ];
  return reserved.includes(slug.toLowerCase());
}

// src/constants/permissions.ts
var DEFAULT_PERMISSIONS_BY_ROLE = {
  ["owner" /* OWNER */]: ["*"],
  // Owner has all permissions
  ["admin" /* ADMIN */]: [
    // Organization
    "organization.read" /* ORG_READ */,
    "organization.update" /* ORG_UPDATE */,
    "organization.settings" /* ORG_SETTINGS */,
    // Members
    "organization.members.read" /* MEMBERS_READ */,
    "organization.members.invite" /* MEMBERS_INVITE */,
    "organization.members.manage" /* MEMBERS_MANAGE */,
    "organization.members.remove" /* MEMBERS_REMOVE */,
    // Roles
    "organization.roles.read" /* ROLES_READ */,
    "organization.roles.create" /* ROLES_CREATE */,
    "organization.roles.update" /* ROLES_UPDATE */,
    "organization.roles.delete" /* ROLES_DELETE */,
    // Content
    "organization.content.create" /* CONTENT_CREATE */,
    "organization.content.read" /* CONTENT_READ */,
    "organization.content.update" /* CONTENT_UPDATE */,
    "organization.content.delete" /* CONTENT_DELETE */,
    "organization.content.publish" /* CONTENT_PUBLISH */,
    // Clients
    "organization.clients.read" /* CLIENTS_READ */,
    "organization.clients.create" /* CLIENTS_CREATE */,
    "organization.clients.update" /* CLIENTS_UPDATE */,
    "organization.clients.delete" /* CLIENTS_DELETE */,
    "organization.clients.manage_portal" /* CLIENTS_MANAGE_PORTAL */,
    // Billing
    "organization.billing.read" /* BILLING_READ */,
    "organization.billing.manage" /* BILLING_MANAGE */
  ],
  ["member" /* MEMBER */]: [
    // Organization
    "organization.read" /* ORG_READ */,
    // Members
    "organization.members.read" /* MEMBERS_READ */,
    // Roles
    "organization.roles.read" /* ROLES_READ */,
    // Content
    "organization.content.create" /* CONTENT_CREATE */,
    "organization.content.read" /* CONTENT_READ */,
    "organization.content.update" /* CONTENT_UPDATE */,
    // Clients
    "organization.clients.read" /* CLIENTS_READ */,
    "organization.clients.create" /* CLIENTS_CREATE */,
    "organization.clients.update" /* CLIENTS_UPDATE */,
    // Billing
    "organization.billing.read" /* BILLING_READ */
  ],
  ["viewer" /* VIEWER */]: [
    // Organization
    "organization.read" /* ORG_READ */,
    // Members
    "organization.members.read" /* MEMBERS_READ */,
    // Content
    "organization.content.read" /* CONTENT_READ */,
    // Clients
    "organization.clients.read" /* CLIENTS_READ */
  ]
};
function getDefaultPermissionsForRole(role) {
  return DEFAULT_PERMISSIONS_BY_ROLE[role] ?? [];
}

// src/constants/roles.ts
var ROLE_HIERARCHY = {
  ["owner" /* OWNER */]: {
    role: "owner" /* OWNER */,
    level: 4,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE["owner" /* OWNER */]
  },
  ["admin" /* ADMIN */]: {
    role: "admin" /* ADMIN */,
    level: 3,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE["admin" /* ADMIN */]
  },
  ["member" /* MEMBER */]: {
    role: "member" /* MEMBER */,
    level: 2,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE["member" /* MEMBER */]
  },
  ["viewer" /* VIEWER */]: {
    role: "viewer" /* VIEWER */,
    level: 1,
    defaultPermissions: DEFAULT_PERMISSIONS_BY_ROLE["viewer" /* VIEWER */]
  }
};
function getRoleHierarchyInfo(role) {
  return ROLE_HIERARCHY[role] ?? null;
}
var SYSTEM_ROLES_ORDERED = [
  "owner" /* OWNER */,
  "admin" /* ADMIN */,
  "member" /* MEMBER */,
  "viewer" /* VIEWER */
];

// src/constants/organization.ts
var MAX_MEMBERS_BY_TIER = {
  ["FREE" /* FREE */]: 5,
  ["PREMIUM" /* PREMIUM */]: Infinity
};
var DEFAULT_ORGANIZATION_SETTINGS = {
  allowMemberInvite: true,
  features: [],
  maxMembers: MAX_MEMBERS_BY_TIER["FREE" /* FREE */]
};
var ORGANIZATION_SLUG_CONSTRAINTS = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 50,
  PATTERN: /^[a-z0-9]([a-z0-9-]{1,48}[a-z0-9])?$/
};
var ORGANIZATION_NAME_CONSTRAINTS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 100
};
function getMaxMembersForTier(tier) {
  return MAX_MEMBERS_BY_TIER[tier] ?? MAX_MEMBERS_BY_TIER["FREE" /* FREE */];
}

export { DEFAULT_ORGANIZATION_SETTINGS, DEFAULT_PERMISSIONS_BY_ROLE, MAX_MEMBERS_BY_TIER, ORGANIZATION_NAME_CONSTRAINTS, ORGANIZATION_SLUG_CONSTRAINTS, OrganizationPermission, OrganizationTier, ROLE_HIERARCHY, SYSTEM_ROLES_ORDERED, SystemRoleName, UserStatus, getDefaultPermissionsForRole, getHighestRole, getMaxMembersForTier, getMissingPermissions, getRoleHierarchyInfo, getRoleHierarchyLevel, hasAllPermissions, hasAllRoles, hasAnyPermission, hasAnyRole, hasPermission, hasRole, hasWildcardPermission, isAdminOrOwner, isHigherOrEqualRole, isHigherRole, isOwner, isReservedSlug, mergePermissions, normalizeOrganizationSlug, sortRolesByHierarchy, validateEmail, validateOrganizationName, validateOrganizationSlug, validateRoleName };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map