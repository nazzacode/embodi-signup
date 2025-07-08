# Development Guide

## 🏗️ Project Structure

```
embodi-signup/
├── .cursor/                    # Cursor IDE configuration
│   └── rules/                  # Coding standards and rules
├── netlify/
│   └── functions/             # Serverless backend functions
├── src/
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (future)
│   │   └── forms/            # Form-specific components (future)
│   ├── constants/            # Application constants and configuration
│   ├── services/             # API calls and external services
│   ├── utils/                # Utility functions
│   └── hooks/                # Custom React hooks (future)
├── public/                   # Static assets
├── build/                   # Production build output
└── docs/                    # Documentation (future)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git
- Netlify CLI (for local development)

### Initial Setup
1. **Clone and install:**
   ```bash
   git clone <repo-url>
   cd embodi-signup
   npm install
   ```

2. **Environment setup:**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your actual values
   # Required: AIRTABLE_PERSONAL_ACCESS_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME
   ```

3. **Development server:**
   ```bash
   # For frontend-only development (uses API simulation)
   npm start
   
   # For full-stack development with Netlify Functions
   npm run dev
   ```

## 🛠️ Development Workflow

### Code Quality Tools

#### ESLint & Prettier
- **ESLint**: Configured with React best practices and accessibility rules
- **Prettier**: Enforces consistent code formatting
- Run manually: `npm run lint` and `npm run format`
- Auto-format on save recommended in your editor

#### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Component Development Guidelines

#### File Organization
- Components under 200 lines
- Co-locate tests with components
- Use named exports for better refactoring
- Group related components in folders

#### Naming Conventions
- Components: `PascalCase` (e.g., `SignupForm.jsx`)
- Files: Match component name
- Hooks: `use` prefix (e.g., `useFormValidation`)
- Constants: `UPPER_SNAKE_CASE`

#### Code Examples

**Good Component Structure:**
```jsx
// src/components/forms/ContactForm.jsx
import React, { useState } from 'react';
import { submitForm } from '../../services/api';
import { validateForm } from '../../utils/validation';
import { MESSAGES } from '../../constants';

const ContactForm = ({ onSuccess, onError }) => {
  // Component logic here
  return (
    // JSX here
  );
};

export default ContactForm;
```

**Constants Usage:**
```jsx
import { API_ENDPOINTS, MESSAGES } from '../constants';

// Use constants instead of magic strings
const response = await fetch(API_ENDPOINTS.SUBMIT_FORM);
setError(MESSAGES.ERROR.NETWORK_ERROR);
```

## 🧪 Testing Strategy

### Test Organization
- Unit tests: Individual functions and components
- Integration tests: Component interactions
- End-to-end tests: User workflows (future)

### Testing Best Practices
- Test user interactions, not implementation details
- Use descriptive test names
- Group related tests with `describe` blocks
- Mock external dependencies (API calls, etc.)

### Example Test Structure
```javascript
describe('SignupForm', () => {
  describe('Form Validation', () => {
    test('should show error for invalid email', () => {
      // Test implementation
    });
  });
  
  describe('Form Submission', () => {
    test('should submit valid form data', () => {
      // Test implementation
    });
  });
});
```

## 🎨 Styling Guidelines

### Tailwind CSS
- Use utility classes for styling
- Avoid inline styles except for dynamic values
- Create custom components for repeated patterns
- Use responsive design utilities

### Custom Styling
```jsx
// Preferred: Tailwind classes
<div className="bg-white rounded-lg shadow-lg p-6">

// Acceptable: Dynamic values
<div style={{ width: `${progress}%` }}>

// Avoid: Static inline styles
<div style={{ backgroundColor: 'white', padding: '24px' }}>
```

## 📊 State Management

### Current Approach
- `useState` for local component state
- `useReducer` for complex state logic
- Props for component communication

### Future Considerations
- Context API for global state
- State management library (Redux, Zustand) if complexity grows

## 🔒 Security Practices

### Environment Variables
- Never commit sensitive data
- Use `.env.example` for documentation
- Validate environment variables on startup

### Input Validation
- Validate all user inputs
- Sanitize data before display
- Use proper TypeScript types (when migrated)

### API Security
- Implement rate limiting in backend
- Use HTTPS for all communications
- Validate requests in serverless functions

## 📱 Performance Guidelines

### React Optimization
- Use `React.memo` for expensive re-renders
- Implement lazy loading for heavy components
- Optimize useEffect dependencies

### Asset Optimization
- Optimize images and fonts
- Use appropriate image formats (WebP, AVIF)
- Implement proper caching strategies

## 🚀 Deployment

### Development Deployment
```bash
# Build and test locally
npm run build
npm test

# Deploy to Netlify (if connected)
git push origin main
```

### Production Checklist
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Build completes without errors
- [ ] Performance audit completed
- [ ] Security audit completed
- [ ] Accessibility testing completed

## 🔧 Common Development Tasks

### Adding a New Component
1. Create component file in appropriate directory
2. Write component with proper TypeScript types
3. Create test file with comprehensive coverage
4. Export component from index file (if using)
5. Update documentation if needed

### Adding Environment Variables
1. Add to `.env.example` with description
2. Add to `src/constants/index.js`
3. Update deployment documentation
4. Configure in Netlify dashboard

### Debugging Common Issues

#### "Module not found" errors
- Check import paths are correct
- Ensure file extensions are included
- Verify file exists and is exported

#### API errors in development
- Check if using correct endpoint
- Verify environment variables
- Check network tab in browser dev tools

#### Styling issues
- Verify Tailwind classes are valid
- Check for CSS conflicts
- Use browser dev tools to inspect styles

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)

### Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 