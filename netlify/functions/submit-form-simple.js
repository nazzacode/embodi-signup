exports.handler = async (event, context) => {
  console.log('Simple submit function invoked');
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

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

    // Log environment variables
    console.log('Environment check:', {
      hasToken: !!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
      tokenLength: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.length || 0,
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME
    });

    // For now, just return success without Airtable
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully (test mode)',
        recordId: `test_${Date.now()}`,
        isUpdate: false,
        data: { name, email, phone, note, recordId }
      }),
    };
  } catch (error) {
    console.error('Error in simple submit function:', error);
    
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
        debug: error.message
      }),
    };
  }
}; 