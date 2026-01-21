# Implementation Plan: Refactoring Desa Digital v3

## Phase 1: Migration Next.js, Better Auth, & Multi-language
Goal: Stabilize the foundation with Next.js App Router, robust Authentication, and i18n.

### 1.1 Complete Next.js Migration
- [ ] **Audit Legacy Routing**: Remove any remaining `react-router-dom` dependencies and usages. Refactor to `next/navigation`.
- [ ] **Optimize Image Loading**: Replace standard `<img>` tags with `next/image` component for performance.
- [ ] **Server/Client Components**: Optimize usage of `'use client'` directives. Ensure metadata is generated on the server side.
- [ ] **Turbopack Stability**: Resolve any lingering stability issues with Turbopack.

### 1.2 Implement Better Auth
- [ ] **Setup Better Auth**: Install and configure `better-auth` (or compatible auth solution).
- [ ] **Auth API**: Create API routes for authentication/session management.
- [ ] **Middleware**: Implement Next.js Middleware to protect private routes (Dashboard, etc.).
- [ ] **UI Integration**: Update Login/Register forms to use the new Auth hooks/actions.

### 1.3 Bilingual Support (Indonesian & English)
- [ ] **Internationalization Setup**: Install `next-intl` or strict `react-i18next` setup for Next.js.
- [ ] **Dictionary Creation**: Create JSON dictionaries for `id` (Indonesian) and `en` (English).
- [ ] **Middleware Configuration**: Configure middleware to handle locale detection and routing.
- [ ] **Layout Adaptation**: Wrap the root layout with the translation provider.
- [ ] **Content Translation**: Gradually replace hardcoded text with translation keys.

## Phase 2: Structural Refactoring & Atomic Design
Goal: Organize code for scalability, maintainability, and reusability.

### 2.1 Refactor to Atomic Design
- [ ] **Directory Setup**: Create structure `src/components/{atoms,molecules,organisms,templates}`.
- [ ] **Atoms**: Refactor basic elements (Buttons, Inputs, Typographies) to `atoms`.
- [ ] **Molecules**: Refactor composite elements (SearchBars, FormGroups, Cards) to `molecules`.
- [ ] **Organisms**: Refactor complex sections (Navbars, Sidebars, DataTables) to `organisms`.
- [ ] **Templates**: Define reusable page layouts in `templates`.
- [ ] **Cleanup**: Remove legacy component folders after migration.

### 2.2 Endpoint & Logic Separation
- [ ] **API Service Layer**: Create `src/services`. Move all `fetch` implementations here.
- [ ] **Hooks Centralization**: Move all custom hooks to `src/hooks`.
- [ ] **Utils Extraction**: Move helper functions to `src/utils` or `src/lib`.

## Phase 3: Backend Integration (MongoDB) & Finalization
Goal: Replace mock API with a real database and deploy for production.

### 3.1 MongoDB Integration
- [ ] **Database Setup**: Set up MongoDB Atlas cluster.
- [ ] **ORM Setup**: Configure Mongoose or Prisma for Next.js.
- [ ] **Schema Definition**: Define User, Village, Innovation schemas matching `db.json`.
- [ ] **API Development**: Create Next.js API Routes (`src/app/api/...`) to implement CRUD.
- [ ] **Data Seed**: Create script to migrate data from `db.json` to MongoDB.

### 3.2 Deployment
- [ ] **Environment Config**: Securely set ENV variables.
- [ ] **Deploy**: Deploy to production (Vercel/Railway).
