const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.devServer = ({ host, port }) => ({
  devServer: {
    host,
    port,
    overlay: true,
    hotOnly: true,
    stats: 'errors-only',
    historyApiFallback: true,
  },
});

exports.loadCSS = ({ include, exclude, use }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use,
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash:4].css',
    chunkFilename: '[id].[contenthash:4].css',
  });
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use,
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadSvg = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
    ],
  },
});

exports.loadFonts = ({ options }) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options,
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include,
        exclude,
        use: 'ts-loader',
        // use: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.logger = (a, b) => {
  console.log(`Logger: ${a} -> ${b}`); // eslint-disable-line

  return {};
};
