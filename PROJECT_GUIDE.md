# PROJECT_GUIDE.md - Embodi Computing Mailing List Signup

Save this file as `PROJECT_GUIDE.md` in your project root directory for persistent reference.

## Project Overview
Build a simple mailing list signup page for Embodi Computing using React, Tailwind CSS, Netlify hosting, and Formspree -> Airtable backend integration.

## Step 1: Project Structure & Basic Setup
Create a new React project with this structure:
```
embodi-signup/
├── PROJECT_GUIDE.md          # This file - your development roadmap
├── src/
│   ├── components/
│   │   └── SignupForm.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
└── package.json
```

**Test 1**: Verify the basic React app renders "Embodi Computing - Join Our Mailing List" heading.

## Step 2: Form Structure
Create SignupForm component with:
- Name field (required)
- Email field (required) 
- Phone field (optional)
- Note field (optional, textarea)
- Submit button

**Test 2**: Form renders all fields correctly and handles basic form state.

## Step 3: Styling with Tailwind
Style the form with Tailwind CSS:
- Clean, professional design
- Responsive layout
- Clear field labels
- Proper spacing and typography

**Test 3**: Form looks professional on desktop and mobile.

## Step 4: Form Validation
Add client-side validation:
- Required field validation
- Email format validation
- Display error messages

**Test 4**: Form prevents submission with invalid data and shows appropriate errors.

## Step 5: Formspree -> Airtable Integration
Set up Formspree to collect form submissions and automatically send them to Airtable:
- Create Airtable base with appropriate fields (Name, Email, Phone, Note, Timestamp)
- Set up Formspree form endpoint
- Configure Formspree to integrate with Airtable
- Update form to submit to Formspree endpoint
- Add loading states and success/error handling
- Test form submission flow

**Test 5**: Form successfully submits data through Formspree to Airtable and shows confirmation.

## Step 6: Netlify Deployment
- Add netlify.toml configuration
- Set up build commands
- Configure environment variables for Formspree endpoint
- Deploy to Netlify and test production form

**Test 6**: Site deploys successfully on Netlify and form works in production.

## Development Approach
- Write tests before implementing each feature
- Make small, incremental changes
- Test after each change
- Use test-driven development cycle

## Backend Setup Instructions

### Airtable Setup:
1. Create new Airtable base called "Embodi Mailing List"
2. Create table with fields:
   - Name (Single line text)
   - Email (Email)
   - Phone (Phone number)
   - Note (Long text)
   - Timestamp (Created time)

### Formspree Setup:
1. Sign up at formspree.io
2. Create new form
3. Configure Airtable integration in Formspree dashboard
4. Get form endpoint URL for frontend integration

## Required Fields
- Name (text, required)
- Email (email, required)
- Phone (tel, optional)  
- Note (textarea, optional)

Start with Step 1 and confirm it works before proceeding to Step 2.