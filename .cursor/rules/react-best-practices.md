# React Project Cursor Rules

## Code Organization & Structure

### Components
- Keep components under 200 lines - split larger components into smaller, focused ones
- Use functional components with hooks
- Prefer named exports over default exports for better refactoring
- Group related components in folders with an index.js file
- Use PascalCase for component names and files

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   └── forms/          # Form-specific components
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── constants/          # App constants and configuration
├── services/           # API calls and external services
└── __tests__/          # Test files
```

### State Management
- Use useState for local component state
- Use useReducer for complex state logic
- Keep state as close to where it's used as possible
- Prefer lifting state up over prop drilling

## Styling Guidelines

### Tailwind CSS
- Use Tailwind classes instead of inline styles
- Create custom components for repeated patterns
- Use semantic color names in tailwind.config.js
- Prefer responsive design utilities over media queries

### CSS Best Practices
- No inline styles except for dynamic values
- Use CSS modules or styled-components for component-specific styles
- Follow mobile-first responsive design

## Code Quality Standards

### TypeScript (Recommended Migration)
- Use TypeScript for better type safety and developer experience
- Define interfaces for all data structures
- Use strict TypeScript configuration

### Testing
- Write tests for all components and utilities
- Use React Testing Library for component tests
- Aim for 80%+ test coverage
- Test user interactions, not implementation details
- Group related tests in describe blocks

### Performance
- Use React.memo for expensive re-renders
- Implement lazy loading for routes and heavy components
- Optimize images and assets
- Use proper dependencies in useEffect and useCallback

## Error Handling

### Error Boundaries
- Implement error boundaries for graceful error handling
- Log errors to monitoring service
- Provide fallback UI for broken components

### API Error Handling
- Handle network errors gracefully
- Provide user-friendly error messages
- Implement retry logic where appropriate
- Log errors for debugging

## Accessibility (a11y)

### Requirements
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Use ARIA labels where needed
- Test with screen readers
- Maintain proper color contrast ratios

## Environment & Configuration

### Environment Variables
- Use .env files for configuration
- Never commit sensitive data
- Validate environment variables on app start

### Constants
- Define all magic numbers and strings as constants
- Group related constants in modules
- Use TypeScript enums where appropriate

## Git & Development Workflow

### Commit Messages
- Use conventional commit format
- Keep commits atomic and focused
- Write descriptive commit messages

### Code Review
- Keep PRs small and focused
- Include tests for new features
- Update documentation as needed
- Run all tests before submitting

## Security Best Practices

### Data Handling
- Validate all user inputs
- Sanitize data before displaying
- Use HTTPS for all communications
- Implement rate limiting for API endpoints

### Dependencies
- Keep dependencies up to date
- Audit for security vulnerabilities regularly
- Use exact versions in package.json for production

## Documentation Requirements

### Code Documentation
- Document complex business logic
- Use JSDoc for function documentation
- Keep README  and documentationup to date
- Document deployment process

### Component Documentation
- Document component props and usage
- Provide examples for complex components
- Document any breaking changes 