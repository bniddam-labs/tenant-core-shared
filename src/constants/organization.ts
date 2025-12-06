import { OrganizationTier } from '../types/enums';

/**
 * Maximum number of members per organization tier
 */
export const MAX_MEMBERS_BY_TIER: Record<OrganizationTier, number> = {
  [OrganizationTier.FREE]: 5,
  [OrganizationTier.PREMIUM]: Infinity,
};

/**
 * Default organization settings
 */
export const DEFAULT_ORGANIZATION_SETTINGS = {
  allowMemberInvite: true,
  features: [],
  maxMembers: MAX_MEMBERS_BY_TIER[OrganizationTier.FREE],
};

/**
 * Organization slug constraints
 */
export const ORGANIZATION_SLUG_CONSTRAINTS = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 50,
  PATTERN: /^[a-z0-9]([a-z0-9-]{1,48}[a-z0-9])?$/,
};

/**
 * Organization name constraints
 */
export const ORGANIZATION_NAME_CONSTRAINTS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 100,
};

/**
 * Get max members for a tier
 *
 * @param tier - Organization tier
 * @returns Maximum number of members allowed
 */
export function getMaxMembersForTier(tier: OrganizationTier): number {
  return MAX_MEMBERS_BY_TIER[tier] ?? MAX_MEMBERS_BY_TIER[OrganizationTier.FREE];
}
