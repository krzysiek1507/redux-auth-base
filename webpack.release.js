var webpack = require("webpack");
var path = require("path");

module.exports = {
  target:  "web",
  cache:   false,
  context: __dirname,
  devtool: false,
  entry:   {
    "index": "./src/index"
  },
  output:  {
    path:          path.join(__dirname, 'dist'),
    filename:      "[name].js",
    libraryTarget: "commonjs"
  },
  externals: [
    function(rtx, req, cb) {
      if (/\.\.\/\.\.\//.test(req)) {
        return cb(null, "commonjs redux-auth");
      } else {
        cb();
      }
    }, {
      "react": "commonjs react",
      "browser-cookies": "commonjs browser-cookies",
      "cookie": "commonjs cookie",
      "extend": "commonjs extend",
      "history": "commonjs history",
      "immutable": "commonjs immutable",
      "isomorphic-fetch": "commonjs isomorphic-fetch",
      "query-string": "commonjs query-string",
      "querystring": "commonjs querystring",
      "react-dom": "commonjs react-dom",
      "react-redux": "commonjs react-redux",
      "redux": "commonjs redux",
      "lodash": "commonjs lodash",
      "redux-immutablejs": "commonjs redux-immutablejs",
      "react-router": "commonjs react-router",
      "react-router-redux": "commonjs react-router-redux",
      "redux-thunk": "commonjs redux-thunk",
      "thunk": "commonjs thunk",
      "url": "commonjs url"
    }
  ],
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: "\"production\""}}),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module:  {
    loaders: [
      {
        include: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0"
      }
    ]
  },
  resolve: {
    alias: {
      react: path.join(__dirname, "node_modules/react")
    },
    modules: [
      "src",
      "node_modules",
      "web_modules"
    ],
    extensions: [".json", ".js"]
  },
  node:    {
    __dirname: true,
    fs:        "empty"
  }
};
