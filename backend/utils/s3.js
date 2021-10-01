const s3 = require('aws-sdk/clients/s3');

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
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

module.exports ={upload};
