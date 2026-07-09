# TripNest 🏨

TripNest is a full-stack hotel booking application built with modern web technologies.

Users can browse properties, securely authenticate, make bookings, manage their reservations, and enjoy a polished booking experience through a modern, responsive interface.

---

## 🚀 Features

### Authentication
- User signup and login
- Supabase Authentication
- Server-side session handling
- Protected booking actions
- Secure logout

### Property Browsing
- Browse available properties
- Property details page
- Responsive property cards
- Search properties by destination
- Refine search directly from the search results page
- Shareable URL-based search


### Booking System
- Create bookings
- Booking confirmation dialog
- View personal bookings
- Cancel bookings
- Confirmation before cancellation
- User-specific booking history

### UI / UX
- Responsive design
- Reusable UI components
- Reusable confirmation dialogs
- Booking success dialog
- Loading states
- Modern component system using shadcn/ui
- URL-driven search experience

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- Supabase

### Database
- PostgreSQL (Supabase)

### Other Tools
- Sonner
- Lucide React
- Git & GitHub

---

## 📂 Project Structure

```text
app/
│
├── api/
│   └── bookings/
│
├── bookings/
├── login/
├── signup/
├── properties/
│   └── [id]/
│
components/
│
├── bookings/
├── layout/
├── shared/
├── ui/
│
constants/
hooks/
lib/
types/
```

---

## 🔐 Database

### properties

Stores property information.

### bookings

Stores user reservations.

Relationships

- One property → Many bookings
- One user → Many bookings

Foreign Keys

- `bookings.user_id → auth.users.id`
- `bookings.property_id → properties.id`

---

## ✨ Current Features

- User Authentication
- Property Listing
- Property Details
- Booking Creation
- Booking Success Dialog
- My Bookings
- Booking Cancellation
- Confirmation Dialogs
- Shared Utility Functions
- Shared Type Definitions
- Responsive Layout
- Protected API Routes

---

## 🎯 Learning Goals

This project is built to practice production-level full-stack development.

Concepts covered include:

- Next.js App Router
- Server & Client Components
- API Route Design
- Authentication
- Database Relationships
- Component Architecture
- Reusable Components
- TypeScript
- PostgreSQL
- Supabase

---

## 🚧 Roadmap

### Completed ✅

- Authentication
- Property browsing
- Property details
- Booking system
- Booking management
- Booking success flow
- Confirmation dialogs
- shadcn/ui integration

### Planned 🚀

- Search & Filters
- Favorites / Wishlist
- Reviews & Ratings
- User Profile
- Admin Dashboard
- Deployment