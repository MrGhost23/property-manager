# Property Manager Dashboard

A simple, responsive property management dashboard built with **React.js** and **TailwindCSS**
This project serves as a front-end practical test and demonstrates core React practices, API handling, component structure, and responsive design.

---

## Features

### 1. Dark mode toggle

### 2. Dashboard Page

- Displays a list of properties
- Each property includes:
  - Property Name
  - Address
  - Number of Tenants
  - Current Rent Due

### 3. Tenant Management

- View tenants for a specific property
- Tenant Details Page includes:

  - Tenant Name
  - Lease Start & End Dates
  - Rent Amount
  - Payment Status (Green if Paid, Red if Unpaid)

### Responsive Design

- Works seamlessly across mobile, tablet, and desktop

### Technical Stack

- **React 19** with **Hooks** (`useState`, `useEffect`)
- **React Router** for navigation
- **TailwindCSS** for styling
- **React Query** for data fetching
- **Axios** for API calls
- **React Hot Toast** for notifications (toasts)
- **Radix UI** components for accessible UI
- **Date fns** for formatting date
- **lottie-react** for splash screen animation
- **lucide-react** for icons

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MrGhost23/property-manager.git
cd property-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Mock API Server (using JSON Server)

```bash
npx json-server db.json
```

> Make sure your `db.json` file is in the root of your project or configure accordingly.

### 4. Start the Development Server

```bash
npm run dev
```
