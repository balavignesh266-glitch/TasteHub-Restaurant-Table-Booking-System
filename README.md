# TasteHub – Restaurant Table Booking System

An elegant, fully responsive **Restaurant Table Booking System** website built using pure **HTML5, CSS3, and Vanilla JavaScript**, with browser-level data persistence powered by `localStorage`.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/balavignesh266-glitch/TasteHub-Restaurant-Table-Booking-System)
[![Live Demo](https://img.shields.io/badge/Live-Demo_on_GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://balavignesh266-glitch.github.io/TasteHub-Restaurant-Table-Booking-System/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🌐 Live Website

Access the live site on GitHub Pages:  
👉 **[https://balavignesh266-glitch.github.io/TasteHub-Restaurant-Table-Booking-System/](https://balavignesh266-glitch.github.io/TasteHub-Restaurant-Table-Booking-System/)**

---

## 🍽️ Key Features

- **Home Page (`index.html`)**:
  - Hero section with TasteHub branding and call-to-action buttons.
  - Restaurant opening hours card with live status indicator.
  - Popular dishes showcase.
  - Chef craftsmanship & restaurant philosophy story.
- **Restaurant Menu (`menu.html`)**:
  - 6 full categories: *Starters, Main Course, Biryanis, Vegetarian, Desserts, Beverages*.
  - Real-time category filtering pills.
  - Instant search input matching dish names and ingredients.
  - Dietary indicators (Vegetarian / Non-Vegetarian).
- **Interactive Table Booking (`booking.html`)**:
  - **Visual Floor Map**: 12 tables with seating for 2, 4, 6, and 8 guests.
  - **Live Table States**: *Available* (green), *Selected* (gold), and *Booked* (red).
  - Dynamic slot conflict check (tables already reserved for chosen date/time are disabled).
  - Form validation (blocks past dates, validates email/phone, capacity matching).
  - Unique booking ID generation (e.g. `TH-74921`).
  - **Printable Confirmation Card**: Includes a *Print Booking* button formatted for voucher receipts via `window.print()`.
- **My Bookings (`bookings.html`)**:
  - Displays all saved customer reservations from `localStorage`.
  - Filter by status (*All, Confirmed, Cancelled*) and live search.
  - **Cancel Booking**: Updates status to *Cancelled* and releases the table immediately for other customers.
  - **Delete Booking**: Permanently deletes record.
- **Contact Us (`contact.html`)**:
  - Location address, direct reservation phone numbers, and operational hours.
  - Mock interactive map.
  - Validated contact inquiry form with toast feedback.

---

## 📂 Project Structure

```text
restaurant-booking/
│
├── index.html         # Landing page
├── menu.html          # Menu & category filter
├── booking.html       # Visual floor plan & reservation form
├── bookings.html      # Saved bookings management
├── contact.html       # Contact details & inquiry form
│
├── css/
│   └── style.css      # Luxury dark & gold styling, print layout
│
├── js/
│   └── script.js      # Availability engine, localStorage CRUD, validations
│
└── images/
    └── logo.svg       # Brand vector emblem
```

---

## 🚀 How to Run Locally

No server or database installation is required!
1. Clone or download this repository.
2. Open **`index.html`** in any web browser.
3. All reservations will be saved in your browser's `localStorage`.
