const fetch = require('node-fetch');
// Import required AWS SDK clients and commands for Node.js.
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('./client.js'); // Helper function that creates an Amazon S3 service client module.

// Set the parameters.
const bucketParams = {
  Bucket: process.env.BUCKET_NAME,
  // Specify the name of the new object. For example, 'index.html'.
  // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
};

// Create and upload the object to the S3 bucket.


require('dotenv').config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};


// Create the parameters for calling

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  console.log(event);
  const run = async () => {
    const key = event.queryStringParameters.key;
    try {

      const buf = Buffer.from(event.body.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      const data = await s3Client.send(new PutObjectCommand({
        ...bucketParams,
        Key: `${Math.floor(Math.random() * 100000)}${event.queryStringParameters.key}`,
        // Content of the new object.
        Body: buf,
        ContentEncoding: 'base64', // required
        ContentType: 'image/jpg' // required. Notice the back ticks        
      }));

      console.log(
        'Successfully uploaded object: ' +
          bucketParams.Bucket +
          '/' +
          key
      );
  
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  };

  
  try {

    const res = await run();


    // const munged = res.Contents.map(({ Key }) => `${process.env.S3_URL}${Key}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res)
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
