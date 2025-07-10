const Airtable = require('airtable');

exports.handler = async (event, context) => {
  console.log('Testing Airtable connection...');
  
  try {
    // Log environment variables
    console.log('Environment check:', {
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

    // Test reading from the table (this tests permissions)
    console.log('Testing table read access...');
    const records = await table.select({ maxRecords: 1 }).firstPage();
    console.log('Successfully read from table. Record count:', records.length);

    // Test creating a test record
    console.log('Testing record creation...');
    const testRecord = await table.create({
      Name: 'Test Entry',
      Email: 'test@example.com',
      Phone: '',
      Note: 'This is a test entry from Netlify function'
    });
    console.log('Successfully created test record:', testRecord.id);

    // Delete the test record
    console.log('Cleaning up test record...');
    await table.destroy(testRecord.id);
    console.log('Test record deleted successfully');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        message: 'Airtable connection test successful',
        details: {
          canRead: true,
          canCreate: true,
          canDelete: true,
          baseId: process.env.AIRTABLE_BASE_ID,
          tableName: process.env.AIRTABLE_TABLE_NAME
        },
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Airtable test failed:', error);
    console.error('Error details:', {
      message: error.message,
      statusCode: error.statusCode,
      error: error.error
    });
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        success: false,
        error: 'Airtable connection test failed',
        details: {
          message: error.message,
          statusCode: error.statusCode,
          error: error.error
        },
        timestamp: new Date().toISOString()
      }),
    };
  }
}; 