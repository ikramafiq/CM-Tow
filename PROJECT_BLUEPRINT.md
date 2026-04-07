# MedicTow CM Tow Truck Management Platform — Project Blueprint

## 1. BUSINESS CONTEXT

| Field              | Detail                                                                 |
|--------------------|------------------------------------------------------------------------|
| Company Name       | MedicTow CM Sdn Bhd                                                      |
| Industry           | AATF (Authorized Automotive Treatment Facility) — Vehicle Disposal     |
| Country            | Malaysia                                                               |
| Currency           | Malaysian Ringgit (RM)                                                 |
| Business Model     | Gig economy platform — offer tow jobs to independent tow truck drivers |
| Comparable Apps    | Lalamove, Grab, Foodpanda (but for tow trucks only)                    |
| Fixed Destination  | All towed vehicles go to MedicTow CM factory in Bandar Teknologi Kajang, Selangor |
| Platform Type      | Web application (mobile-responsive)                                    |

---

## 2. TECH STACK

### 2.1 Current Stack (Frontend Only — Mock Data)

| Category           | Tool / Library              | Version   | Purpose                                         |
|--------------------|-----------------------------|-----------|-------------------------------------------------|
| Build Tool         | Vite                        | 6.3.5     | Dev server and production bundler               |
| Framework          | React                       | 18.3.1    | UI component framework                          |
| Language           | TypeScript                  | (via Vite) | Type safety                                    |
| Styling            | Tailwind CSS                | 4.1.12    | Utility-first CSS                               |
| Tailwind Plugin    | @tailwindcss/vite           | 4.1.12    | Tailwind v4 Vite integration                    |
| Routing            | react-router                | 7.13.0    | Client-side routing and role-based navigation   |
| UI Primitives      | @radix-ui/react-accordion   | 1.2.3     | Accessible accordion component                  |
| UI Primitives      | @radix-ui/react-alert-dialog| 1.1.6     | Accessible alert dialog                         |
| UI Primitives      | @radix-ui/react-aspect-ratio| 1.1.2     | Aspect ratio container                          |
| UI Primitives      | @radix-ui/react-avatar      | 1.1.3     | Avatar component                                |
| UI Primitives      | @radix-ui/react-checkbox    | 1.1.4     | Accessible checkbox                             |
| UI Primitives      | @radix-ui/react-collapsible | 1.1.3     | Collapsible section                             |
| UI Primitives      | @radix-ui/react-context-menu| 2.2.6     | Right-click context menus                       |
| UI Primitives      | @radix-ui/react-dialog      | 1.1.6     | Modal dialogs                                   |
| UI Primitives      | @radix-ui/react-dropdown-menu| 2.1.6    | Dropdown menus                                  |
| UI Primitives      | @radix-ui/react-hover-card  | 1.1.6     | Hover tooltip cards                             |
| UI Primitives      | @radix-ui/react-label       | 2.1.2     | Accessible form labels                          |
| UI Primitives      | @radix-ui/react-menubar     | 1.1.6     | Menu bar navigation                             |
| UI Primitives      | @radix-ui/react-navigation-menu | 1.2.5 | Navigation menu component                       |
| UI Primitives      | @radix-ui/react-popover     | 1.1.6     | Popover overlays                                |
| UI Primitives      | @radix-ui/react-progress    | 1.1.2     | Progress bar                                    |
| UI Primitives      | @radix-ui/react-radio-group | 1.2.3     | Radio button group                              |
| UI Primitives      | @radix-ui/react-scroll-area | 1.2.3     | Custom scrollable area                          |
| UI Primitives      | @radix-ui/react-select      | 2.1.6     | Accessible select dropdown                      |
| UI Primitives      | @radix-ui/react-separator   | 1.1.2     | Visual divider                                  |
| UI Primitives      | @radix-ui/react-slider      | 1.2.3     | Range slider                                    |
| UI Primitives      | @radix-ui/react-slot        | 1.1.2     | Slot/composition primitive                      |
| UI Primitives      | @radix-ui/react-switch      | 1.1.3     | Toggle switch                                   |
| UI Primitives      | @radix-ui/react-tabs        | 1.1.3     | Tab navigation                                  |
| UI Primitives      | @radix-ui/react-toggle      | 1.1.2     | Toggle button                                   |
| UI Primitives      | @radix-ui/react-toggle-group| 1.1.2     | Group of toggle buttons                         |
| UI Primitives      | @radix-ui/react-tooltip     | 1.1.8     | Tooltip overlays                                |
| Material UI        | @mui/material               | 7.3.5     | Available MUI component library (installed)     |
| Material UI        | @mui/icons-material         | 7.3.5     | MUI icon set (installed)                        |
| MUI Peer           | @emotion/react              | 11.14.0   | CSS-in-JS for MUI                               |
| MUI Peer           | @emotion/styled             | 11.14.1   | Styled components for MUI                       |
| Icons              | lucide-react                | 0.487.0   | SVG icon library (actively used in UI)          |
| Animation          | motion                      | 12.23.24  | Animation library (Framer Motion successor)     |
| Animation CSS      | tw-animate-css              | 1.3.8     | Tailwind animation utilities                    |
| Charts             | recharts                    | 2.15.2    | Chart components (available for dashboards)     |
| Forms              | react-hook-form             | 7.55.0    | Form state management and validation            |
| Date Utils         | date-fns                    | 3.6.0     | Date formatting and manipulation                |
| Date Picker        | react-day-picker            | 8.10.1    | Calendar/date picker component                  |
| Drag & Drop        | react-dnd                   | 16.0.1    | Drag-and-drop primitives                        |
| Drag & Drop        | react-dnd-html5-backend     | 16.0.1    | HTML5 backend for react-dnd                     |
| Carousel           | embla-carousel-react        | 8.6.0     | Touch-friendly carousel                         |
| Carousel           | react-slick                 | 0.31.0    | Slick carousel (alternative)                    |
| Masonry            | react-responsive-masonry    | 2.7.1     | Masonry grid layout                             |
| Drawer             | vaul                        | 1.1.2     | Bottom drawer component                         |
| Command Palette    | cmdk                        | 1.1.1     | Command menu (CMD+K style)                      |
| OTP Input          | input-otp                   | 1.4.2     | One-time password input                         |
| Toast              | sonner                      | 2.0.3     | Toast notification system                       |
| Popper             | @popperjs/core              | 2.11.8    | Tooltip/popover positioning engine              |
| Popper             | react-popper                | 2.3.0     | React wrapper for Popper.js                     |
| Resizable          | react-resizable-panels      | 2.1.7     | Resizable panel layouts                         |
| Theme              | next-themes                 | 0.4.6     | Dark/light theme switching                      |
| Confetti           | canvas-confetti             | 1.9.4     | Celebration animation                           |
| CSS Utils          | clsx                        | 2.1.1     | Conditional class name merging                  |
| CSS Utils          | tailwind-merge              | 3.2.0     | Tailwind class conflict resolution              |
| CSS Utils          | class-variance-authority    | 0.7.1     | Variant-based component styling                 |
| Vite Plugin        | @vitejs/plugin-react        | 4.7.0     | React Fast Refresh for Vite                     |

### 2.2 Planned Stack Additions (Future)

| Category           | Tool (Suggested)            | Purpose                                          |
|--------------------|-----------------------------|--------------------------------------------------|
| Backend Framework  | Next.js 14 (App Router) or Express.js | API routes, server-side rendering     |
| Database           | PostgreSQL or MySQL         | Persistent data storage                          |
| ORM                | Prisma                      | Type-safe database access                        |
| Authentication     | NextAuth.js or JWT + bcrypt | Real user sessions and password hashing          |
| File Storage       | AWS S3 or Cloudflare R2     | Store pickup and delivery photos                 |
| Real-time          | Pusher or Socket.io         | Live job status updates, notifications           |
| Maps               | Google Maps API or Leaflet  | Driver location tracking, route display          |
| Push Notifications | Firebase Cloud Messaging    | Notify drivers of new jobs, notify admin of updates |
| Hosting            | Vercel or Railway           | App deployment                                   |
| CI/CD              | GitHub Actions              | Automated testing and deployment pipeline        |

---

## 3. DESIGN SYSTEM

| Property       | Value                                |
|----------------|--------------------------------------|
| Theme          | Dark mode only                       |
| Background     | #0a0a0a (near black)                 |
| Primary Accent | #dc2626 (red-600)                    |
| Hover Accent   | #b91c1c (red-700)                    |
| Card Background| gray-900/50 with border-gray-800     |
| Text Primary   | white                                |
| Text Secondary | gray-400                             |
| Text Muted     | gray-500 / gray-600                  |
| Border Radius  | rounded-xl (12px) on cards, rounded-lg (8px) on inputs |
| No emojis      | All visual indicators use SVG icons (lucide-react) |
| Font           | System font via CSS variable         |

---

## 4. USER ROLES AND PERMISSIONS

### 4.1 Role Overview

| Role        | Who They Are                          | Login Access          |
|-------------|---------------------------------------|-----------------------|
| Super Admin | Company owner / boss                  | /super-admin route    |
| Admin       | Company staff                         | /admin route          |
| Driver      | Independent tow truck driver (contractor) | /driver route    |

### 4.2 Permission Matrix

| Feature / Action                    | Super Admin | Admin | Driver |
|-------------------------------------|:-----------:|:-----:|:------:|
| Create tow job                      | Yes         | Yes   | No     |
| View all tow jobs                   | Yes         | Yes   | No     |
| View own accepted jobs              | Yes         | Yes   | Yes    |
| View Open jobs (job feed)           | No          | No    | Yes    |
| Edit job price                      | Yes         | No    | No     |
| Delete job                          | Yes         | Yes (Pending/Open/Cancelled only) | No |
| Approve job (Pending -> Open)       | Yes         | No    | No     |
| Reject job (Pending -> Cancelled)   | Yes         | No    | No     |
| Accept job (Open -> Pending Confirmation) | No   | No    | Yes    |
| Confirm job (Pending Confirmation -> Confirmed) | No | Yes | No  |
| Update job status (driver steps)    | No          | No    | Yes    |
| Upload pickup photos                | No          | No    | Yes    |
| Upload delivery photos              | No          | No    | Yes    |
| View customer name and phone        | Yes         | Yes   | Only after Confirmed |
| Create accounts                     | Yes         | No    | No     |
| Read/view all accounts              | Yes         | No    | No     |
| Edit accounts                       | Yes         | No    | No     |
| Deactivate / reactivate accounts    | Yes         | No    | No     |
| Delete accounts                     | Yes         | No    | No     |
| View revenue / stats dashboard      | Yes         | No    | No     |
| View own earnings                   | No          | No    | Yes    |

### 4.3 Route Access Control

| Route                        | Super Admin | Admin | Driver |
|------------------------------|:-----------:|:-----:|:------:|
| /login                       | Yes         | Yes   | Yes    |
| /super-admin                 | Yes         | No    | No     |
| /super-admin/jobs            | Yes         | No    | No     |
| /super-admin/jobs/:jobId     | Yes         | No    | No     |
| /super-admin/accounts        | Yes         | No    | No     |
| /admin                       | Yes         | Yes   | No     |
| /admin/jobs/new              | Yes         | Yes   | No     |
| /admin/jobs/:jobId           | Yes         | Yes   | No     |
| /driver                      | No          | No    | Yes    |
| /driver/my-jobs              | No          | No    | Yes    |
| /driver/jobs/:jobId          | No          | No    | Yes    |

Note: Super Admin has access to Admin routes but not Driver routes.
Unauthenticated users are redirected to /login from all routes.

---

## 5. DATA MODELS

### 5.1 User

| Field           | Type     | Required | Notes                                              |
|-----------------|----------|----------|----------------------------------------------------|
| id              | string   | Yes      | Format: USR001, USR002...                          |
| name            | string   | Yes      | Full name                                          |
| email           | string   | Yes      | Used as login credential                           |
| password        | string   | Yes      | Plaintext in mock; must be hashed in production    |
| role            | enum     | Yes      | super-admin / admin / driver                       |
| phone           | string   | Yes      | Malaysian format: 01X-XXXXXXX                      |
| isActive        | boolean  | Yes      | Inactive users cannot log in                       |
| createdAt       | Date     | Yes      | Account creation timestamp                         |
| vehicleType     | string   | No       | Drivers only. e.g. Flatbed Tow Truck               |
| operatingState  | string   | No       | Drivers only. Malaysian state they operate in      |

### 5.2 Job

| Field           | Type           | Required | Notes                                            |
|-----------------|----------------|----------|--------------------------------------------------|
| id              | string         | Yes      | Format: JOB001, JOB002...                        |
| vehicleInfo     | object         | Yes      | See VehicleInfo below                            |
| pickupLocation  | object         | Yes      | See Location below                               |
| destination     | object         | Yes      | Fixed — always MedicTow CM factory                 |
| customerName    | string         | Yes      | Hidden from driver until status = Confirmed      |
| customerPhone   | string         | Yes      | Hidden from driver until status = Confirmed      |
| issueDescription| string         | Yes      | Reason for towing                                |
| price           | number         | Yes      | Amount in RM (Malaysian Ringgit)                 |
| status          | enum           | Yes      | See Job Status list below                        |
| postedAt        | Date           | Yes      | When job was created                             |
| createdBy       | string         | Yes      | Name of the admin who created the job            |
| approvedAt      | Date           | No       | When Super Admin approved                        |
| approvedBy      | string         | No       | Name of the Super Admin who approved             |
| assignedDriver  | object         | No       | Set when driver accepts. See Driver Ref below    |
| confirmedAt     | Date           | No       | When Admin confirmed after phone call            |
| confirmedBy     | string         | No       | Name of the Admin who confirmed                  |
| pickupPhotos    | string[]       | Yes      | Array of base64 image data URLs (currently)      |
| deliveryPhotos  | string[]       | Yes      | Array of base64 image data URLs (currently)      |
| statusHistory   | object[]       | Yes      | Append-only log of all status changes            |

### 5.3 VehicleInfo (nested in Job)

| Field       | Type   | Required | Notes                               |
|-------------|--------|----------|-------------------------------------|
| make        | string | Yes      | Brand e.g. Proton, Toyota, Honda    |
| model       | string | Yes      | e.g. X70, Vios, Myvi                |
| plateNumber | string | Yes      | Malaysian plate format e.g. WXY 1234|
| year        | string | No       | Manufacturing year                  |

### 5.4 Location (nested in Job — pickupLocation and destination)

| Field   | Type   | Required | Notes                                      |
|---------|--------|----------|--------------------------------------------|
| address | string | Yes      | Street address                             |
| town    | string | Yes      | Town or city                               |
| state   | string | Yes      | One of 14 Malaysian states / territories   |

### 5.5 AssignedDriver (nested in Job)

| Field | Type   | Required | Notes                    |
|-------|--------|----------|--------------------------|
| id    | string | Yes      | References User.id       |
| name  | string | Yes      | Driver full name         |
| phone | string | Yes      | Driver phone number      |

### 5.6 StatusHistoryEntry (array item in Job.statusHistory)

| Field     | Type   | Required | Notes                             |
|-----------|--------|----------|-----------------------------------|
| status    | enum   | Yes      | The status that was entered       |
| timestamp | Date   | Yes      | When this status was entered      |
| note      | string | No       | Optional context note             |
| updatedBy | string | No       | Name of the user who triggered it |

### 5.7 Malaysian States (valid values for Location.state)

Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Penang, Perak, Perlis,
Sabah, Sarawak, Selangor, Terengganu, Wilayah Persekutuan

---

## 6. JOB STATUS DEFINITIONS

| Status                | Set By      | Meaning                                                      |
|-----------------------|-------------|--------------------------------------------------------------|
| Pending Approval      | System      | Admin created the job; waiting for Super Admin to review     |
| Open                  | Super Admin | Job approved and visible to all active drivers               |
| Pending Confirmation  | Driver      | Driver accepted the job; Admin needs to call customer        |
| Confirmed             | Admin       | Admin called customer off-app and confirmed; driver gets customer info |
| En Route to Pickup    | Driver      | Driver is driving to the pickup location                     |
| At Pickup             | Driver      | Driver has arrived at the vehicle location                   |
| In Transit            | Driver      | Vehicle is loaded onto truck; driving to MedicTow CM factory   |
| Arrived               | Driver      | Driver and vehicle have arrived at MedicTow CM factory         |
| Completed             | Driver      | Job fully done; delivery confirmed with photos               |
| Cancelled             | Super Admin | Job rejected or cancelled at any stage                       |

---

## 7. JOB WORKFLOW FLOWCHART

```
[Admin or Super Admin]
        |
        | Creates job (fills vehicle info, pickup location,
        | customer details, issue description, price)
        v
[Status: Pending Approval]
        |
        | Super Admin reviews job on dashboard
        |
   +---------+
   |         |
[Approve] [Reject]
   |         |
   v         v
[Status:  [Status:
  Open]   Cancelled] --> END
   |
   | Job is now visible to all active drivers
   |
[Driver sees job in Available Jobs feed]
        |
        | Driver clicks "Accept Job"
        | (Driver can only accept 1 job at a time)
        v
[Status: Pending Confirmation]
        |
        | ADMIN action required
        | Admin sees notification on dashboard
        | Admin calls customer by phone (OFF-APP)
        | After verbal confirmation, Admin clicks
        | "Mark as Confirmed" in app
        v
[Status: Confirmed]
        |
        | Customer name and phone number
        | are now REVEALED to the driver
        |
[Driver clicks "Head to Pickup Location"]
        v
[Status: En Route to Pickup]
        |
[Driver clicks "I've Arrived at Pickup"]
        v
[Status: At Pickup]
        |
        | Driver takes photos of vehicle
        | (minimum 1 photo required before proceeding)
        | Upload via camera (mobile) or file (desktop)
        |
[Driver clicks "Vehicle Loaded - Head to Destination"]
        v
[Status: In Transit]
        |
[Driver clicks "I've Arrived at Destination"]
        v
[Status: Arrived]
        |
        | Driver takes photos of delivered vehicle
        | (minimum 1 photo required before proceeding)
        | Upload via camera (mobile) or file (desktop)
        |
[Driver clicks "Mark Job as Completed"]
        v
[Status: Completed] --> END
```

---

## 8. FILE AND FOLDER STRUCTURE

```
src/
  main.tsx                         -- App entry point
  styles/
    index.css                      -- Imports fonts, tailwind, theme
    fonts.css                      -- Font definitions
    tailwind.css                   -- Tailwind base
    theme.css                      -- CSS variables for dark theme, colors
  app/
    App.tsx                        -- Root component; wraps AuthProvider + AppProvider
    routes.tsx                     -- All routes with role-based guards
    context/
      AuthContext.tsx              -- Auth state: login, logout, currentUser, role
      AppContext.tsx               -- App state: jobs CRUD, user CRUD, all mutations
    data/
      mock-data.ts                 -- Type definitions, mock users, mock jobs, constants
    components/
      login.tsx                    -- Login page (all roles)
      layout.tsx                   -- Shared header, role-aware nav, mobile nav, user menu
      status-badge.tsx             -- Reusable colored status label component
      photo-upload.tsx             -- Camera/file upload component with lightbox preview
      super-admin/
        dashboard.tsx              -- Stats, revenue, pending approval queue, active jobs
        all-jobs.tsx               -- Searchable/filterable full job list with approve actions
        job-detail.tsx             -- Full job view: approve/reject, edit price, delete, timeline
        accounts.tsx               -- CRUD for all user accounts (admins + drivers)
      admin/
        dashboard.tsx              -- Job list with search and status filter
        post-job.tsx               -- Create new tow job form
        job-detail.tsx             -- Job view with confirm driver action
      driver/
        dashboard.tsx              -- Available jobs feed (Open status only)
        my-jobs.tsx                -- Driver's accepted jobs (active + history)
        job-detail.tsx             -- Job detail with step-by-step status updates + photo upload
```

---

## 9. SCREENS AND THEIR CONTENT

### 9.1 Login (/login)

- MedicTow CM logo and brand name
- Email input field
- Password input field with show/hide toggle
- Sign In button
- Error message display
- Demo credentials reference panel (development only)

### 9.2 Super Admin — Dashboard (/super-admin)

- Welcome header with user name
- Stats row: Pending Approval count, Active Jobs count, Completed count, Active Drivers count
- Total Revenue card (sum of all Completed job prices in RM)
- Pending Approval queue: each card shows vehicle, location, creator, price, Approve + Reject buttons
- Active Jobs list (most recent 5): click to view detail

### 9.3 Super Admin — All Jobs (/super-admin/jobs)

- Total job count header
- Search bar (searches plate number, vehicle name, customer name, job ID)
- Status filter buttons (all 10 statuses + All)
- Job cards: job ID, vehicle, plate, status badge, location, creator, date, driver (if assigned), price
- Inline Approve / Reject / View buttons per job

### 9.4 Super Admin — Job Detail (/super-admin/jobs/:jobId)

- Back navigation
- Job ID, vehicle name, plate, current status badge
- Approve / Reject buttons (visible only when status = Pending Approval)
- Vehicle Information section: make, model, plate, year
- Locations section: pickup address (with green pin), delivery destination (with red pin)
- Customer Details section: name, phone, issue description
- Assigned Driver section (if assigned): name, phone, confirmed by
- Photos section (if any uploaded): pickup photos grid, delivery photos grid
- Price card with Edit button (editable inline)
- Status Timeline: full history with timestamp, note, and who updated
- Danger Zone: Delete Job button (with confirmation dialog)

### 9.5 Super Admin — Accounts (/super-admin/accounts)

- Total account count header
- Add Account button
- Role filter tabs (All, Super Admin, Admin, Driver)
- Account cards: avatar initial, name, role badge, email, active/inactive status
- Per-account actions: Edit (pencil), Toggle Active (switch), Delete (trash)
- Cannot delete or deactivate own account
- Create/Edit Account modal form:
  - Full Name, Email, Password (visible text for admin use), Phone, Role dropdown
  - If role = Driver: Vehicle Type input, Operating State dropdown (Malaysian states)

### 9.6 Admin — Dashboard (/admin)

- Welcome header with user name
- Stats: Pending Confirmation count, Open Jobs count, Active Jobs count, Completed count
- Search bar
- Status filter buttons
- Job list cards: job ID, vehicle, plate, status, pickup location, time ago, driver (if any), price, customer name

### 9.7 Admin — Create Tow Job (/admin/jobs/new)

- Fixed Destination banner: MedicTow CM factory address displayed, non-editable
- Form sections:
  - Vehicle Information: Brand/Make, Model, Plate Number, Year
  - Pickup Location: Street Address, Town/City, State (dropdown)
  - Customer Information: Full Name, Phone Number
  - Job Details: Issue Description (textarea), Tow Price in RM
- Submit button: "Submit for Approval" (disabled until all required fields filled)
- On submit: job created with status Pending Approval

### 9.8 Admin — Job Detail (/admin/jobs/:jobId)

- Back navigation
- Job ID, vehicle, plate, status badge
- Vehicle Information section
- Locations section (pickup + destination)
- Customer Details: name, phone (tappable call link), issue description
- Assigned Driver section (if assigned)
- Photos grid (if uploaded by driver)
- Price card
- Confirm Driver panel (visible only when status = Pending Confirmation):
  - Driver name shown
  - Instruction to call customer first
  - "Mark as Confirmed" button
- Status Timeline
- Delete Job button (only when status = Pending Approval, Open, or Cancelled)

### 9.9 Driver — Available Jobs (/driver)

- Available job count header
- Info note about workflow (accept -> admin calls -> customer info revealed)
- One card per Open job containing:
  - Vehicle make, model, plate number
  - Posted timestamp
  - Price (RM) prominently displayed
  - Pickup location (town, state, street address)
  - Delivery destination (MedicTow CM factory)
  - Issue description
  - Accept Job button
- If driver already has an active job: Accept button disabled with message

### 9.10 Driver — My Jobs (/driver/my-jobs)

- Total jobs and total earnings (RM) summary
- Active Jobs section: job cards with status badge, vehicle, town, price, tap to open
- History section: Completed and Cancelled jobs, dimmed, tap to open

### 9.11 Driver — Job Detail (/driver/jobs/:jobId)

- Back navigation
- Job ID, vehicle, plate, current status badge
- Pending Confirmation notice (when waiting for admin)
- Vehicle Information section
- Route section: pickup location (green pin) + MedicTow CM factory (red pin)
- Customer Details section:
  - LOCKED state (Lock icon + message) when status is Pending Approval, Open, or Pending Confirmation
  - REVEALED state (name + tappable phone number) when status is Confirmed or beyond
- Pickup Photos section (visible from At Pickup onward):
  - Photo grid of uploaded images
  - "Take Photo" button (uses device camera on mobile)
  - "Upload" button (file picker for desktop)
  - Tap photo to open lightbox
- Delivery Photos section (visible from Arrived onward)
- Earnings card (RM amount)
- Action button (advances to next status):
  - Confirmed -> "Head to Pickup Location"
  - En Route to Pickup -> "I've Arrived at Pickup"
  - At Pickup -> "Vehicle Loaded — Head to Destination" (blocked until pickup photo uploaded)
  - In Transit -> "I've Arrived at Destination"
  - Arrived -> "Mark Job as Completed" (blocked until delivery photo uploaded)
- Warning message when photo is required but not yet uploaded
- Status Timeline (most recent at bottom, red dot on latest)
- Completed state: success message showing earnings

---

## 10. STATE MANAGEMENT

| Store         | Technology          | What It Manages                                   |
|---------------|---------------------|---------------------------------------------------|
| AuthContext   | React Context + useState | Logged-in user, role, login(), logout()      |
| AppContext     | React Context + useState | All jobs array, all users array, all mutations|

All state is in-memory (lost on page refresh). This is intentional for the mock/prototype phase.

Key AppContext mutations:
- createJob — adds new job with Pending Approval status
- approveJob — changes status to Open, sets approvedBy and approvedAt
- rejectJob — changes status to Cancelled
- driverAcceptJob — sets assignedDriver, changes status to Pending Confirmation
- confirmJob — changes status to Confirmed, sets confirmedBy and confirmedAt
- updateJobStatus — generic driver status advancement
- addPickupPhotos — appends base64 strings to pickupPhotos array
- addDeliveryPhotos — appends base64 strings to deliveryPhotos array
- deleteJob — removes job from array
- updateJobPrice — edits price (Super Admin only)
- createUser — adds new user account
- updateUser — edits existing user
- toggleUserActive — flips isActive boolean
- deleteUser — removes user from array

---

## 11. PHOTO UPLOAD SYSTEM

| Property              | Current (Mock)              | Future (Production)           |
|-----------------------|-----------------------------|-------------------------------|
| Storage format        | base64 data URL (in memory) | URL string pointing to S3/R2  |
| Max photos per type   | 10                          | Configurable                  |
| Camera support        | Yes (capture="environment") | Yes                           |
| Gallery/file upload   | Yes                         | Yes                           |
| Lightbox preview      | Yes (in-app fullscreen)     | Yes                           |
| Compression           | No (raw base64)             | Yes (resize before upload)    |
| Persistence           | Lost on refresh             | Stored in cloud               |

---

## 12. AUTHENTICATION

| Property              | Current (Mock)                           | Future (Production)               |
|-----------------------|------------------------------------------|-----------------------------------|
| Credential storage    | Plaintext in mock-data.ts                | Hashed with bcrypt in database    |
| Session management    | React state (lost on refresh)            | JWT or server sessions            |
| Route protection      | Client-side role check with redirect     | Server-side middleware + client   |
| Password reset        | Not implemented                          | Email-based reset flow            |
| Account lockout       | Not implemented                          | After N failed attempts           |

---

## 13. FUTURE FEATURES (PLANNED)

| Feature                  | Priority | Description                                                        |
|--------------------------|----------|--------------------------------------------------------------------|
| Real backend + database  | High     | Replace mock data with PostgreSQL + API layer                      |
| Real authentication      | High     | JWT sessions, bcrypt password hashing, protected API routes        |
| Live map / GPS tracking  | High     | Show driver location on map during En Route and In Transit phases  |
| Push notifications       | High     | Alert drivers of new jobs; alert admin when driver accepts         |
| Real-time status updates | Medium   | WebSocket so admin sees driver progress without refreshing         |
| Photo cloud storage      | High     | Upload photos to AWS S3 or Cloudflare R2 instead of base64        |
| Driver ratings           | Medium   | Admin rates driver after job completion                            |
| Job history export       | Medium   | Export job list to CSV/Excel                                       |
| Revenue reports          | Medium   | Monthly/weekly breakdown for Super Admin                           |
| Driver earnings summary  | Medium   | Weekly payout summary per driver                                   |
| Multi-destination support| Low      | Allow jobs to be delivered to locations other than factory         |
| Driver area/zone filter  | Medium   | Only show drivers jobs within their operating state                |
| In-app messaging         | Low      | Chat between admin and driver per job                              |
| Mobile app               | Low      | React Native or Progressive Web App (PWA) version                  |
| Audit log                | Medium   | Full log of who did what and when across the platform              |
| Password change          | High     | Allow users to change their own password                           |

---

## 14. MOCK CREDENTIALS (DEVELOPMENT ONLY)

| Role        | Email                    | Password   | Name           |
|-------------|--------------------------|------------|----------------|
| Super Admin | boss@carmedic.my         | admin123   | Hafiz Azman    |
| Admin       | staff1@carmedic.my       | admin123   | Zainab Hussain |
| Admin       | staff2@carmedic.my       | admin123   | Amirul Faiz    |
| Driver      | razak@carmedic.my        | driver123  | Mohd Razak     |
| Driver      | kumar@carmedic.my        | driver123  | Kumar Selvam   |
| Driver      | tan@carmedic.my          | driver123  | Tan Ah Kow (inactive) |

---

## 15. KEY BUSINESS RULES

1. All towed vehicles go to MedicTow CM Sdn Bhd, Bandar Teknologi Kajang, Selangor — this destination is fixed and not editable by any role.
2. A job must be approved by Super Admin before any driver can see it.
3. A driver can only hold one active job at a time.
4. Customer name and phone number are hidden from the driver until Admin explicitly confirms the job (after off-app phone call).
5. Pickup photos are mandatory before a driver can mark a vehicle as In Transit.
6. Delivery photos are mandatory before a driver can mark a job as Completed.
7. A job's status can only move forward — it cannot be rolled back (except Cancelled from Super Admin).
8. Only Super Admin can approve, reject, edit price, or delete any job.
9. Only Admin can confirm a driver assignment (triggering customer info reveal).
10. Inactive accounts cannot log in to the platform.
