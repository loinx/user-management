# User Management Frontend

A modern React-based user management system with TypeScript, Redux Toolkit, CoreUI, and comprehensive testing setup.

## 🚀 Features

- ⚛️ React 18 with TypeScript
- 🎨 CoreUI for beautiful, responsive UI components
- 📊 Redux Toolkit for state management
- 🔒 JWT Authentication
- 📝 Form handling with Formik and Yup
- 📱 Responsive design
- 🧪 Comprehensive testing setup with Vitest
- 📈 Code coverage reporting
- 🔄 CI/CD integration

## 📋 Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

## 🚀 Development

Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 🧪 Testing

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Open test UI
npm run test:ui
```

### Test Coverage

The project maintains a minimum code coverage of 80% for:
- Branches
- Functions
- Lines
- Statements

Coverage reports are generated in the `coverage` directory and can be viewed by opening `coverage/lcov-report/index.html` in a browser.

## 📦 Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist` directory.

## 🐳 Docker Support

Build the Docker image:
   ```bash
   docker build -t frontend-template .
   ```

Run the container:
   ```bash
   docker run -p 80:80 frontend-template
   ```

## 📁 Project Structure

```
frontend-template/
├── src/
│   ├── components/     # React components
│   ├── store/         # Redux store and slices
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── App.tsx        # Root component
├── public/            # Static files
├── cypress/          # E2E tests
├── coverage/         # Test coverage reports
└── vite.config.ts    # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Open test UI
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 📈 Code Coverage

The project uses Vitest for code coverage reporting. Coverage reports are generated automatically when running `npm run test:coverage`. The coverage configuration can be found in `vitest.config.ts`.

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
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vitest](https://vitest.dev/)
- [Vite](https://vitejs.dev/) 