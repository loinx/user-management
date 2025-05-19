# User Management Backend

A Spring Boot-based user management system with comprehensive security, testing, and monitoring features.

## 🚀 Features

- 🛡️ Spring Boot 3.2.3
- 🔒 Spring Security with JWT
- 📊 Spring Data JPA
- 🗄️ PostgreSQL with Flyway migrations
- 📝 OpenAPI documentation
- 🧪 Comprehensive testing with JUnit 5
- 📈 Code coverage with JaCoCo
- 🔍 Spring Boot Actuator
- 📝 Lombok for reduced boilerplate
- 🔄 CI/CD integration

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.8 or higher
- PostgreSQL 14 or higher
- Docker (optional)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd microservice-template
```

2. Configure the database in `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/microservice
spring.datasource.username=postgres
spring.datasource.password=postgres
```

3. Build the project:
```bash
mvn clean install
```

## 🚀 Development

Run the application:
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080`.

## 🧪 Testing

### Running Tests

```bash
# Run all tests
mvn test

# Run tests with coverage
mvn clean verify
```

### Test Coverage

The project maintains a minimum code coverage of 80% for:
- Lines
- Branches
- Methods
- Classes

Coverage reports are generated in `target/site/jacoco` and can be viewed by opening `target/site/jacoco/index.html` in a browser.

## 📦 Building for Production

```bash
mvn clean package
```

The JAR file will be created in the `target` directory.

## 🐳 Docker Support

Build the Docker image:
```bash
docker build -t microservice-template .
```

Run the container:
```bash
docker run -p 8080:8080 microservice-template
```

## 📁 Project Structure

```
microservice-template/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/template/msa/
│   │   │       ├── config/        # Configuration classes
│   │   │       ├── controller/    # REST controllers
│   │   │       ├── dto/           # Data Transfer Objects
│   │   │       ├── exception/     # Custom exceptions
│   │   │       ├── model/         # Entity classes
│   │   │       ├── repository/    # JPA repositories
│   │   │       ├── security/      # Security configuration
│   │   │       └── service/       # Business logic
│   │   └── resources/
│   │       ├── db/migration/      # Flyway migrations
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/template/msa/
│               ├── controller/     # Controller tests
│               ├── service/        # Service tests
│               └── integration/    # Integration tests
└── pom.xml
```

## 🔧 Available Scripts

- `mvn clean install` - Build the project
- `mvn spring-boot:run` - Run the application
- `mvn test` - Run tests
- `mvn verify` - Run tests with coverage
- `mvn clean package` - Create production build

## 📈 Code Coverage

The project uses JaCoCo for code coverage reporting. Coverage reports are generated automatically when running `mvn verify`. The coverage configuration can be found in `pom.xml`.

## 🔒 Security Features

- JWT-based authentication
- Role-based authorization
- Password encryption
- CORS configuration
- Security headers
- Input validation
- SQL injection prevention
- XSS protection

## 📊 API Documentation

OpenAPI documentation is available at:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## 📈 Monitoring

Spring Boot Actuator endpoints:
- Health: `http://localhost:8080/actuator/health`