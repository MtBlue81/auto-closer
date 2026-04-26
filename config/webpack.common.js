"use strict";

const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = require("./paths");

const common = {
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  devtool: false,
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: "public",
        },
      ],
    }),
  ],
};

module.exports = common;
