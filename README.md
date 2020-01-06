# lambda-react

## prerequsites
Install [AWS-CLI](https://aws.amazon.com/cli)

Configure aws-cli with your aws credentials:
```
aws configure
```

Create the zip file for the chrome-aws-lambda-layer:
```
mkdir chrome-aws-lambda-layer && cd chrome-aws-lambda-layer
npm init -y
npm install chrome-aws-lambda puppeteer-core

mkdir nodejs
cp -r node_modules nodejs
cp package.json nodejs
cp package-lock.json nodejs
zip -r chrome-aws-lambda-layer.zip nodejs
```

Create an s3 bucket for the lambda code either through the web interface or with a command like:
```
aws s3 mb s3://your-name-here-lambda-react-code-bucket
```

Finally upload the chrome-aws-lambda-layer.zip file to the bucket

There is more information on creating lambda layers [here](https://medium.com/appgambit/part-1-getting-started-with-aws-lambda-layers-1677a6b006)

## Getting Started

Clone the repo and `cd` to the folder

Install dependencies: `npm install`

You will most likely want to change the bucket names in `build-and-deploy.sh` script (where it says "kitf-...")

Deploy the cloud-formation stack to aws:
```
sh build-and-deploy.sh 
```

Now upload a file (with suffix .json) to the data bucket. this will trigger the lambda to run.