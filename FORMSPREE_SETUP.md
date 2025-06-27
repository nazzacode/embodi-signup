# Formspree -> Airtable Setup Guide

## ✅ Implementation Complete

Step 4 of the PROJECT_GUIDE.md has been successfully implemented with full test coverage!

### What's Been Implemented:

✅ **Form Submission to Formspree**
- Async form submission handling
- POST request to Formspree endpoint with JSON data
- Proper error handling for network issues

✅ **Loading States**
- "SUBMITTING..." button text during submission
- Disabled form fields during submission
- Visual feedback with opacity changes

✅ **Success Handling**
- Success message screen after submission
- Form reset after successful submission
- "Submit Another" functionality

✅ **Error Handling**
- Network error handling
- Formspree API error responses
- User-friendly error messages

✅ **Form Validation**
- Required field validation (name and email)
- Prevents submission with empty required fields

✅ **Complete Test Suite**
- 7 comprehensive tests covering all functionality
- Mock API responses for reliable testing
- TDD approach with failing tests first

## Backend Setup Required

### 1. Airtable Setup

1. **Create Airtable Base:**
   - Go to [airtable.com](https://airtable.com)
   - Create a new base called "Embodi Mailing List"
   - Create a table with these fields:
     - **Name** (Single line text)
     - **Email** (Email)
     - **Phone** (Phone number)
     - **Note** (Long text)
     - **Timestamp** (Created time)

### 2. Formspree Setup

1. **Create Formspree Account:**
   - Go to [formspree.io](https://formspree.io)
   - Sign up for a free account

2. **Create New Form:**
   - Click "Create Form"
   - Choose a form name (e.g., "Embodi Mailing List")
   - Get your form endpoint URL (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

3. **Configure Airtable Integration:**
   - In your Formspree dashboard, go to form settings
   - Navigate to "Integrations" tab
   - Add Airtable integration
   - Connect your Airtable account
   - Select your "Embodi Mailing List" base and table
   - Map the form fields to Airtable columns:
     - `name` → Name
     - `email` → Email
     - `phone` → Phone
     - `note` → Note

### 3. Environment Configuration

Create a `.env` file in your project root:

```bash
# Replace YOUR_FORM_ID with your actual Formspree form ID
REACT_APP_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### 4. Test the Integration

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Test form submission:**
   - Fill out the form with test data
   - Submit the form
   - Verify success message appears
   - Check Airtable to confirm data was received
   - Check Formspree dashboard for submission log

3. **Run tests:**
   ```bash
   npm test -- --testNamePattern="SignupForm - Formspree Integration"
   ```

## Integration Features

### Form Submission Flow:
1. User fills out form
2. Form validates required fields
3. Shows loading state
4. Sends data to Formspree
5. Formspree forwards to Airtable
6. Shows success message
7. Form resets for next submission

### Data Flow:
```
SignupForm → Formspree → Airtable
     ↓           ↓         ↓
  Validation  Processing  Storage
```

### Error Handling:
- Network connectivity issues
- Formspree API errors
- Invalid form data
- User-friendly error messages

## Next Steps

Once setup is complete, you can proceed to **Step 5: Form Validation** for additional client-side validation features.

The current implementation already includes basic required field validation, but Step 5 will add:
- Email format validation
- Enhanced error display
- Field-level validation feedback 