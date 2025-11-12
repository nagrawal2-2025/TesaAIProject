# Tesa AI Hub - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Configuration Management](#configuration-management)
5. [Data Models](#data-models)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [Internationalization](#internationalization)
9. [Database Integration](#database-integration)
10. [API Reference](#api-reference)
11. [Styling and Theming](#styling-and-theming)
12. [Best Practices](#best-practices)
13. [Testing Guidelines](#testing-guidelines)
14. [Deployment](#deployment)
15. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The Tesa AI Hub is a modern single-page application (SPA) built with React and TypeScript. It follows a component-based architecture with clear separation of concerns.

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                  User Interface                  │
│          (React Components + Tailwind)           │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────┐
│              Application Layer                   │
│    (State Management + Business Logic)           │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────┐
│              Data Access Layer                   │
│           (Supabase Client SDK)                  │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────┐
│            Supabase Backend                      │
│      (Database + Auth + Storage)                 │
└─────────────────────────────────────────────────┘
```

### Design Patterns

- **Component Pattern**: Modular, reusable UI components
- **Context Pattern**: Global state management for language preferences
- **Presentation/Container Pattern**: Separation of UI and logic
- **Configuration Pattern**: Centralized configuration management

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | 5.5.3 | Type Safety |
| Vite | 5.4.2 | Build Tool & Dev Server |
| Tailwind CSS | 3.4.1 | Styling Framework |

### Backend & Database

| Technology | Purpose |
|------------|---------|
| Supabase | Backend-as-a-Service (Database, Auth, Storage) |
| PostgreSQL | Database (via Supabase) |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code Linting |
| TypeScript ESLint | TypeScript-specific Linting |
| PostCSS | CSS Processing |
| Autoprefixer | CSS Vendor Prefixing |

### UI Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| lucide-react | 0.344.0 | Icon Library |

---

## Project Structure

```
tesa-ai-hub/
├── public/                 # Static assets
│   └── image.png          # Tesa logo
│
├── src/
│   ├── components/        # React components
│   │   ├── Footer.tsx                 # Application footer
│   │   ├── LandingPage.tsx           # Landing page component
│   │   ├── LanguageSwitcher.tsx      # Language toggle component
│   │   ├── NewUseCaseModal.tsx       # Multi-step form for creating use cases
│   │   ├── UseCaseCard.tsx           # Card display for use case
│   │   ├── UseCaseDetailModal.tsx    # Detailed view modal
│   │   └── UseCaseOverview.tsx       # Main overview page with filtering
│   │
│   ├── contexts/          # React contexts
│   │   └── LanguageContext.tsx       # Internationalization context
│   │
│   ├── data/              # Data files
│   │   └── sampleData.ts             # Sample use case data
│   │
│   ├── config/            # Configuration
│   │   └── index.ts                  # Global configuration file
│   │
│   ├── types.ts           # TypeScript type definitions
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite type declarations
│
├── .env                   # Environment variables (not in git)
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App-specific TypeScript config
├── tsconfig.node.json    # Node-specific TypeScript config
├── vite.config.ts        # Vite configuration
├── README.md             # Project overview and setup
└── DOCUMENTATION.md      # This file
```

---

## Configuration Management

### Global Configuration (`src/config/index.ts`)

All application configuration is centralized in a single file for easy maintenance and consistency.

#### Environment Configuration

```typescript
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  app: {
    name: 'Tesa AI Hub',
    version: '1.0.0',
    environment: import.meta.env.MODE,
  },
};
```

#### Database Configuration

```typescript
export const database = {
  tables: {
    useCases: 'use_cases',
    users: 'users',
    departments: 'departments',
  },
  schema: 'public',
};
```

#### API Endpoints

```typescript
export const api = {
  supabase: {
    baseUrl: env.supabase.url,
    endpoints: {
      useCases: '/rest/v1/use_cases',
      auth: '/auth/v1',
      storage: '/storage/v1',
    },
  },
};
```

#### Feature Flags

```typescript
export const features = {
  authentication: false,
  newUseCaseCreation: true,
  search: true,
  filtering: true,
  darkMode: false,
};
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: Never commit `.env` to version control!

---

## Data Models

### UseCase Type

The core data model representing an AI use case:

```typescript
export interface UseCase {
  id: string;                          // Unique identifier
  title: string;                       // Use case title
  short_description: string;           // Brief summary (card view)
  full_description: string;            // Detailed description
  department: Department;              // Owning department
  status: UseCaseStatus;               // Current lifecycle stage
  owner_name: string;                  // Owner's full name
  owner_email: string;                 // Owner's email address
  image_url?: string;                  // Optional hero image
  business_impact?: string;            // Impact description
  technology_stack: string[];          // Technologies used
  internal_links: InternalLinks;       // Links to resources
  tags: string[];                      // Searchable tags
  related_use_case_ids: string[];      // Related use cases
  created_at: string;                  // Creation timestamp
  updated_at: string;                  // Last update timestamp
  application_url?: string;            // Link to live application
}
```

### Supporting Types

#### Department

```typescript
export type Department =
  | 'Marketing'
  | 'R&D'
  | 'Procurement'
  | 'IT'
  | 'HR'
  | 'Operations';
```

#### UseCaseStatus

```typescript
export type UseCaseStatus =
  | 'Ideation'
  | 'Pre-Evaluation'
  | 'Evaluation'
  | 'PoC'
  | 'MVP'
  | 'Live'
  | 'Archived';
```

#### InternalLinks

```typescript
export interface InternalLinks {
  sharepoint?: string;    // SharePoint documentation
  confluence?: string;    // Confluence page
  demo?: string;          // Demo video
  bits?: string;          // BITS roles request
}
```

---

## Component Architecture

### Component Hierarchy

```
App
├── LandingPage
│   ├── LanguageSwitcher
│   └── (Landing content)
│
└── UseCaseOverview
    ├── Header
    │   └── LanguageSwitcher
    ├── Search & Filters
    ├── UseCaseCard (multiple)
    ├── UseCaseDetailModal
    ├── NewUseCaseModal
    └── Footer
```

### Component Descriptions

#### LandingPage.tsx

**Purpose**: Initial landing page with call-to-action

**Props**:
- `onStartJourney: () => void` - Callback when user clicks CTA

**Features**:
- Animated gradient background with AI-inspired visual elements
- Grid pattern overlay
- Pulsing dots and glowing orbs
- Responsive layout
- Language switcher

#### UseCaseOverview.tsx

**Purpose**: Main application view with use case catalog

**Features**:
- Search functionality (title and description)
- Department filtering
- Status filtering
- Responsive grid layout
- Modal for detailed view
- Modal for creating new use cases
- Results counter

#### UseCaseCard.tsx

**Purpose**: Card component displaying use case summary

**Props**:
- `useCase: UseCase` - Use case data
- `onClick: () => void` - Click handler

**Features**:
- Department badge
- Status indicator
- Truncated descriptions
- Hover effects
- Responsive design

#### UseCaseDetailModal.tsx

**Purpose**: Full-screen modal showing complete use case details

**Props**:
- `useCase: UseCase` - Use case data
- `onClose: () => void` - Close handler
- `relatedUseCases: UseCase[]` - Related use cases
- `onRelatedClick: (id: string) => void` - Related use case click handler

**Features**:
- Hero image with department overlay
- Phase progression indicator
- Business impact section
- Technology stack badges
- Internal links section
- BITS roles section (when applicable)
- Related use cases carousel
- Launch application button

#### NewUseCaseModal.tsx

**Purpose**: Multi-step form for creating new use cases

**Props**:
- `onClose: () => void` - Close handler
- `onSubmit: (data: NewUseCaseData) => void` - Submit handler

**Features**:
- 4-step wizard interface
- Progress indicator
- Form validation
- Tag and technology management
- Step-by-step navigation
- Data collection for all fields

#### LanguageSwitcher.tsx

**Purpose**: Toggle between English and German

**Features**:
- Flag indicators
- Current language highlight
- Smooth transitions

#### Footer.tsx

**Purpose**: Application footer with links

**Features**:
- Three column layout
- About section
- Support section
- Copyright notice
- Responsive design

---

## State Management

### Language Context

Global state for language preferences using React Context API.

#### Provider Setup

```typescript
<LanguageProvider>
  <App />
</LanguageProvider>
```

#### Using the Context

```typescript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      <p>{t('some.translation.key')}</p>
      <button onClick={() => setLanguage('de')}>
        Deutsch
      </button>
    </div>
  );
}
```

### Local State

Component-level state is managed using React's `useState` hook:

```typescript
const [searchTerm, setSearchTerm] = useState('');
const [selectedDepartment, setSelectedDepartment] = useState<Department | 'all'>('all');
const [selectedStatus, setSelectedStatus] = useState<UseCaseStatus | 'all'>('all');
```

---

## Internationalization

### Adding Translations

Edit `src/contexts/LanguageContext.tsx`:

```typescript
const translations: Record<Language, Record<string, string>> = {
  en: {
    'your.key': 'English translation',
  },
  de: {
    'your.key': 'Deutsche Übersetzung',
  }
};
```

### Translation Keys Structure

- `landing.*` - Landing page translations
- `overview.*` - Overview page translations
- `modal.*` - Modal translations
- `footer.*` - Footer translations
- `department.*` - Department names
- `status.*` - Status labels
- `newUseCase.*` - New use case form

### Best Practices

1. Use descriptive, hierarchical keys
2. Always add translations for both languages
3. Keep translations in sync
4. Avoid hardcoded strings in components

---

## Database Integration

### Supabase Setup

The application is configured to use Supabase as the backend database.

#### Database Schema

**use_cases table**:

```sql
CREATE TABLE use_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  department TEXT NOT NULL,
  status TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  image_url TEXT,
  business_impact TEXT,
  technology_stack TEXT[] DEFAULT '{}',
  internal_links JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  related_use_case_ids TEXT[] DEFAULT '{}',
  application_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Row Level Security (RLS)

Enable RLS for security:

```sql
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON use_cases FOR SELECT
  TO public
  USING (true);
```

### Connecting to Supabase

```typescript
import { createClient } from '@supabase/supabase-js';
import { env } from './config';

const supabase = createClient(
  env.supabase.url,
  env.supabase.anonKey
);
```

### CRUD Operations

#### Fetching Use Cases

```typescript
const { data, error } = await supabase
  .from('use_cases')
  .select('*')
  .order('created_at', { ascending: false });
```

#### Creating a Use Case

```typescript
const { data, error } = await supabase
  .from('use_cases')
  .insert([newUseCase])
  .select();
```

#### Updating a Use Case

```typescript
const { data, error } = await supabase
  .from('use_cases')
  .update({ status: 'Live' })
  .eq('id', useCaseId)
  .select();
```

#### Deleting a Use Case

```typescript
const { error } = await supabase
  .from('use_cases')
  .delete()
  .eq('id', useCaseId);
```

---

## API Reference

### Configuration API

Import from `src/config/index.ts`:

```typescript
import config from './config';

// Access environment variables
config.env.supabase.url

// Access database configuration
config.database.tables.useCases

// Access API endpoints
config.api.supabase.endpoints.useCases

// Access constants
config.constants.departments

// Access feature flags
config.features.authentication

// Validate configuration
config.validateConfig()

// Get full API URL
config.getApiUrl('/rest/v1/use_cases')
```

### Context API

#### LanguageContext

```typescript
const { language, setLanguage, t } = useLanguage();

// Get current language
language // 'en' | 'de'

// Change language
setLanguage('de')

// Translate key
t('landing.title') // Returns translated string
```

---

## Styling and Theming

### Tailwind CSS

The application uses Tailwind CSS for styling with a custom configuration.

#### Brand Colors

```javascript
colors: {
  primary: '#E30613',  // Tesa red
  secondary: '#4A90E2', // Blue accent
}
```

#### Custom Classes

Common utility classes used:

- `hover:shadow-lg` - Elevated hover effect
- `transition-all duration-200` - Smooth transitions
- `rounded-lg` - Rounded corners
- `bg-gradient-to-br` - Gradient backgrounds

#### Responsive Design

Breakpoints:

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

### Design System

#### Typography

- **Headings**: Bold, various sizes (`text-4xl`, `text-3xl`, etc.)
- **Body**: Regular weight, readable line height
- **Labels**: Medium weight, smaller size

#### Spacing

Consistent spacing scale (4px increments):
- `p-4`, `p-6`, `p-8` - Padding
- `m-4`, `m-6`, `m-8` - Margin
- `gap-4`, `gap-6` - Flex/Grid gaps

#### Colors

- **Text**: Gray scale (`text-gray-900`, `text-gray-600`)
- **Backgrounds**: White, gray shades, transparent overlays
- **Accents**: Tesa red (`#E30613`), blue (`#4A90E2`)
- **Status**: Green (Live), Blue (MVP), Orange (PoC), etc.

---

## Best Practices

### Code Style

1. **TypeScript**: Always use explicit types
2. **Components**: One component per file
3. **Props**: Define interfaces for all props
4. **Naming**: Use descriptive, meaningful names
5. **Comments**: Document complex logic only

### Component Guidelines

1. **Single Responsibility**: Each component should do one thing
2. **Composition**: Build complex UIs from simple components
3. **Props vs State**: Prefer props for data flow
4. **Side Effects**: Use `useEffect` sparingly

### Performance

1. **Memoization**: Use `useMemo` and `useCallback` for expensive operations
2. **Lazy Loading**: Consider code splitting for large components
3. **Images**: Optimize image sizes and formats
4. **Re-renders**: Minimize unnecessary re-renders

### Security

1. **Environment Variables**: Never commit secrets
2. **Input Validation**: Validate all user inputs
3. **XSS Prevention**: React escapes by default
4. **SQL Injection**: Use Supabase parameterized queries

---

## Testing Guidelines

### Unit Testing

Test individual components and functions:

```typescript
import { render, screen } from '@testing-library/react';
import UseCaseCard from './UseCaseCard';

test('renders use case title', () => {
  const useCase = { /* mock data */ };
  render(<UseCaseCard useCase={useCase} onClick={() => {}} />);
  expect(screen.getByText(useCase.title)).toBeInTheDocument();
});
```

### Integration Testing

Test component interactions and data flow.

### E2E Testing

Test complete user workflows using tools like Cypress or Playwright.

---

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Environment Configuration

Ensure production environment variables are set:

```env
VITE_SUPABASE_URL=https://production.supabase.co
VITE_SUPABASE_ANON_KEY=production-anon-key
```

### Deployment Platforms

The application can be deployed to:

- **Vercel**: Zero-config deployment
- **Netlify**: Automatic builds from Git
- **AWS S3 + CloudFront**: Traditional hosting
- **Azure Static Web Apps**: Microsoft Azure hosting

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Run production build
- [ ] Test production build locally
- [ ] Configure database (Supabase)
- [ ] Set up custom domain
- [ ] Enable HTTPS
- [ ] Configure CORS if needed
- [ ] Set up monitoring and analytics

---

## Troubleshooting

### Common Issues

#### Environment Variables Not Loading

**Problem**: `import.meta.env.VITE_*` is undefined

**Solution**:
1. Ensure `.env` file exists in project root
2. Variable names must start with `VITE_`
3. Restart dev server after changing `.env`

#### Supabase Connection Error

**Problem**: "Invalid API key" or connection timeout

**Solution**:
1. Verify `VITE_SUPABASE_URL` is correct
2. Check `VITE_SUPABASE_ANON_KEY` is valid
3. Ensure Supabase project is active
4. Check network connectivity

#### Build Errors

**Problem**: TypeScript errors during build

**Solution**:
1. Run `npm run typecheck` to identify errors
2. Ensure all imports are correct
3. Check for missing type definitions
4. Verify `tsconfig.json` is properly configured

#### Styling Not Applied

**Problem**: Tailwind classes not working

**Solution**:
1. Check `tailwind.config.js` includes all content paths
2. Ensure `index.css` imports Tailwind directives
3. Restart dev server
4. Clear browser cache

### Debug Mode

Enable detailed logging:

```typescript
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

### Getting Help

1. Check this documentation
2. Review the README.md
3. Contact the AI Transformation Team: ai-team@tesa.com
4. Check the internal support portal

---

## Appendix

### Glossary

- **SPA**: Single Page Application
- **RLS**: Row Level Security (Supabase/PostgreSQL feature)
- **CRUD**: Create, Read, Update, Delete
- **CTA**: Call To Action
- **PoC**: Proof of Concept
- **MVP**: Minimum Viable Product

### External Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)

### Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-04-26 | Initial release |

---

**Document Version**: 1.0.0
**Last Updated**: April 26, 2024
**Maintained by**: Tesa AI Transformation Team
