# FundGo
A React-based student grant management platform featuring a smart multi-step application form, role-based access control, and a real-time admin dashboard for request lifecycle management. 🚧 Backend in progress.

## Features

* **Multi-Step Application Form** — 5-step grant request form (Personal, Family, Studies, Bank, Declaration) with automatic Redux draft saving between steps
* **Field-Level Validation** — Each field is validated independently with detailed Hebrew error messages before advancing to the next step
* **Role-Based Access Control** — Students submit and track their own requests; admins access a dedicated dashboard for reviewing and deciding on all pending requests
* **Admin Dashboard** — View all pending grant requests, drill into full applicant details, and approve or reject with a single click
* **Real-Time Status Tracking** — Students can follow the status of their latest request (waiting / approved / rejected) at any time
* **Authentication** — Register and login by ID number, with locked personal fields auto-filled from the user profile
* **Animated Statistics** — Home page counter that animates grant totals, supported students, and success rate on scroll
* **Responsive RTL-first UI** — Full right-to-left layout optimized for Hebrew, with a smart navbar that hides on scroll

## Tech Stack

### Frontend
* React 18
* Redux Toolkit (state management + draft saving)
* React Router v6 (client-side routing)
* React Toastify (admin action notifications)
* canvas-confetti (approval animation)
* CSS Modules + custom CSS variables

### Backend
* 🚧 In progress

## Getting Started

### Prerequisites
* Node.js

### Installation

```
cd frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser.
