/**
 * Global Configuration File
 *
 * This file centralizes all configuration settings for the Tesa AI Hub application.
 * It includes environment variables, API endpoints, database connections, and application constants.
 *
 * @module config
 */

/**
 * Environment Configuration
 * All environment variables are loaded from .env file and validated here
 */
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  app: {
    name: 'Tesa AI Hub',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development',
  },
} as const;

/**
 * Supabase Database Configuration
 * Connection settings and table names for the database
 */
export const database = {
  tables: {
    useCases: 'use_cases',
    users: 'users',
    departments: 'departments',
  },
  schema: 'public',
} as const;

/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for all API calls
 */
export const api = {
  supabase: {
    baseUrl: env.supabase.url,
    endpoints: {
      useCases: '/rest/v1/use_cases',
      auth: '/auth/v1',
      storage: '/storage/v1',
    },
  },
} as const;

/**
 * Application Routes
 * Defines the routing structure of the application
 */
export const routes = {
  home: '/',
  overview: '/overview',
  useCase: (id: string) => `/use-case/${id}`,
} as const;

/**
 * Feature Flags
 * Enable or disable features throughout the application
 */
export const features = {
  authentication: false,
  newUseCaseCreation: true,
  search: true,
  filtering: true,
  darkMode: false,
} as const;

/**
 * Application Constants
 * Reusable constants used throughout the application
 */
export const constants = {
  departments: ['Marketing', 'R&D', 'Procurement', 'IT', 'HR', 'Operations'] as const,
  statuses: ['Ideation', 'Pre-Evaluation', 'Evaluation', 'PoC', 'MVP', 'Live', 'Archived'] as const,
  languages: ['en', 'de'] as const,
  defaultLanguage: 'de',

  // Status colors for UI
  statusColors: {
    Live: 'bg-green-600',
    MVP: 'bg-blue-600',
    PoC: 'bg-orange-500',
    Evaluation: 'bg-yellow-600',
    'Pre-Evaluation': 'bg-purple-600',
    Ideation: 'bg-gray-500',
    Archived: 'bg-gray-400',
  },

  // Default images for departments
  defaultImages: {
    Marketing: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    'R&D': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
    Procurement: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    IT: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
    HR: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
    Operations: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
  },

  // Validation rules
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    url: /^https?:\/\/.+/,
    maxTitleLength: 200,
    maxShortDescriptionLength: 300,
    maxFullDescriptionLength: 5000,
  },
} as const;

/**
 * UI Configuration
 * Settings related to the user interface
 */
export const ui = {
  pagination: {
    defaultPageSize: 12,
    pageSizeOptions: [6, 12, 24, 48],
  },
  animation: {
    duration: 200,
    easing: 'ease-in-out',
  },
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
  },
} as const;

/**
 * External Links Configuration
 * Links to external systems and resources
 */
export const externalLinks = {
  sharepoint: {
    baseUrl: 'https://sharepoint.tesa.com',
  },
  confluence: {
    baseUrl: 'https://confluence.tesa.com',
  },
  bits: {
    baseUrl: 'https://bits.tesa.com',
    rolesRequestPath: '/roles/request',
  },
  support: {
    email: 'ai-team@tesa.com',
    portal: 'https://support.tesa.com/ai-hub',
  },
} as const;

/**
 * Validates that all required environment variables are present
 * @throws {Error} If required environment variables are missing
 */
export function validateConfig(): void {
  const required = [
    { key: 'VITE_SUPABASE_URL', value: env.supabase.url },
    { key: 'VITE_SUPABASE_ANON_KEY', value: env.supabase.anonKey },
  ];

  const missing = required.filter(({ value }) => !value);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.map(({ key }) => key).join(', ')}`
    );
  }
}

/**
 * Exports a utility function to get the full API endpoint URL
 */
export function getApiUrl(endpoint: string): string {
  return `${api.supabase.baseUrl}${endpoint}`;
}

/**
 * Configuration validator (run at startup)
 */
if (import.meta.env.MODE !== 'test') {
  validateConfig();
}

export default {
  env,
  database,
  api,
  routes,
  features,
  constants,
  ui,
  externalLinks,
  validateConfig,
  getApiUrl,
};
