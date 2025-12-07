/**
 * @bniddam-labs/tenant-core-shared
 *
 * Framework-agnostic multi-tenant types, utilities and business logic
 * for SaaS applications.
 *
 * This package provides:
 * - Type definitions and enums
 * - Pure business logic functions (permissions, roles)
 * - Validation utilities
 * - Constants and default configurations
 *
 * Use with framework-specific adapters:
 * - @bniddam-labs/tenant-core-nestjs (NestJS + TypeORM)
 * - @bniddam-labs/tenant-core-adonis (AdonisJS + Lucid) - coming soon
 */

// Export types
export * from './types/index.js';

// Export utilities
export * from './utils/index.js';

// Export constants
export * from './constants/index.js';
