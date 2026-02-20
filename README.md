# 🚀 Guestbook Database Project

A full-stack, real-time guestbook application featuring a custom neon-terminal aesthetic. This project demonstrates a secure, three-tier architecture connecting a React frontend to a NestJS API and a Supabase PostgreSQL database.

## 👤 Developer Profile
* **Developer:** Lance Gabriel Mojar Buncab (Gab)
* **Education:** 2nd Year BS Computer Science, Asia Pacific College
* **Specialization:** Cybersecurity and Forensics

---
## 📂 Project Structure
```
guestbook-db/
├── README.md                       # This file (project documentation)
├── client/                         # React + Vite Frontend
│   ├── src/
│   │   ├── App.jsx             # Guestbook UI component
│   │   └── App.css             # Styling
│   └── .env                    # Frontend environment variables
├── server/                         # NestJS Backend
│   ├── src/
│   │   ├── app.module.ts       # Main NestJS module
│   │   ├── main.ts             # NestJS entry point
│   │   ├── guestbook/
│   │   │   ├── guestbook.controller.ts  # REST API logic
│   │   │   └── guestbook.service.ts     # Supabase CRUD logic
│   └── .env                    # Backend environment variables
├── vercel.json                 # Vercel deployment configuration
└── package.json                # Root build scripts
```
---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React + Vite |
| **Backend** | NestJS |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel (Frontend & Backend) | Custom CSS Component with Neon-Glow borders

---
## 📡 CRUD Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** |	/guestbook | Fetches all messages from the Supabase database. |
| **POST** | /guestbook | Creates a new guestbook entry and stores it in the database. |
| **PUT** | /guestbook/:id | Updates an existing message based on its unique ID. |
| **DELETE** | /guestbook/:id | Permanently removes a message from the database. |

_**Note: PUT and DELETE endpoints are implemented in the backend but not exposed in the current minimal frontend UI.**_

---
**🔧 How to Run Locally**

**🔴 STEP 1: Clone the Repository**

git clone https://github.com/lgbncb/guestbook-db.git  
cd guestbook-db

**🟠STEP 2: Install dependencies**

cd server && npm install  
cd ../client && npm install

**🟢Step 3: Start the backend (NestJS)**

cd server  
npm run start:dev


Backend runs on http://localhost:3000

---

## 🏗️ System Architecture
The application is built on a robust pipeline to ensure data integrity and real-time updates:

1. **Client Tier:** A React interface that handles local state management and user input validation.
2. **Logic Tier:** A NestJS REST API that manages CORS, environment variables, and database queries.
3. **Data Tier:** A Supabase instance managing a PostgreSQL table with automated timestamps and UUID generation.

---

## ⚡ Key Features
* **Persistent Messaging:** Messages are saved securely in the cloud and persist through page refreshes.
* **Cache-Busting Technology:** Implemented a unique timestamp-based fetching strategy to ensure real-time data delivery.
* **Security Focused:** Configured specific CORS headers to prevent unauthorized cross-origin resource sharing.
* **Cybersecurity Aesthetic:** Designed with a "hacker-terminal" theme, reflecting my specialization in Forensics.

---
## ☁️ Deployment Guide (Vercel)

**1. Backend Deployment**  
* **Root Directory:** `server`  

* **Build Command:** `npm run build`  

* **Output Directory:** `dist`  

* **Environment Variables:** Add `SUPABASE_URL` and `SUPABASE_KEY` in Vercel settings.  

**2. Frontend Deployment**  
* **Root Directory:** `client` 

* **Build Command:** `npm run build`  

* **Output Directory:** `dist`  

* **Environment Variables**: Add `VITE_API_URL` pointing to your deployed backend.  

---

## 🔍 Troubleshooting

* Error: 🚨 `DATA PIPELINE ERROR`: Occurs if the backend sends a non-array response (like a 404 HTML page). Fix by ensuring the SUPABASE_URL in Vercel environment variables is correct and matches the project URL.

* Error: `404: NOT_FOUND`: Vercel cannot find the entry file. Fix by ensuring the Root Directory is correctly set to `server` or `client` in Vercel settings and that vercel.json has the correct rewrites.

* Messages disappear on refresh: Caused by aggressive browser caching. Fix by adding a unique timestamp query parameter to the fetch URL: `?t=${new Date().getTime()}`.

