const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({region, accessKeyId, secretAccessKey});

/**
 * Upload a file to aws s3.
 * @param {file} file File to upload to aws s3.
 * @return {promise<{ETag, Location, key, Key, Bucket}>}
 */
function upload(file) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: `${uuid.v4()}.${
      file.originalname.substring(
          file.originalname.lastIndexOf('.') + 1)
    }`,
  };
  return s3.upload(uploadParams).promise();
}
/**
 * retrieve a file to from s3.
 * @param {file} file File to retrieve from aws s3.
 * @return {promise<data>} data ===null if retrieval failed
 */
function getFile(key) {
  const getParams={
    Bucket: bucketName,
    Key: key};
  return s3.getObject(getParams).promise();
};

module.exports={upload, getFile};
