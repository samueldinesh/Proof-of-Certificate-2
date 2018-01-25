const webpack = require("webpack");
const path = require("path");
const www = path.resolve(__dirname, "www");

module.exports = {
  entry: "./src/dapp.js",
  output: {
    filename: "bundle.js",
    path: www
  },
  module: {
    rules: [],
    loaders: [
      {
        test: /\.json$/,
        use: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devServer: {
    contentBase: www
  }
}
