# 🚀 Standardized Node.js Project Template

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, production-ready Node.js template with Express, MongoDB, JWT authentication, and best practices built-in. Perfect for rapidly starting new backend projects with a solid foundation.

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based authentication with role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting and security headers
- CORS protection

### 🏗️ **Architecture**
- Clean MVC architecture
- Modular route organization
- Centralized error handling
- Comprehensive logging with Winston
- Environment-based configuration

### 📊 **Database & Models**
- MongoDB with Mongoose ODM
- User model with authentication methods
- Database connection management
- Schema validation

### 🧪 **Development Tools**
- Pre-configured ESLint and Prettier
- Mocha testing framework setup
- Nodemon for development
- Docker support ready

### 📋 **Templates & Documentation**
- Issue and PR templates
- Contributing guidelines
- Security policy
- Comprehensive documentation

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB 4.4+
- npm or yarn

### Installation

1. **Use this template** by clicking the "Use this template" button above
2. **Clone your new repository**
   ```bash
   git clone https://github.com/yourusername/your-project-name.git
   cd your-project-name
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

6. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
src/
├── config/
│   └── database.js         # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   └── userController.js   # User management
├── middleware/
│   ├── auth.js            # Authentication middleware
│   ├── errorHandler.js    # Error handling
│   └── notFound.js        # 404 handler
├── models/
│   └── User.js            # User schema
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── userRoutes.js      # User management routes
│   └── healthRoutes.js    # Health check routes
├── utils/
│   └── logger.js          # Winston logger
└── server.js              # Application entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### User Management (Admin Only)
- `GET /api/users` - Get all users with pagination
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats` - User statistics

### Health Checks
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed system info
- `GET /api/health/db` - Database connectivity

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nodejs_template

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=24h

# Logging
LOG_LEVEL=info
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🛠️ Development

### Code Quality

```bash
# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format

# Build check
npm run build
```

### Docker Support

```bash
# Build Docker image
npm run docker:build

# Run container
npm run docker:run
```

## 📋 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run build` | Run linting and tests |

## 🔒 Security Features

- **Authentication**: JWT-based with secure token handling
- **Authorization**: Role-based access control
- **Password Security**: bcrypt hashing with salt rounds
- **Input Validation**: express-validator for request validation
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configurable cross-origin resource sharing

## 📊 Monitoring & Logging

- **Winston Logger**: Structured logging with multiple transports
- **Health Checks**: Built-in endpoints for monitoring
- **Error Tracking**: Centralized error handling
- **Request Logging**: Morgan for HTTP request logging

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🔐 Security

Please read [SECURITY.md](SECURITY.md) for details on our security policy and how to report vulnerabilities.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js team for the fantastic framework
- MongoDB team for the robust database
- All contributors to the open-source packages used

## 📞 Support

If you have any questions or need help getting started:

1. Check the [Issues](https://github.com/wasim-s-creator/standardized-project-template/issues) for common problems
2. Create a new issue with the `question` label
3. Review the [Contributing Guidelines](CONTRIBUTING.md)

---

**Happy coding! 🎉**
