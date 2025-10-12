Enterprise Backend (Express + Mongoose) generated.
- API key required on all routes: send header 'x-api-key: enterprisemediumtoken12345'
- Auth flow requires API key header + OTP verification. After verify, use returned JWT in Authorization: Bearer <token>
- Roles: customer, admin, superadmin
  - customer: create orders, view own orders/payments, manage own profile
  - admin: manage products, view all orders/payments, manage users (not delete)
  - superadmin: full access including deleting users/payments and creating other admins

Important endpoints:
- POST /api/auth/register  (requires x-api-key) -> {name,email,password,role} (role allowed only if x-creator-role=superadmin)
- POST /api/auth/verify-otp (requires x-api-key) -> {email, otp} returns JWT
- POST /api/auth/login (requires x-api-key) -> {email,password} returns JWT
- All other routes require x-api-key header AND Authorization: Bearer <JWT>

Start:
1. cd backend_enterprise
2. npm install
3. npm run dev or npm start
