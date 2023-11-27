const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_S3_REGION
});

const credentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_S3_PUT_OBJECT_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_PUT_OBJECT_USER_SECRET_KEY,
});

const s3 = new AWS.S3({
    credentials,
    signatureVersion: 'v4'
});


function getPreSignedUrl(content_type, urls_number) {
    const urls = [];
    for (let i = 0; i < urls_number; i++){
        const key = `${uuid.v4()}.${content_type}`
        const preSignedUrl = s3.getSignedUrl('putObject', {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Expires: (3600 / 60) * 60, // 1 hour
            ContentType: `image/${content_type}`,
        });
        urls.push({url: preSignedUrl, key: key})
    }
    return urls;
}

function getPreSignedUrlWITHOUTDECLARYINGARRAY(content_type) {

    const key = `${uuid.v4()}.${content_type}`
    const preSignedUrl = s3.getSignedUrl('putObject', {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Expires: (3600 / 60) * 60, // 1 hour
        ContentType: `image/${content_type}`,
    });
    return {url: preSignedUrl, key: key}
    
}

async function doesObjectExistInS3(keys) {

    const Bucket = process.env.AWS_S3_BUCKET_NAME;

    const failed = []

    const promises = keys.map(key => {

        const params = {
            Bucket,
            Key: key
        };

        return new Promise((resolve, reject) => {
            s3.headObject(params, (err, data) => {

                if (err) {
                    failed.push(1)
                    reject()
                } else {
                    resolve()
                }
               
            })
        })
    })

    await Promise.all(promises);
    if (failed.length > 0) return false;

 
    return true;

   
}

module.exports = {
    getPreSignedUrl,
    doesObjectExistInS3
}