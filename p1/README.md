# 📓 FabNotes – Multi-Tenant SaaS Notes Application  

A production-ready **MERN SaaS Notes App** built for Fab Company assignment.  
Supports **multi-tenant architecture**, **JWT auth**, **role-based access**, and **subscription plans**.  
Deployed on **Vercel** (frontend + backend) with **MongoDB Atlas**.  

---

## 🚀 Features  

- 🔐 **JWT Authentication** (login with Admin/Member roles)  
- 🏢 **Multi-Tenancy**: strict isolation between tenants (`tenantId` filter on every query)  
- 📑 **Notes CRUD**: create, view, update, delete notes  
- 🎭 **Role Enforcement**:  
  - **Admin** → can upgrade tenant plan  
  - **Member** → notes only  
- 📦 **Subscription Gating**:  
  - Free plan → max 3 notes per tenant  
  - Pro plan → unlimited notes (after upgrade endpoint)  
- 🌐 **Frontend (React + Tailwind)**:  
  - Login form  
  - Notes dashboard (CRUD)  
  - Upgrade banner when limit reached  
- 🛠️ **Deployment-Ready**: Vercel (frontend & backend), Atlas DB  

---

## 🏗️ Tech Stack  

- **Frontend**: React, Context API, Tailwind CSS, Vite  
- **Backend**: Node.js, Express, Mongoose, JWT  
- **Database**: MongoDB Atlas  
- **Deployment**: Vercel (frontend & backend), Environment variables  

---

## 📂 Folder Structure  

```
p1/
 ├── backend/              # Node.js + Express API
 │   ├── models/           # User, Tenant, Note schemas
 │   ├── routes/           # auth, notes, tenant
 │   ├── controllers/      # business logic
 │   ├── middleware/       # auth + role checks
 │   ├── utils/            # seeding & helpers
 │   ├── server.js
 │   └── vercel.json
 │
 └── frontend/             # React + Vite + Tailwind
     ├── src/
     │   ├── contexts/     # Auth + Notes Context
     │   ├── pages/        # Login, Dashboard
     │   ├── components/   # NoteCard, UpgradeBanner
     │   ├── utils/        # API helper
     │   └── App.jsx
     └── vite.config.js
```

---

## 🔑 Pre-Seeded Test Accounts  

All accounts use password: **`password`**  

| Tenant | Role   | Email              |  
|--------|--------|--------------------|  
| Acme   | Admin  | `admin@acme.test`  |  
| Acme   | Member | `user@acme.test`   |  
| Globex | Admin  | `admin@globex.test`|  
| Globex | Member | `user@globex.test` |  

---

## ⚙️ Setup & Run Locally  

### Backend  
```bash
cd backend
npm install
```

Add `.env`:
```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run:
```bash
npm run dev
```

---

### Frontend  
```bash
cd frontend
npm install
```

Add `.env`:
```env
VITE_API_BASE=http://localhost:5000/api
```

Run:
```bash
npm run dev
```

---

## 🌍 Deployment  

- **Backend**: hosted on Vercel (serverless with `api/index.js` + `vercel.json`)  
- **Frontend**: hosted on Vercel (React build → `dist/`)  
- **Database**: MongoDB Atlas  

> Update `.env` in both with deployed URLs.  

---

## 📡 API Endpoints  

### Auth  
- `POST /api/auth/login` → Login (returns JWT)  

### Notes (tenant-scoped)  
- `POST /api/notes` → Create note  
- `GET /api/notes` → List all notes  
- `GET /api/notes/:id` → Get single note  
- `PUT /api/notes/:id` → Update note  
- `DELETE /api/notes/:id` → Delete note  

### Tenant  
- `POST /api/tenant/:slug/upgrade` → Upgrade to Pro (Admin only)  

### Health  
- `GET /api/health` → `{ "status": "ok" }`  

---

## 🧪 Automated Test Coverage  

Recruiter tests will check:  
✔️ Health endpoint live  
✔️ Login works with all 4 seeded accounts  
✔️ Tenant isolation enforced  
✔️ Role-based restrictions enforced  
✔️ Free plan → max 3 notes  
✔️ Upgrade → unlimited notes  
✔️ CRUD works correctly  
✔️ Frontend accessible  

---

## 📄 Multi-Tenancy Approach  

We use **Shared Schema with `tenantId` field**:  
- Each `User` and `Note` has a `tenantId`.  
- Every query is filtered by `tenantId`, ensuring **strict isolation**.  

✅ This balances simplicity + scalability, and works best for SaaS MVPs.  

---

## 🏆 Why This Project Is Recruiter-Ready  

- Clean **backend & frontend separation**  
- Proper **role-based auth + JWT**  
- **Multi-tenant design** documented  
- **Professional folder structure**  
- **Deployment-ready** (Vercel + Atlas)  
- Fully satisfies assignment requirements  

---

✨ **Live Demo Links (update after deploy):**  
- Frontend: https://fabnotes.vercel.app  
- Backend API: https://fabnotes-api.vercel.app/api  
- Health Check: https://fabnotes-api.vercel.app/api/health  
