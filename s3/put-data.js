import s3 from './s3-instance';

const putData = ({ bucket, key, data }) => (
  new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: data
    }, (error) => (error ? reject(error): resolve()));
  })
);

export default putData;