const Airtable = require('airtable');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Log the incoming request for debugging
  console.log('Function invoked with:', {
    method: event.httpMethod,
    body: event.body,
    headers: event.headers
  });

  try {
    // Parse the request body
    const { name, email, phone, recordId } = JSON.parse(event.body);

    // Validate required fields - only email is required
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Email is required' 
        }),
      };
    }

    // Log environment variables for debugging
    console.log('Environment variables check:', {
      hasToken: !!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
      tokenLength: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.length || 0,
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME
    });

    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
    }).base(process.env.AIRTABLE_BASE_ID);

    const table = base(process.env.AIRTABLE_TABLE_NAME);

    let record;
    let isUpdate = false;

    if (recordId) {
      // Update existing record
      try {
        record = await table.update(recordId, {
          Name: name,
          Email: email,
          Phone: phone || '',
        });
        isUpdate = true;
      } catch (updateError) {
        // If update fails, create a new record instead
        console.warn('Failed to update record, creating new one:', updateError.message);
        record = await table.create({
          Name: name,
          Email: email,
          Phone: phone || '',
        });
        isUpdate = false;
      }
    } else {
      // Create new record
      record = await table.create({
        Name: name,
        Email: email,
        Phone: phone || '',
      });
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        message: isUpdate ? 'Record updated successfully' : 'Form submitted successfully',
        recordId: record.id,
        isUpdate,
      }),
    };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Check environment variables
    const envCheck = {
      hasToken: !!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
      tokenLength: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.length || 0,
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME
    };
    
    console.log('Environment check:', envCheck);
    
    // Provide more specific error messages based on missing variables
    let errorMessage = 'Failed to submit form. Please try again.';
    let debugInfo = error.message;
    
    if (!envCheck.hasToken) {
      errorMessage = 'Server configuration error: Missing Airtable token';
      debugInfo = 'AIRTABLE_PERSONAL_ACCESS_TOKEN not set';
    } else if (!envCheck.hasBaseId) {
      errorMessage = 'Server configuration error: Missing Airtable base ID';
      debugInfo = 'AIRTABLE_BASE_ID not set';
    } else if (!envCheck.hasTableName) {
      errorMessage = 'Server configuration error: Missing Airtable table name';
      debugInfo = 'AIRTABLE_TABLE_NAME not set';
    }
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: false,
        error: errorMessage,
        debug: debugInfo,
        envCheck: envCheck // Include environment check for debugging
      }),
    };
  }
}; 