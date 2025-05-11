# Blog Dashboard

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://mohamedel-hossien.github.io/Blog_Dashboard/)

A **Blog Dashboard** application built with React that lets you navigate a modern blog interface using client-side routing, manage state efficiently with Redux Toolkit, and fetch/cache data with React Query. This project is deployed on GitHub Pages and demonstrates how to overcome SPA routing challenges.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)

---

## Features

- **Single Page Application (SPA):** Seamless client-side navigation with React Router.
- **State Management:** Centralized state handled by Redux Toolkit.
- **Data Fetching:** Efficient asynchronous data fetching and caching using React Query.
- **User Authentication & Data Management:** Firebase is used to handle user authentication and to store user data and user posts.
- **Responsive Design:** Clean, responsive UI for optimal user experience.
- **GitHub Pages Deployment:** Custom 404 handling for client-side routing refresh fixes.

---

## Tech Stack

- **React** – A JavaScript library for building user interfaces.
- **React Router** – For client-side routing and navigation.
- **Redux Toolkit** – Simplified state management.
- **React Query** – Async data fetching, caching, and updating.
- **Firebase** – Used for user authentication and storing user data and posts.
- **GitHub Pages** – Hosting the live demo.

---

## Demo

Check out the live demo here: [https://mohamedel-hossien.github.io/Blog_Dashboard/](https://mohamedel-hossien.github.io/Blog_Dashboard/)

---

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MohamedEl-Hossien/Blog_Dashboard.git

2. **Navigate to the project directory:**

   ```bash
   cd Blog_Dashboard

3. **Install the dependencies:**
   
   ```bash  
   npm install

5. **Run the development server:**
   ```bash
   npm run dev
   

## Usage

This project demonstrates how to manage a client-side routed application that:
- Uses React Router for navigation.
- Leverages Redux Toolkit for managing authentication and app-level state.
- Invokes React Query to fetch/cach data asynchronously.

Explore different routes in the dashboard. When refreshing any page, your routing is handled properly (thanks to our GitHub Pages customizations described below).

## **Project Structure** 📁
```
Blog_Dashboard/
├── public/
│   └── blog_icon.svg
├── src/
│   └── assets/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── utils/
│   └── firebase/
│   └── app.jsx
│   └── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
