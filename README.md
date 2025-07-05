# 📚 Beacon Library a minimal Library Management System

A complete web-based **Library Management System** built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, and **Tailwind** with **Shadcn/ui**. The system interacts with a **MongoDB + Express backend API** to handle books and borrowing logic efficiently.

> ✅ [Live Frontend App](https://library-management-app-two-sepia.vercel.app)  
> 🔗 [Live Backend API](https://assignment-4-backend-ten.vercel.app)

---


## 📦 Setup Instructions

```bash
# 1. Clone the frontend repo
git clone https://github.com/BakiAbdullah/Library-management-Redux-RTK

Github Frontend: 

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev 
```

## 📦 Tech Stack

### 🖥️ Frontend
- **React + Vite**
- **Redux Toolkit + RTK Query**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components

### 🛠️ Backend
- **Express.js**
- **MongoDB (Mongoose)**
- **RESTful APIs**
- **Aggregation Pipelines**
- Hosted on Vercel

---

## 🧾 Project Objective

The goal of this project is to develop a **minimal, yet functional** library system focused on core functionality. It allows users to:
- View all books
- Perform CRUD operations on books
- Borrow books with proper validations
- View borrow summary with aggregation

No authentication or payment integration is included, as the focus is on CRUD, UI/UX, and client-side logic.

---

## 🔗 Live Links

| Component | Link |
|----------|------|
| 🔵 Frontend | [https://library-management-app-two-sepia.vercel.app/](https://library-management-app-two-sepia.vercel.app) |
| 🟢 Backend | [https://assignment-4-backend-ten.vercel.app/](https://assignment-4-backend-ten.vercel.app) |

---

## 📚 Key Features

### 🆓 Public Access
- No login system
- All pages accessible without authentication

---

### 📘 Book Management

- View all books in a **table/grid** layout
- Searchable and filterable by default table
- Key columns:
  - Title
  - Author
  - Genre
  - ISBN
  - Copies
  - Availability
  - Actions

#### 🔄 Actions:

| Action | Description |
|--------|-------------|
| 🖊️ Edit | Opens a modal with current book details. On save, updates via API. |
| 🗑️ Delete | Confirmation modal. On confirm, deletes book from DB and UI. |
| 📖 Borrow | Opens borrow form modal to borrow book. |
| ➕ Add | Create new book with title, author, genre, ISBN, description, and copies. |

##### 📌 Business Logic:
- If `copies = 0`, book is marked as `unavailable`.
- Real-time UI update on successful mutation.

---

### 📖 Borrow Book Feature

- Borrow form opens via modal from book card or list.
- Inputs:
  - **Quantity** (must be ≤ available copies)
  - **Due Date** (calendar picker)
- After submission:
  - Updates the available copies in DB
  - If `copies = 0`, marks book unavailable
  - Redirects to `/borrow-summary` page with toast message

---

### 📊 Borrow Summary (Aggregation Feature)

Displays an **aggregated view** of all borrowed books. Data is fetched using backend aggregation pipelines.

#### 🧾 Columns:
- Book Title
- ISBN
- **Total Quantity Borrowed** (summed)

---

## 🧭 Routes & Navigation

| Route | Description |
|-------|-------------|
| `/` | Landing page with welcome banner and featured books |
| `/all-books` | All books displayed in a table or grid layout |
| `/create-book` | Create book form |
| `/edit-book/:id` | Edit form populated with book data |
| `/borrow/:id` *(modal)* | Borrow form modal per book |
| `/borrow-summary` | Table showing borrow summary using aggregation |
| `*` | 404 Not Found fallback |

---


