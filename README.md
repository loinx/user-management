# User Management System

A comprehensive user management system with a modern React frontend and Spring Boot backend.

## 🚀 Features

### Frontend (user-management-fe)
- ⚛️ React 18 with TypeScript
- 🎨 CoreUI for beautiful, responsive UI components
- 📊 Redux Toolkit for state management
- 🔒 JWT Authentication
- 📝 Form handling with Formik and Yup
- 📱 Responsive design
- 🧪 Comprehensive testing setup with Vitest
- 📈 Code coverage reporting

### Backend (user-management-be)
- 🛡️ Spring Boot 3.2.3
- 🔒 Spring Security with JWT
- 📊 Spring Data JPA
- 🗄️ PostgreSQL with Flyway migrations
- 📝 OpenAPI documentation
- 🧪 Comprehensive testing with JUnit 5
- 📈 Code coverage with JaCoCo
- 🔍 Spring Boot Actuator

## 📋 Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- npm 9 or higher
- PostgreSQL 14 or higher
- Docker and Docker Compose (optional)

## 🛠️ Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-system
```

2. Start the application using Docker Compose:
```bash
docker-compose up -d
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

## 🛠️ Manual Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd user-management-be
```

2. Configure the database in `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/user_management_system
spring.datasource.username=postgres
spring.datasource.password=postgres
```

3. Build and run the backend:
```bash
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd user-management-fe
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=User Management System
```

4. Start the development server:
```bash
npm run dev
```

## 🧪 Testing

### Backend Tests
```bash
cd user-management-be
./mvnw test
./mvnw verify  # with coverage
```

### Frontend Tests
```bash
cd user-management-fe
npm test
npm run test:coverage
```

## 📦 Project Structure

```
user-management-system/
├── user-management-fe/        # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── store/           # Redux store
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   └── cypress/             # E2E tests
│
├── user-management-be/       # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/template/msa/
│   │   │   │       ├── config/     # Configuration
│   │   │   │       ├── controller/ # REST controllers
│   │   │   │       ├── dto/        # Data Transfer Objects
│   │   │   │       ├── model/      # Entity classes
│   │   │   │       ├── repository/ # JPA repositories
│   │   │   │       └── service/    # Business logic
│   │   │   └── resources/
│   │   │       └── db/migration/   # Flyway migrations
│   │   └── test/                   # Test classes
│   └── pom.xml
│
└── docker-compose.yml       # Docker configuration
```

## 🔧 Available Scripts

### Backend
- `./mvnw clean install` - Build the project
- `./mvnw spring-boot:run` - Run the application
- `./mvnw test` - Run tests
- `./mvnw verify` - Run tests with coverage

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint

## 📈 Monitoring

### Backend
- Health: http://localhost:8080/actuator/health
- Metrics: http://localhost:8080/actuator/metrics
- Prometheus: http://localhost:8080/actuator/prometheus

### Frontend
- Development server: http://localhost:3000
- Production build: http://localhost

## 🔒 Security Features

- JWT-based authentication
- Role-based authorization
- Password encryption
- CORS configuration
- Security headers
- Input validation
- SQL injection prevention
- XSS protection

## 📝 API Documentation

OpenAPI documentation is available at:
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [CoreUI](https://coreui.io/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) 