# Phase 2: Detailed Refactoring Tasks

This document details the tasks for **Phase 2**, focusing on Refactoring (Atomic Design) and Logic Separation (Services/Hooks) along with their corresponding API Endpoint definitions.

## 1. General Architecture Setup

- [ ] **Folder Structure**: Create `src/components/{atoms,molecules,organisms,templates}`.
- [ ] **Service Layer**: Create `src/services` and `src/hooks`.

---

## 2. Refactoring Tasks by Feature/Page

### 2.1 Authentication (`/login`, `/register`, `/resetpassword`)

**API Endpoints:**
-   `POST /api/auth/register` (Register new user with Role)
-   `POST /api/auth/login` (Login user)
-   `GET /api/users/me` (Get current session/profile)
-   `PUT /api/users/me` (Update profile)

**Refactoring:**
-   **Atoms**: `InputField`, `PrimaryButton`, `GoogleAuthButton`, `ErrorMessage`.
-   **Molecules**: `LoginForm`, `RegisterForm` (Handle role state), `RoleSelector`.
-   **Templates**: `AuthLayout` (Split screen with image and form).
-   **Logic**:
    -   Move auth state to `useAuth` hook.
    -   Implement `authService.login`, `authService.register` in `src/services/auth.ts`.

### 2.2 Landing Page & General (`/`, `/bantuanFAQ`)

**API Endpoints:**
-   `GET /api/public/stats` (Optional: Home page stats)
-   `GET /api/cms/content` (Dynamic content if applicable)

**Refactoring:**
-   **Atoms**: `Logo`, `NavLink`, `FooterLink`, `SectionTitle`.
-   **Molecules**: `NavbarUserDropdown`, `HeroBanner`, `FAQItem`.
-   **Organisms**: `Navbar`, `Footer`, `PartnerSection`.
-   **Logic**:
    -   Extract FAQ fetching to `useFAQ` (`src/hooks/useFAQ.ts`).

### 2.3 Dashboard (`/dashboard`, `/admin`)

**API Endpoints:**
-   `GET /api/admin/dashboard` (Aggregated stats for admin)
-   `GET /api/admin/verifications` (List pending items)
-   `POST /api/admin/verify` (Action: Approve/Reject)

**Refactoring:**
-   **Atoms**: `StatusBadge` (Success/Pending/Error), `StatCard`, `SidebarItem`.
-   **Molecules**: `ChartContainer`, `FilterBar`, `PaginationControl`.
-   **Organisms**: `Sidebar`, `TopBar`, `DashboardOverview`.
-   **Logic**:
    -   Create `useDashboardStats` hook.
    -   Service: `dashboardService.getStats` (calls `/api/admin/dashboard`).
    -   Service: `dashboardService.getPendingItems` (calls `/api/admin/verifications`).

### 2.4 Innovation (`/innovation`)

**API Endpoints:**
-   `GET /api/innovations` (List all with filters)
-   `POST /api/innovations` (Create)
-   `GET /api/innovations/[id]` (Detail)
-   `PUT /api/innovations/[id]` (Update)
-   `DELETE /api/innovations/[id]` (Delete)
-   `GET /api/innovations/[id]/villages` (List villages that applied this)

**Refactoring:**
-   **Atoms**: `CategoryTag`, `RatingStar`.
-   **Molecules**: `InnovationCard`, `InnovationFilter`, `CommentItem`.
-   **Organisms**: `InnovationGrid`, `InnovationDetailView`, `InnovationForm`.
-   **Logic**:
    -   Hooks: `useInnovations` (with SWR/React Query), `useInnovationDetail`.
    -   Services: `innovationService.getAll`, `innovationService.getById`, `innovationService.create`.

### 2.5 Villages (`/village`)

**API Endpoints:**
-   `GET /api/villages` (List all)
-   `GET /api/villages/[id]` (Detail)
-   `GET /api/villages/[id]/claims` (Get claims specific to village)
-   `POST /api/villages/claims` (Submit new innovation claim)

**Refactoring:**
-   **Molecules**: `VillageProfileCard`, `VillageMapPin`.
-   **Organisms**: `VillageList`, `VillageHeader`, `VillageStats`.
-   **Logic**:
    -   Hooks: `useVillages`, `useVillageClaims`.
    -   Services: `villageService.getAll`, `villageService.getClaims`, `villageService.submitClaim`.

### 2.6 Innovators (`/innovator`)

**API Endpoints:**
-   `GET /api/innovators` (List all)
-   `GET /api/innovators/[id]` (Detail)
-   `GET /api/innovators/[id]/innovations` (List their innovations)

**Refactoring:**
-   **Molecules**: `InnovatorCard`.
-   **Organisms**: `InnovatorGrid`, `InnovatorProfile`.
-   **Logic**:
    -   Services: `innovatorService.getAll`, `innovatorService.getProfile`.
