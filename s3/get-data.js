import s3 from './s3-instance';

const getData = async ({ bucket, key }) => {
  const params = {
    Bucket: bucket,
    Key: key
  };

  const response = await s3.getObject(params).promise();

  return JSON.parse(response.Body.toString('utf-8'));
};

export default getData;
