# 🚀 React Authentication System (OTP + JWT + Profile Update)

A complete authentication system built with **React**, **Context API**, and **Axios**, supporting:

- ✅ User Registration  
- ✅ Email OTP Verification  
- ✅ Login with JWT  
- ✅ Auto-Login using stored token  
- ✅ Reset Password via OTP  
- ✅ Update Profile (Change Name)  
- ✅ Logout  
- ✅ Protected Routes  
- ✅ Axios Interceptors + Token Handling  

**Backend Used:**  
`https://chaintech-intern-project-backend.onrender.com`  
(You can replace this inside `src/lib/api.js`)

---

## 📂 Project Structure

src/
├── context/
│ └── AuthContext.jsx # Authentication state, OTP, token, user
│
├── lib/
│ └── api.js # Axios instance + token interceptor
│
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Profile.jsx
│ ├── ResetPassword.jsx
│ └── VerifyOTP.jsx # OTP input component
│
├── App.jsx # Routes
└── main.jsx # App entry


---

## 🔧 Features

### 🔐 Authentication
- JWT-based login  
- Token saved in `localStorage`  
- Axios interceptor automatically attaches token  
- Auto-login if token exists  

### ✉️ OTP Support
- OTP sent during:
  - Registration  
  - Password Reset  
- Resend OTP option  
- Smart OTP input fields:
  - Arrow key navigation  
  - Auto-focus  
  - Backspace handling  
  - Paste full OTP support  

### 👤 Profile Page
- Protected route (redirects if not logged in)  
- Change user name  
- Logout clears token and user state  

### 🔄 Reset Password
1. Submit your email  
2. Receive OTP  
3. Enter OTP + new password  
4. Reset password  

---

## 🔗 API Endpoints Used

| Purpose                  | Method | Endpoint                             |
|--------------------------|--------|---------------------------------------|
| Register + send OTP      | POST   | `/api/auth/register`                  |
| Verify OTP               | POST   | `/api/auth/verify-otp`                |
| Login                    | POST   | `/api/auth/login`                     |
| Get Profile              | GET    | `/api/profile`                        |
| Update Profile           | PUT    | `/api/auth/profile`                   |
| Request Password Reset   | POST   | `/api/auth/request-password-reset`    |
| Reset Password           | POST   | `/api/auth/reset-password`            |
| Resend OTP               | POST   | `/api/auth/resend-otp`                |


## ⚙️ Installation

### 1️⃣ Clone the repository


2️⃣Install dependencies
npm install

3️⃣ Start development server
npm run dev

## 🧠 Auth Flow

### 🔹 Registration Flow
- User enters name, email, password  
- Backend sends OTP  
- User enters OTP  
- OTP is verified → account created  
- Redirect to Login  

### 🔹 Login Flow
- User enters credentials  
- Backend returns token + user data  
- Token saved to `localStorage`  
- User auto-logged-in on refresh  

### 🔹 Profile Page
- Loaded from `AuthContext`  
- User can update name  
- Logout clears session  

### 🔹 Reset Password Flow
- User submits email  
- OTP sent  
- User enters OTP + new password  
- Password updated  
- Redirect to Login  

---

## 🖥️ Tech Stack
- React (Vite)  
- Context API  
- React Router  
- Axios  
- TailwindCSS  
- JWT Authentication  
- OTP Email Verification  

