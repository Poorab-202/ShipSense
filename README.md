# 🛰️ ShipSense – Logistics Management Web App

A full-stack **MERN-based logistics management system** designed to streamline shipment tracking, warehouse operations, and client management with a secure role-based architecture.

🔗 **Live Demo:** [https://shipsense-frontend-vlyy.onrender.com](https://shipsense-frontend-vlyy.onrender.com)

---

## 🚀 Features

* 📦 **Shipment Management:** Add, update, and track packages in real time.
* 🏭 **Warehouse Control:** Manage inventory and view warehouse-level data.
* 👤 **Role-Based Access:** Secure login for Admins, Managers, and Warehouse Staff using JWT authentication.
* 🧭 **Dashboard & Navigation:** Interactive dashboard with sidebar-based routing (Dashboard, Shipments, Settings).
* 🌐 **Client Management:** Separate models for sender and receiver with multiple-package handling.
* 💾 **Backend Integration:** Live RESTful API hosted on Render for data operations.
* 📱 **Responsive Design:** Fully optimized for mobile and desktop screens.

---

## 🧩 Tech Stack

**Frontend:** React.js, React Router DOM, Tailwind CSS
**Backend:** Node.js, Express.js, MongoDB
**Authentication:** JWT + Cookies
**Hosting:** Render (Frontend + Backend)

---

## 📂 Folder Structure

```
ShipSense/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/               # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/shipsense.git
cd shipsense
```

### 2. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the application

```bash
# Start backend
cd server
npm start

# Start frontend
cd ../client
npm run dev
```

