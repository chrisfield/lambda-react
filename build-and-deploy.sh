#!/bin/bash
set -e

npm run build

aws cloudformation package \
  --template-file ./template.yaml \
  --s3-bucket kitf-lambda-react-code-bucket \
  --s3-prefix lambda-react-code/v0 \
  --output-template-file ./dist/packaged-template.yaml

aws cloudformation deploy \
  --template-file ./dist/packaged-template.yaml \
  --capabilities CAPABILITY_IAM \
  --stack-name lambda-react-stack \
  --parameter-overrides \
      chromeAwsLambdaLayerBucketName=kitf-lambda-react-code-bucket \
      bucketName=kitf-lambda-react-bucket \
