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
export function validateOrganizationSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;

  // Regex: lowercase alphanumeric, hyphens allowed, 3-50 chars
  const slugRegex = /^[a-z0-9]([a-z0-9-]{1,48}[a-z0-9])?$/;
  return slugRegex.test(slug);
}

/**
 * Validate organization name
 * Name should be 1-100 characters
 *
 * @param name - Organization name to validate
 * @returns True if valid
 */
export function validateOrganizationName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;

  const trimmed = name.trim();
  return trimmed.length >= 1 && trimmed.length <= 100;
}

/**
 * Validate role name format
 * Role name should be lowercase, alphanumeric with underscores, 1-50 characters
 *
 * @param roleName - Role name to validate
 * @returns True if valid
 */
export function validateRoleName(roleName: string): boolean {
  if (!roleName || typeof roleName !== 'string') return false;

  // Regex: lowercase alphanumeric, underscores allowed, 1-50 chars
  const roleRegex = /^[a-z0-9_]{1,50}$/;
  return roleRegex.test(roleName);
}

/**
 * Validate email format
 * Basic email validation
 *
 * @param email - Email to validate
 * @returns True if valid
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Normalize organization slug
 * Convert to lowercase, replace spaces with hyphens, remove invalid chars
 *
 * @param input - Input string
 * @returns Normalized slug
 */
export function normalizeOrganizationSlug(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove invalid characters
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Check if slug is reserved
 * Prevent using common reserved words as organization slugs
 *
 * @param slug - Slug to check
 * @returns True if reserved
 */
export function isReservedSlug(slug: string): boolean {
  const reserved = [
    'admin',
    'api',
    'app',
    'auth',
    'billing',
    'dashboard',
    'docs',
    'help',
    'home',
    'login',
    'logout',
    'new',
    'null',
    'pricing',
    'register',
    'settings',
    'signup',
    'support',
    'terms',
    'undefined',
    'www',
  ];

  return reserved.includes(slug.toLowerCase());
}
