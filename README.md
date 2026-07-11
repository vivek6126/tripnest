# TripNest ✈️

TripNest is a modern full-stack hotel booking platform inspired by Airbnb and Booking.com.

Users can browse properties, search destinations, save favorites, securely authenticate, make bookings, and manage their travel plans through a fast, responsive interface built with Next.js and Supabase.

---

# 🚀 Features

## 🔐 Authentication

- User Signup & Login
- Secure Logout
- Supabase Authentication
- Server-side Session Handling
- Protected Routes
- Protected API Actions

---

## 🏡 Property Browsing

- Browse Featured Properties
- Category Pages
- Beach Stays
- Mountain Retreats
- Luxury Escapes
- Property Detail Pages
- Dynamic Property Data
- Responsive Property Cards

---

## 🔍 Search

- Search by Destination
- Search Results Page
- URL-based Search
- Refine Search
- Dynamic Filtering

---

## ❤️ Wishlist

- Add Property to Wishlist
- Remove from Wishlist
- Persistent Favorites
- Dedicated Wishlist Page
- Authentication Protected
- Real-time Wishlist Status

---

## 📅 Booking System

- Select Check-in / Check-out
- Guest Selection
- Automatic Price Calculation
- Booking Confirmation Dialog
- Store Bookings in Database
- View My Bookings
- Cancel Bookings
- Confirmation Dialog

---

## 🎨 User Experience

- Responsive Design
- Sticky Navigation Bar
- Dynamic Search Experience
- Toast Notifications
- Empty States
- Loading States
- Modern Property Cards
- Reusable Dialog Components
- shadcn/ui Components

---

# 🛠 Tech Stack

## Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React

## Backend

- Next.js Route Handlers
- Supabase

## Database

- PostgreSQL
- Supabase Database

## Authentication

- Supabase Auth

## Other Tools

- Sonner
- Git
- GitHub

---

# 📂 Project Structure

```text
app/
│
├── api/
│   ├── bookings/
│   └── wishlist/
│
├── bookings/
├── wishlist/
├── login/
├── signup/
├── properties/
│   └── [id]/
│
components/
│
├── shared/
├── ui/
├── Navbar
├── PropertyCard
├── BookingCard
│
lib/
│
├── db/
├── supabase/
│
types/