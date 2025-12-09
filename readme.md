# 📚 Library Management System — Full Stack Assignment

**Built with ASP.NET Core Web API + SQLite + React + TypeScript**

## 🔍 Overview

This project is a simple Library Management System designed to manage books efficiently. It supports full CRUD operations (Create, Read, Update, Delete) and features JWT-based authentication with role-based authorization to secure the application.

**Users can:**
* Login / Register as an **Admin**
* Add new books to the library
* View a comprehensive list of books
* Edit existing book details
* Delete books from the system

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | ASP.NET Core Web API (.NET 10), Entity Framework Core, SQLite |
| **Frontend** | React + TypeScript + Vite |
| **Authentication** | JWT Token (Bearer) |
| **Tooling** | CORS, Axios, Tailwind CSS |

---

## 📌 Features Implemented

### Backend
* ✅ **RESTful API:** Endpoints for CRUD operations on Books.
* ✅ **Database:** SQLite implemented using Entity Framework Core.
* ✅ **Security:** JWT Authentication (Login/Register) & SHA256 Password hashing.
* ✅ **Authorization:** Role-based access control (`[Authorize(Roles = "Admin")]`).
* ✅ **Documentation:** Integrated Swagger UI.
* ✅ **Robustness:** Global error handling & data validation.

### Frontend
* ✅ **UI/UX:** Fully functional, responsive UI using Tailwind CSS.
* ✅ **Auth Flow:** Login/Register forms with token storage (`localStorage`).
* ✅ **Interactivity:** Modal forms for Adding/Editing books.
* ✅ **Search:** Real-time search functionality for books.
* ✅ **API Integration:** Centralized Axios instance with token interceptors.

---

## 📦 Project Structure

```text
📁 Library Management System
 ├── 📁 backend
 │   ├── Controllers/
 │   ├── Data/
 │   ├── Models/
 │   ├── appsettings.json
 │   └── Program.cs
 └── 📁 frontend
     ├── src/
     │   ├── pages/
     │   ├── services/
     │   ├── types/
     │   ├── components/
     │   └── App.tsx
     └── index.html

```
## 🚀 How to Run the Project Locally

### 🔹 Prerequisites
* .NET SDK (8 or 10)
* Node.js + npm (Latest LTS recommended)
* Visual Studio or VS Code

### ▶ Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend/LibraryApi
    ```

2.  **Restore dependencies:**
    ```bash
    dotnet restore
    ```

3.  **Apply database migrations:**
    This will create the SQLite database file.
    ```bash
    dotnet ef database update
    ```

4.  **Run the API:**
    ```bash
    dotnet run
    ```
    *The server will typically start at `https://localhost:7114` (Check your console output).*

    **🔗 Useful Links:**
    * **Swagger UI:** `https://localhost:7114/swagger`
    * **API Endpoint:** `https://localhost:7114/api/Book`

### ▶ Frontend Setup

1.  **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file inside the `/frontend` root directory and add the following:
    ```env
    VITE_BASE_URL=https://localhost:7114/api
    ```

4.  **Start the React app:**
    ```bash
    npm run dev
    ```
    *The app will run at `http://localhost:5173`.*

---

## 🔐 Authentication Guide

1.  **Register:** New admins can register via the Login page.
2.  **Storage:** Upon login, the JWT token is stored in the browser's `localStorage`.
3.  **Requests:** All subsequent API requests include the token in the header automatically:
    ```http
    Authorization: Bearer <JWT_TOKEN>
    ```
4.  **Protection:** Endpoints in the `BookController` are protected and require a valid token.

---

## 🧪 Testing

You can test the API endpoints using **Swagger UI**, **Postman**, or **Thunder Client**.

**Example JSON Body (Add Book):**
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "description": "Habits that change your life",
  "units": 10
}