# Airbnb Clone

A full-stack web application inspired by Airbnb, allowing users to browse, book, and host property listings.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Seeding the Database](#seeding-the-database)
- [Environment Variables](#environment-variables)
- [License](#license)

## Project Overview

This project is a clone of Airbnb, built for educational purposes. It includes user authentication, property listings, booking, reviews, and payment simulation.

## Features

- User authentication (signup, login)
- Host can create and manage listings
- Guests can browse, book, and review listings
- Payment simulation for bookings
- Responsive UI

## Tech Stack

- **Frontend:** React, React Router, CSS
- **Backend:** Node.js, Express, Sequelize, SQLite (or your DB)
- **Other:** JWT, bcrypt, Vite

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/psong1/airbnb-clone.git
   cd airbnb-clone
   ```
2. **Install dependencies:**
   - Root (for Concurrently):
     ```bash
     npm install
     ```
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd ../client
     npm install
     ```
3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory with:
     ```env
     JWT_SECRET=your_jwt_secret
     ```
4. **Seed the database:**
   ```bash
   cd server
   node seed/index.js
   ```
5. **Start the servers:**
   - Root:
     ```bash
     npm start
     ```

## Usage

- Visit `http://localhost:5173` to use the app.
- Sign up as a new user, browse listings, book stays, and leave reviews.
- Hosts can add new listings from the dashboard.

## Project Structure

```
airbnb-clone/
  client/      # React frontend
  server/      # Express backend
  README.md
```

## Seeding the Database

- The seed script populates the database with sample users, listings, bookings, reviews, and images.
- To reseed, run:
  ```bash
  cd server
  node seed/index.js
  ```

## Environment Variables

- `JWT_SECRET`: Secret key for JWT authentication (set in `server/.env`).

## License

This project is for educational purposes only.
