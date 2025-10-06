# 🏥 Healthcare Claim Validation System

An AI-powered **form validation and claim processing system** built using **Vite, React, and TypeScript**.  
This web app provides a fast, modular, and scalable frontend interface for validating healthcare claims using OCR and intelligent rule checks.

---

## 📋 Table of Contents

1. [Overview](#-overview)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Folder Structure](#-folder-structure)  
5. [Getting Started](#-getting-started)  
6. [Available Scripts](#-available-scripts)  
7. [Development Guidelines](#-development-guidelines)  
8. [Deployment](#-deployment)  
9. [License](#-license)

---

## 🔍 Overview

The **Healthcare Claim Validation App** provides an interface for reviewing, verifying, and correcting data extracted from claim forms such as **CMS-1500** and **UB-04**.  
It is designed for seamless integration with a backend OCR + AI model that automatically identifies data anomalies and validation errors.

This frontend enables:
- Uploading and visualizing scanned claim forms  
- Displaying extracted fields with validation status  
- Reviewing, editing, and confirming claim details  
- Visual reports using charts for claim statistics  

---

## ⚙️ Features

✅ Fast Vite-based React setup with TypeScript  
✅ Modular folder organization  
✅ TailwindCSS for responsive and modern UI  
✅ Dynamic charts using **Recharts**  
✅ Icons from **Lucide React**  
✅ Routing handled via **React Router DOM**  
✅ ESLint + TypeScript for clean and maintainable code  

---

## 🧰 Tech Stack

| Category        | Technology / Tool        |
|-----------------|--------------------------|
| **Frontend**    | React 18 (TypeScript)    |
| **Bundler**     | Vite                     |
| **Styling**     | Tailwind CSS + PostCSS   |
| **Charts**      | Recharts                 |
| **Icons**       | Lucide React             |
| **Routing**     | React Router DOM v7      |
| **Linting**     | ESLint + TypeScript ESLint |
| **Build Tool**  | Vite                     |

---

## 🗂 Folder Structure

ai-form-validation/
├── public/ # Static assets (favicons, images)
├── src/
│ ├── assets/ # Local images and icons
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-level pages
│ ├── routes/ # Router configurations
│ ├── data/ # Mock or sample JSON data
│ ├── styles/ # Tailwind or global CSS
│ ├── main.tsx # Entry point
│ └── App.tsx # Root React component
├── .eslintrc.cjs # ESLint configuration
├── tailwind.config.js # Tailwind setup
├── postcss.config.js # PostCSS setup
├── tsconfig.json # TypeScript configuration
├── package.json
└── index.html

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/nehardh/ai-form-validation.git
cd ai-form-validation

```
### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Access the app at http://localhost:5173

---

## 🧩 Available Scripts
Command	Description
npm run dev	Runs the app in development mode using Vite
npm run build	Builds the app for production
npm run preview	Serves the production build locally
npm run lint	Runs ESLint for code quality checks

---

## 🧱 Development Guidelines

 - Component Design: Use functional components with TypeScript props.
 - Styling: Use Tailwind classes; avoid inline CSS.
 - Data Flow: Use React hooks (useState, useEffect, etc.) for local state.
 - Routing: Add pages to /pages and define routes in /routes.
 - Validation Logic: Integrate API calls to backend (Flask/FastAPI) for claim validation.
 - Charts: Use Recharts for visual data insights (bar, pie, line charts).

---
