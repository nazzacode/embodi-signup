# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
```bash
# Start development server (frontend only)
npm start

# Start full-stack development with Netlify Functions
npm run dev

# Build production version
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Testing Individual Components
```bash
# Run specific test file
npm test -- --testNamePattern="ConfigurableSignup"

# Run tests for a specific component
npm test -- src/components/ConfigurableSignup.test.js
```

## Architecture Overview

This is a React-based mailing list signup application with **progressive disclosure** functionality. The key architectural pattern

a configurable form system that adapts based on user progression.

### Core Architecture Components

1. **ConfigurableSignup** (src/components/ConfigurableSignup.jsx) - Main container component
2. **useConfigurableForm** (src/hooks/useConfigurableForm.js) - Central state management hook
3. **formConfig** (src/config/form-config.js) - Single source of truth for all form behavior
4. **Netlify Functions** (netlify/functions/submit-form.js) - Serverless backend for Airtable integration

### Progressive Disclosure Flow

The application implements a two-stage progressive disclosure pattern:

1. **Initial Stage**: Collects email only with minimal UI
2. **Expanded Stage**: After initial submission, expands to collect additional optional fields (name, phone)
3. **Record Management**: Uses Airtable record IDs to update the same record across stages

### Key Design Patterns

- **Configuration-Driven**: All form behavior, validation, and content is defined in `form-config.js`
- **Stage-Based Rendering**: Components adapt their UI based on current `formStage`
- **Record ID Tracking**: Initial submission creates a record, subsequent submissions update the same record
- **Error Boundary**: Wraps the entire application for graceful error handling

### State Management

The `useConfigurableForm` hook manages:
- Form data across all stages
- Validation errors per field
- Submission state (loading, success, error)
- Current form stage
- Record ID for updates

### Backend Integration

- **Airtable Integration**: Uses personal access tokens for authentication
- **CORS Handling**: Proper headers for cross-origin requests
- **Error Handling**: Comprehensive error logging and fallback behavior
- **Update Strategy**: Attempts to update existing records, falls back to creating new ones

## Environment Configuration

Required environment variables:
```
AIRTABLE_PERSONAL_ACCESS_TOKEN=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=your_table_name_here
REACT_APP_FORM_ENDPOINT=/.netlify/functions/submit-form
```

## Brand Guidelines

The application follows Embodi Computing's spatial computing aesthetic:
- **Design System**: Translucent UI panels with blur effects
<!-- - **Color Palette**: Medical white/blue gradient backgrounds with deep charcoal text -->
- **Typography**: Modern sans-serif with clean hierarchy
- **Styling**: Tailwind CSS with custom spatial computing-inspired design

## Testing Strategy

- **Component Testing**: React Testing Library for user interaction testing
- **Integration Testing**: Full form flow testing across stages
- **Validation Testing**: Comprehensive field validation scenarios
- **API Testing**: Mock Netlify Functions for backend integration testing

## Common Development Patterns

### Adding New Form Fields
1. Update `form-config.js` stages array
2. Add field to appropriate stage configuration
3. Update validation rules if needed
4. Add backend handling in `submit-form.js`

### Modifying Form Stages
1. Update `FORM_STAGES` constants in `form-config.js`
2. Add new stage configuration to `stages` array
3. Update `useConfigurableForm` hook logic for new stage transitions

### Updating Brand Styling
1. Modify `ui` configuration in `form-config.js`
2. Update `brand-guidelines.md` for documentation
3. Apply changes through Tailwind classes or inline styles

## Important Notes

- **Progressive Enhancement**: Application gracefully handles JavaScript disabled scenarios
- **Accessibility**: Form follows WCAG guidelines with proper ARIA labels
- **Performance**: Optimized for mobile-first responsive design
- **Security**: No sensitive data stored in frontend, all validation server-side
- **Deployment**: Designed specifically for Netlify with Functions integration