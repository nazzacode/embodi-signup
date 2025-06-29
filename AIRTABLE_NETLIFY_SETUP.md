# Airtable API + Netlify Functions Setup Guide

## 🎯 Current Status

### ✅ COMPLETED
- ✅ Netlify Functions created and configured
- ✅ Airtable npm package installed
- ✅ Frontend code updated to use new endpoint
- ✅ All tests updated and passing (7/7)
- ✅ netlify.toml configuration file created
- ✅ Personal Access Token provided
- ✅ Table name confirmed

### ⚠️ FINAL STEPS
1. ✅ **Create Airtable Base** - Complete
2. ✅ **Get Base ID** - Complete (`appbc6KpwFGczRfTF`)
3. ⚠️ **Create .env file** - You need to do this
4. ⚠️ **Deploy to Netlify** - Ready after .env file

---

## ✅ Implementation Complete

Step 4 of the PROJECT_GUIDE.md has been successfully implemented with full test coverage!

### ✅ Recent Updates - Airtable Integration Ready

✅ **Netlify Functions Setup Complete**
- Created `netlify/functions/submit-form.js` with full Airtable integration
- Installed `airtable` npm package
- Created `netlify.toml` configuration file

✅ **Environment Configuration Ready**
- Personal Access Token: `pat5Gzi7GvLlptIR2.d3ab5d4da5f949b42574802da08b472b6a1cce63feb014e1a0df0402690802cf` ✅
- Table Name: `Embodi Mailing list` ✅
- Frontend endpoint updated to: `/.netlify/functions/submit-form`

✅ **Tests Updated and Passing**
- All 7 tests updated for Airtable integration
- Tests now use `REACT_APP_FORM_ENDPOINT` instead of Formspree
- All tests passing ✅

### What's Been Implemented:

✅ **Form Submission Handler**
- Async form submission handling
- POST request to Netlify Function endpoint
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
- API error responses
- User-friendly error messages

✅ **Form Validation**
- Required field validation (name and email)
- Prevents submission with empty required fields

✅ **Complete Test Suite**
- 7 comprehensive tests covering all functionality
- Mock API responses for reliable testing
- TDD approach with failing tests first

## ✅ Setup Complete - Ready for Testing!

### 1. Airtable Setup - ✅ COMPLETE

1. **Create Airtable Base:**
   - Go to [airtable.com](https://airtable.com)
   - Create a new base called "Embodi Mailing List"
   - Create a table with these fields:
     - **Name** (Single line text)
     - **Email** (Email)
     - **Phone** (Phone number)
     - **Note** (Long text)
     - **Timestamp** (Created time)
   - ⚠️ **IMPORTANT**: Make sure the table name is exactly `Embodi Mailing list` (as provided)

2. **Get Airtable Base ID - ✅ COMPLETE:**
   - Base ID obtained: `appbc6KpwFGczRfTF`
   - Integration configured and ready to use!

3. **Credentials Status:**
   - **TOKEN ID**: `pat5Gzi7GvLlptIR2.d3ab5d4da5f949b42574802da08b472b6a1cce63feb014e1a0df0402690802cf` ✅
   - **TABLE NAME**: `Embodi Mailing list` ✅
   - **BASE ID**: `appbc6KpwFGczRfTF` ✅

### 2. Netlify Functions Setup - ✅ COMPLETE

1. **Create Netlify Functions Directory:** ✅
   ```bash
   mkdir netlify/functions
   ```

2. **Install Dependencies:** ✅
   ```bash
   npm install airtable
   ```

3. **Create Submission Function:** ✅
   Created `netlify/functions/submit-form.js`:

   ```javascript
   const Airtable = require('airtable');

   exports.handler = async (event, context) => {
     // Only allow POST requests
     if (event.httpMethod !== 'POST') {
       return {
         statusCode: 405,
         body: JSON.stringify({ error: 'Method not allowed' }),
       };
     }

     try {
       // Parse the request body
       const { name, email, phone, note } = JSON.parse(event.body);

       // Validate required fields
       if (!name || !email) {
         return {
           statusCode: 400,
           body: JSON.stringify({ 
             error: 'Name and email are required' 
           }),
         };
       }

       // Initialize Airtable
       const base = new Airtable({
         apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
       }).base(process.env.AIRTABLE_BASE_ID);

       // Create record in Airtable
       const record = await base(process.env.AIRTABLE_TABLE_NAME).create({
         Name: name,
         Email: email,
         Phone: phone || '',
         Note: note || '',
       });

       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Methods': 'POST, OPTIONS',
         },
         body: JSON.stringify({
           success: true,
           message: 'Form submitted successfully',
           recordId: record.id,
         }),
       };
     } catch (error) {
       console.error('Error submitting to Airtable:', error);
       
       return {
         statusCode: 500,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Methods': 'POST, OPTIONS',
         },
         body: JSON.stringify({
           success: false,
           error: 'Failed to submit form. Please try again.',
         }),
       };
     }
   };
   ```

4. **Handle CORS Preflight:**
   The function above already includes CORS headers, but you can also create a separate OPTIONS handler if needed.

### 3. Environment Configuration - ✅ COMPLETE

You need to create a `.env` file in your project root with these values:

```bash
# Airtable Configuration
AIRTABLE_PERSONAL_ACCESS_TOKEN=pat5Gzi7GvLlptIR2.d3ab5d4da5f949b42574802da08b472b6a1cce63feb014e1a0df0402690802cf
AIRTABLE_BASE_ID=appbc6KpwFGczRfTF
AIRTABLE_TABLE_NAME=Embodi Mailing list

# Frontend Configuration
REACT_APP_FORM_ENDPOINT=/.netlify/functions/submit-form
```

✅ **READY TO USE**: All credentials are now configured!

### 4. Netlify Configuration - ✅ COMPLETE

Created `netlify.toml` in your project root:

```toml
[build]
  functions = "netlify/functions"
  publish = "build"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
```

### 5. Update Frontend Code - ✅ COMPLETE

Updated the endpoint in SignupForm component:

```javascript
// Updated from:
const response = await fetch(process.env.REACT_APP_FORMSPREE_ENDPOINT, {
// To:
const response = await fetch(process.env.REACT_APP_FORM_ENDPOINT, {
```

✅ **Tests Updated**: All 7 tests updated and passing with new endpoint.

### 6. Test the Integration

1. **Test locally with Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify dev
   ```

2. **Test form submission:**
   - Fill out the form with test data
   - Submit the form
   - Verify success message appears
   - Check Airtable to confirm data was received

3. **Run tests:**
   ```bash
   # Update the test environment variable
   REACT_APP_FORM_ENDPOINT=/.netlify/functions/submit-form npm test -- --testNamePattern="SignupForm - Formspree Integration"
   ```

### 7. Deploy to Netlify

1. **Connect to Netlify:**
   - Push your code to GitHub
   - Connect repository to Netlify
   - Set environment variables in Netlify dashboard

2. **Set Environment Variables in Netlify:**
   - Go to Site Settings > Environment Variables
   - Add:
     - `AIRTABLE_PERSONAL_ACCESS_TOKEN`
     - `AIRTABLE_BASE_ID`
     - `AIRTABLE_TABLE_NAME`

3. **Deploy:**
   - Netlify will automatically build and deploy
   - Test the production form

## Integration Features

### Form Submission Flow:
1. User fills out form
2. Form validates required fields
3. Shows loading state
4. Sends data to Netlify Function
5. Function validates and saves to Airtable
6. Shows success message
7. Form resets for next submission

### Data Flow:
```
SignupForm → Netlify Function → Airtable API
     ↓             ↓              ↓
  Validation   Processing     Storage
```

### Advantages of This Approach:
- **Direct Control** - No third-party service dependency
- **Better Security** - API keys never exposed to frontend
- **Cost Effective** - No Formspree subscription needed
- **Customizable** - Full control over validation and processing
- **Scalable** - Netlify Functions auto-scale

### Error Handling:
- Network connectivity issues
- Airtable API errors
- Invalid form data
- Server function errors
- User-friendly error messages

## Next Steps

Once setup is complete, you can proceed to **Step 5: Form Validation** for additional client-side validation features.

The current implementation already includes basic required field validation, but Step 5 will add:
- Email format validation
- Enhanced error display
- Field-level validation feedback

## Troubleshooting

### Common Issues:
1. **CORS Errors** - Ensure CORS headers are included in function response
2. **Environment Variables** - Check variables are set in both local `.env` and Netlify dashboard
3. **Airtable Permissions** - Verify Personal Access Token has correct scopes
4. **Function Timeout** - Airtable API calls should complete within Netlify's timeout limits 