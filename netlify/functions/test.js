exports.handler = async (event, context) => {
  console.log('Test function invoked');
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
    body: JSON.stringify({
      success: true,
      message: 'Test function is working',
      environment: {
        hasToken: !!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
        hasBaseId: !!process.env.AIRTABLE_BASE_ID,
        hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
        tokenLength: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.length || 0,
        baseId: process.env.AIRTABLE_BASE_ID,
        tableName: process.env.AIRTABLE_TABLE_NAME
      },
      timestamp: new Date().toISOString()
    }),
  };
}; 