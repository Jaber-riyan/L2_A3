# 📚 Library Management API

A RESTful Library Management System built using **Express**, **TypeScript**, **MongoDB (Mongoose)**, and **Zod** for validation.  
This project allows managing books and borrowing records with proper schema validation, business logic, and MongoDB aggregation.

---

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) operations for books
- ✅ Borrow books with inventory check
- ✅ Automatic availability status based on remaining copies
- ✅ Aggregation pipeline to get borrowed book summary
- ✅ Schema & request validation using **Mongoose** and **Zod**
- ✅ Filtering, sorting, and pagination support for book listings
- ✅ Proper error handling and response formatting

---

## 🧩 Technologies Used

- **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Zod** for request validation
- **ts-node-dev** for development
- **dotenv** for environment variables

---

## 📦 Installation & Setup

### 🛠 Prerequisites

- Node.js (v18+ recommended)
- MongoDB URI (e.g., from MongoDB Atlas or local)

---

### 🔧 Steps

```bash
# Clone the repository
git clone https://github.com/Jaber-riyan/L2_A3.git
cd L2_A3

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env to set your MONGODB_URI and PORT

# Run in development
npm run dev

# Build for production
npm run build
npm start
```

src/
├── controllers/ # Route logic (Books, Borrow)
├── interfaces/ # TypeScript interfaces
├── models/ # Mongoose schemas (Book, Borrow)
├── zodSchema/ # Zod validation schemas
├── app.ts # Express app setup
├── server.ts # Server entry point

## 📘 API Endpoints

### ✅ Books

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/books`         | Create a new book            |
| GET    | `/api/books`         | Get all books (filter, sort) |
| GET    | `/api/books/:bookId` | Get book by ID               |
| PUT    | `/api/books/:bookId` | Update a book                |
| DELETE | `/api/books/:bookId` | Delete a book                |

### ✅ Borrow

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| POST   | `/api/borrow` | Borrow a book                 |
| GET    | `/api/borrow` | Get summary of borrowed books |

```json
POST /api/borrow
Content-Type: application/json

{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```

## 📊 Aggregation Example: Borrowed Summary

```json
GET /api/borrow

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Hobbit",
        "isbn": "9780547928227"
      },
      "totalQuantity": 5
    }
  ]
}

```
## ✅ Validation Examples (Zod + Mongoose)

- Book Genre must be one of:
    - FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
- Copies must be ≥ 0
- ISBN must be unique
- Due Date must be a valid future date

## 🧑‍💻 Author
Jaber Ahmed Riyan

## 📄 License
This project is open-source and free to use.



