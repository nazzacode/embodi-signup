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
    const { name, email, phone, note, recordId } = JSON.parse(event.body);

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
    console.log('Initializing Airtable with:', {
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME
    });

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
    }).base(process.env.AIRTABLE_BASE_ID);

    const table = base(process.env.AIRTABLE_TABLE_NAME);

    let record;
    let isUpdate = false;

    try {
      if (recordId) {
        // Update existing record
        console.log('Attempting to update record:', recordId);
        try {
          record = await table.update(recordId, {
            Name: name,
            Email: email,
            Phone: phone || '',
            Note: note || '',
          });
          isUpdate = true;
          console.log('Record updated successfully:', record.id);
        } catch (updateError) {
          // If update fails, create a new record instead
          console.warn('Failed to update record, creating new one:', updateError.message);
          record = await table.create({
            Name: name,
            Email: email,
            Phone: phone || '',
            Note: note || '',
          });
          isUpdate = false;
          console.log('New record created instead:', record.id);
        }
      } else {
        // Create new record
        console.log('Creating new record with data:', { name, email, phone, note });
        record = await table.create({
          Name: name,
          Email: email,
          Phone: phone || '',
          Note: note || '',
        });
        console.log('New record created successfully:', record.id);
      }
    } catch (airtableError) {
      console.error('Airtable API error:', airtableError);
      console.error('Airtable error details:', {
        message: airtableError.message,
        statusCode: airtableError.statusCode,
        error: airtableError.error
      });
      throw airtableError;
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