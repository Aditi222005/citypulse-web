# CityPulse Backend API

A comprehensive backend API for the CityPulse civic management system built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Citizen, Department Head, Municipal Officer)
  - Email verification
  - Password reset functionality
  - Refresh token support

- **User Management**
  - User registration and login
  - Profile management
  - Role and permission management
  - User activation/deactivation

- **Issue Management**
  - Create, read, update, delete issues
  - Issue categorization and prioritization
  - Location-based issue tracking
  - Issue assignment and resolution
  - Comments and upvoting system
  - Status tracking and history

- **Department Management**
  - Department creation and management
  - Staff assignment
  - Performance tracking
  - Working hours configuration

- **Email Notifications**
  - Email verification
  - Password reset emails
  - Issue assignment notifications
  - Resolution notifications

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Multer (with Cloudinary support)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd citypulse-web/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/citypulse
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   JWT_REFRESH_EXPIRE=30d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@citypulse.com
   
   # Frontend URLs
   ADMIN_FRONTEND_URL=http://localhost:5173
   CITIZEN_FRONTEND_URL=http://localhost:5174
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `POST /api/users` - Create user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/:id/role` - Update user role (Admin only)
- `PUT /api/users/:id/permissions` - Update user permissions (Admin only)

### Issues
- `GET /api/issues` - Get all issues
- `GET /api/issues/:id` - Get issue by ID
- `POST /api/issues` - Create issue
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue
- `PUT /api/issues/:id/assign` - Assign issue
- `PUT /api/issues/:id/resolve` - Resolve issue
- `POST /api/issues/:id/comment` - Add comment
- `POST /api/issues/:id/upvote` - Upvote issue
- `GET /api/issues/statistics` - Get issue statistics
- `GET /api/issues/location` - Get issues by location
- `GET /api/issues/category/:category` - Get issues by category
- `GET /api/issues/status/:status` - Get issues by status

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create department (Admin only)
- `PUT /api/departments/:id` - Update department (Admin only)
- `DELETE /api/departments/:id` - Delete department (Admin only)
- `POST /api/departments/:id/staff` - Add staff (Admin only)
- `DELETE /api/departments/:id/staff/:userId` - Remove staff (Admin only)
- `PUT /api/departments/:id/performance` - Update performance (Admin only)
- `GET /api/departments/statistics` - Get department statistics

## Database Models

### User
- Personal information (name, email, phone, address)
- Authentication (password, tokens)
- Role and permissions
- Preferences and settings
- Department association

### Issue
- Issue details (title, description, category, priority)
- Location information with coordinates
- Status tracking and history
- Assignment and resolution
- Comments and upvotes
- Images and attachments

### Department
- Department information (name, description, code)
- Contact details
- Staff management
- Performance metrics
- Working hours and settings

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **Rate Limiting**: Prevent brute force attacks
- **CORS**: Configured for specific frontend origins
- **Helmet**: Security headers
- **Input Validation**: Express-validator for request validation
- **SQL Injection Protection**: Mongoose ODM protection

## Error Handling

- Global error handling middleware
- Custom error messages
- Validation error responses
- Database error handling
- JWT error handling

## Development

### Project Structure
```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── package.json
├── env.example
└── README.md
```

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run migrate` - Run database migrations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
