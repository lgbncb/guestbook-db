# 🚀 Guestbook Database Project

A full-stack, real-time guestbook application featuring a custom neon-terminal aesthetic. This project demonstrates a secure, three-tier architecture connecting a React frontend to a NestJS API and a Supabase PostgreSQL database.

## 👤 Developer Profile
* **Developer:** Lance Gabriel Mojar Buncab (Gab)
* **Education:** 2nd Year BS Computer Science, Asia Pacific College
* **Specialization:** Cybersecurity and Forensics

---

## 🛠️ Tech Stack
* **Frontend:** React (Vite) + Axios for API communication
* **Backend:** NestJS (TypeScript) deployed on Vercel
* **Database:** Supabase (PostgreSQL)
* **Styling:** Custom CSS Component with Neon-Glow borders

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

## 🔧 Getting Started

### **1. Clone the Repo**
```bash
git clone [https://github.com/lgbncb/guestbook-db.git](https://github.com/lgbncb/guestbook-db.git)
cd guestbook-db
