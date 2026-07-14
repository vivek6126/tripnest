# TripNest ✈️

TripNest is a modern full-stack hotel booking platform inspired by Airbnb and Booking.com.

Users can discover destinations, browse beautiful properties, save favorites, book stays, leave reviews, personalize their profile, and manage their trips through a fast, responsive interface powered by Next.js and Supabase.

---

# 🚀 Features

## 🔐 Authentication

* User Signup & Login
* Secure Logout
* Supabase Authentication
* Server-side Session Handling
* Protected Routes
* Protected API Routes
* Persistent Login Sessions

---

## 👤 User Profiles

* Automatic Profile Creation
* Edit Profile Information
* Full Name Support
* Reviewer Identity
* Profile Page
* Profile API
* Server-side Profile Fetching

---

## 🏡 Property Browsing

* Browse Featured Properties
* Property Categories
* Beach Stays
* Mountain Retreats
* Luxury Escapes
* Dynamic Property Pages
* Responsive Property Cards
* Property Details
* Amenities
* Guest Capacity
* Bedrooms & Bathrooms
* Dynamic Ratings

---

## 🔍 Search & Filtering

* Search by Destination
* URL-based Search
* Dynamic Search Results
* Refine Search
* Filter by:

  * Destination
  * Price
  * Bedrooms
  * Minimum Rating

---

## ❤️ Wishlist

* Add Properties to Wishlist
* Remove from Wishlist
* Persistent Favorites
* Wishlist Page
* Wishlist Counter in Navbar
* Authentication Protected
* Real-time Wishlist Status

---

## 📅 Booking System

* Select Check-in & Check-out
* Guest Selection
* Automatic Night Calculation
* Live Price Calculation
* Booking Confirmation Dialog
* Store Bookings in Database
* View My Bookings
* Cancel Bookings
* Confirmation Dialog
* Protected Booking Actions

---

## ⭐ Reviews & Ratings

* Leave Property Reviews
* Rate Properties (1–5 Stars)
* Dynamic Average Rating
* Review Count
* Property Reviews Section
* Reviewer Profile Names
* Duplicate Review Prevention
* Review Validation

---

## 🎨 User Experience

* Fully Responsive Design
* Sticky Navigation Bar
* Active Navigation Highlight
* Modern Airbnb-inspired UI
* Toast Notifications
* Empty States
* Loading States
* Reusable Components
* Shared Dialog Components
* shadcn/ui Components
* Beautiful Property Cards
* Booking Sidebar
* Smooth Hover Animations

---

# 🛠 Tech Stack

## Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS v4
* shadcn/ui
* Lucide React

## Backend

* Next.js Route Handlers
* Supabase

## Database

* PostgreSQL
* Supabase Database

## Authentication

* Supabase Auth
* Supabase SSR

## Libraries

* Sonner
* Lucide React

## Development Tools

* Git
* GitHub
* ESLint
* Prettier

---

# 📂 Project Structure

```text
app/
│
├── api/
│   ├── bookings/
│   ├── profile/
│   ├── reviews/
│   └── wishlist/
│
├── bookings/
├── profile/
├── wishlist/
├── login/
├── signup/
├── properties/
│   └── [id]/
│
components/
│
├── auth/
├── bookings/
├── profile/
├── reviews/
├── shared/
├── ui/
│
lib/
│
├── db/
├── supabase/
│
types/
```

---

# 🗄 Database Schema

## Properties

Stores property information.

## Profiles

Stores user profile information.

## Bookings

Stores reservations.

## Wishlists

Stores saved properties.

## Reviews

Stores user ratings and reviews.

---

# 🔗 Relationships

* One User → One Profile

* One User → Many Bookings

* One User → Many Reviews

* One User → Many Wishlist Items

* One Property → Many Bookings

* One Property → Many Reviews

* One Property → Many Wishlist Entries

---

# 📚 Concepts Practiced

* Next.js App Router
* Server Components
* Client Components
* Route Handlers
* Authentication
* Authorization
* CRUD Operations
* Database Relationships
* PostgreSQL
* Row Level Security (RLS)
* TypeScript
* Component Architecture
* Reusable UI Design
* Responsive Design
* Supabase SSR

---

# ✅ Completed Features

* Authentication
* User Profiles
* Property Browsing
* Property Details
* Search & Filters
* Wishlist System
* Booking System
* Booking Management
* Booking Cancellation
* Reviews & Ratings
* Responsive Navigation
* Protected Routes
* Reusable UI Components

---

# 🚧 Roadmap

## 🔜 Next Features

* Edit/Delete Reviews
* User Avatars
* Property Availability Calendar
* Prevent Double Booking
* Admin Dashboard
* Image Gallery
* Property Host Profiles
* Booking History Filters
* Email Notifications
* Deployment (Vercel)

---

# 📸 Screenshots

> Screenshots and demo GIFs will be added after deployment.

---

# 👨‍💻 Author

Built with ❤️ by **Vivek Dodiya**

B.Tech ICT • DA-IICT
