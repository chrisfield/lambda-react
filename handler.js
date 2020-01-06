
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import getData from './s3/get-data';
import putData from './s3/put-data';
import Hello from './components/hello';

import getBrowserInstance from './get-browser-instance';

export const renderAndUpload = async (event, context) => {
  let browser = null;
  let page = null;
  const { UPLOAD_BUCKET } = process.env;
  const dataBucketName = event.Records[0].s3.bucket.name;
  const dataFileName = event.Records[0].s3.object.key;
  const data = await getData({ bucket: dataBucketName, key: dataFileName });
  const htmlString = ReactDOMServer.renderToString(<Hello x={data.x} y={data.y} />);
  const doc = `
    <html>
      <head>
      </head>
      <body>
        ${htmlString}
        <div id="app-id">hello</div>
        <script>
          document.getElementById('app-id').innerHTML='<p>line one</p><p>line two</p>';
        </script>
      </body>
    </html>
  `;
  const outputFileName = dataFileName.slice(0, -4) + 'pdf'

  try {
    browser = await getBrowserInstance();
    page = await browser.newPage();
    await page.setContent(doc);
    const pdf = await page.pdf();
    await putData({bucket: UPLOAD_BUCKET, key: outputFileName, data: pdf})
  } catch (error) {
    return context.fail(error);
  } finally {
    if (page) {
      page.close();
    }
  }

  return context.succeed(`Uploaded ${outputFileName}`);
};
