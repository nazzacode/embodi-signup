# Environment Variables Setup

## Required Environment Variables

Your Netlify function requires the following environment variables to be set in your Netlify dashboard:

### 1. AIRTABLE_PERSONAL_ACCESS_TOKEN
- **Purpose**: Authentication token for Airtable API
- **How to get it**: 
  1. Go to https://airtable.com/create/tokens
  2. Create a new token with permissions for your base
  3. Copy the generated token

### 2. AIRTABLE_BASE_ID
- **Purpose**: Identifies which Airtable base to use
- **How to get it**:
  1. Open your Airtable base in the browser
  2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
  3. Copy the `appXXXXXXXXXXXXXX` part (this is your Base ID)

### 3. AIRTABLE_TABLE_NAME
- **Purpose**: Specifies which table in your base to use
- **How to get it**:
  1. Open your Airtable base
  2. Look at the table name (e.g., "Signups", "Leads", "Contacts")
  3. Use the exact table name

## Setting Up in Netlify Dashboard

1. Go to your Netlify dashboard
2. Navigate to your site (embodi-signup)
3. Go to **Site settings** → **Environment variables**
4. Add each variable:
   - Key: `AIRTABLE_PERSONAL_ACCESS_TOKEN`, Value: your token
   - Key: `AIRTABLE_BASE_ID`, Value: your base ID
   - Key: `AIRTABLE_TABLE_NAME`, Value: your table name
5. Save the changes
6. Trigger a new deployment (or wait for auto-deploy)

## Testing the Setup

After setting the environment variables:

1. The form should submit successfully
2. Data should appear in your Airtable base
3. No more 500 errors should occur

## Troubleshooting

If you're still getting 500 errors after setting the variables:

1. Check that all three variables are set correctly
2. Verify your Airtable token has the correct permissions
3. Ensure the table name matches exactly (case-sensitive)
4. Check Netlify function logs for more detailed error messages

## Local Development

For local development, you can create a `.env.local` file in your project root:

```
AIRTABLE_PERSONAL_ACCESS_TOKEN=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=your_table_name_here
```

Note: The local environment variables are only used for development. Production uses the Netlify dashboard settings. 