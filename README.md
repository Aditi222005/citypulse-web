# CityPulse - Municipal Management System

A comprehensive civic management platform that connects citizens with municipal administration for efficient issue reporting, tracking, and resolution.

## 🏗️ Project Structure

```
citypulse-web/
├── admin/                 # Admin Dashboard (React + Vite)
├── citizen/              # Citizen Portal (React + Vite)
├── backend/              # Backend API (Node.js + Express)
└── README.md
```

## ✨ Features

### 🔐 Authentication System
- **JWT-based authentication** with refresh tokens
- **Role-based access control** (Admin, Citizen, Department Head, Municipal Officer)
- **Email verification** for new accounts
- **Password reset** functionality
- **Secure session management**

### 👥 User Management
- **Multi-role support** with different access levels
- **Profile management** with preferences
- **User activation/deactivation**
- **Permission-based access control**

### 🚨 Issue Management
- **Create, track, and manage** civic issues
- **Location-based issue reporting** with GPS coordinates
- **Image attachments** and detailed descriptions
- **Priority levels** and categorization
- **Status tracking** with history
- **Comments and upvoting** system
- **Assignment to departments** and officers

### 🏢 Department Management
- **Department creation** and management
- **Staff assignment** and role management
- **Performance tracking** and metrics
- **Working hours** configuration
- **Escalation rules** and notifications

### 📧 Communication
- **Email notifications** for various events
- **Issue assignment** notifications
- **Resolution updates** and feedback
- **Email templates** with modern design

## 🛠️ Tech Stack

### Frontend (Admin & Citizen)
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email services
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate limiting** for API protection

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd citypulse-web
   ```

2. **Install dependencies for all projects**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Admin frontend
   cd ../admin
   npm install
   
   # Citizen frontend
   cd ../citizen
   npm install
   ```

3. **Environment Setup**

   **Backend (.env)**
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/citypulse
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   JWT_REFRESH_EXPIRE=30d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@citypulse.com
   ADMIN_FRONTEND_URL=http://localhost:5173
   CITIZEN_FRONTEND_URL=http://localhost:5174
   ```

   **Frontend (.env)**
   ```bash
   # Admin
   cd admin
   cp env.example .env
   
   # Citizen
   cd ../citizen
   cp env.example .env
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the applications**

   **Terminal 1 - Backend**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Admin Frontend**
   ```bash
   cd admin
   npm run dev
   ```

   **Terminal 3 - Citizen Frontend**
   ```bash
   cd citizen
   npm run dev
   ```

6. **Access the applications**
   - **Admin Dashboard**: http://localhost:5173
   - **Citizen Portal**: http://localhost:5174
   - **Backend API**: http://localhost:5000

## 📱 Application Features

### Admin Dashboard
- **Comprehensive dashboard** with metrics and analytics
- **Issue management** with assignment and resolution tracking
- **Department management** with staff oversight
- **User management** with role and permission control
- **Analytics and reporting** with visual charts
- **Settings and configuration** management

### Citizen Portal
- **User-friendly interface** for issue reporting
- **Dashboard** with personal statistics and achievements
- **Issue tracking** with real-time status updates
- **Community features** with upvoting and comments
- **Profile management** with preferences
- **Mobile-responsive design** for accessibility

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password hashing** using bcrypt with salt rounds
- **Rate limiting** to prevent brute force attacks
- **CORS protection** with specific origin allowlist
- **Input validation** and sanitization
- **SQL injection protection** through Mongoose ODM
- **XSS protection** with proper data handling
- **CSRF protection** with secure cookies

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/refresh` - Refresh token

### Issue Management
- `GET /api/issues` - Get all issues
- `GET /api/issues/:id` - Get issue by ID
- `POST /api/issues` - Create issue
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue
- `PUT /api/issues/:id/assign` - Assign issue
- `PUT /api/issues/:id/resolve` - Resolve issue
- `POST /api/issues/:id/comment` - Add comment
- `POST /api/issues/:id/upvote` - Upvote issue

### Department Management
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department
- `POST /api/departments/:id/staff` - Add staff
- `DELETE /api/departments/:id/staff/:userId` - Remove staff

## 🎨 UI/UX Features

- **Modern, responsive design** that works on all devices
- **Dark/light theme** support with user preferences
- **Accessible components** following WCAG guidelines
- **Smooth animations** and transitions
- **Intuitive navigation** with clear visual hierarchy
- **Real-time updates** with optimistic UI
- **Error handling** with user-friendly messages
- **Loading states** and skeleton screens

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or AWS
4. Set up SSL certificates for HTTPS

### Frontend Deployment
1. Build the applications: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Configure environment variables
4. Set up custom domains and SSL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Mobile applications** for iOS and Android
- **Real-time notifications** with WebSocket
- **Advanced analytics** with machine learning
- **Integration** with external municipal systems
- **Multi-language support** for international use
- **API versioning** for backward compatibility
- **Automated testing** with comprehensive test suites
- **Performance monitoring** and optimization

---

**CityPulse** - Connecting Citizens with Municipal Administration for a Better Tomorrow 🌟
