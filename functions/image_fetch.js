const fetch = require('node-fetch');
// Import required AWS SDK clients and commands for Node.js.
const { ListObjectsCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('./client.js'); // Helper function that creates an Amazon S3 service client module.


require('dotenv').config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};


// Create the parameters for calling
const bucketParams = { Bucket: process.env.BUCKET_NAME };

const run = async () => {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    return data; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
};
// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  try {
    

    const res = await run();

    const munged = res.Contents.map(({ Key }) => `${process.env.S3_URL}${Key}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(munged)
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
