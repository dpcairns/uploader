// Create service client module using ES6 syntax.
const { S3Client } = require('@aws-sdk/client-s3');
// Set the AWS Region.
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: process.env.REGION });
module.exports = { s3Client };