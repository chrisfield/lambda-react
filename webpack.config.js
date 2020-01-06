const handler = {
  entry: {
    handler: './handler.js' 
  },
  output: {
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  resolve: { 
    extensions: ['.js', '.jsx']
  },
  externals: [
    'aws-sdk',
    'chrome-aws-lambda'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

module.exports = [
  handler
];