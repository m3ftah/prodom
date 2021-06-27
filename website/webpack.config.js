const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = function (env) {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : undefined,
    entry: './src/index.ts',
    devServer: {
      contentBase: './dist',
      disableHostCheck: true,
      // hot: true,
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'Prodom, the next open web app framework',
        favicon: './src/icon-trans.png',
      }),
      new WebpackPwaManifest({
        name: 'Prodom introduction',
        short_name: 'Prodom',
        description: 'A simple introduction into the Prodom framework',
        background_color: '#ffffff',
        fingerprints: false,
        crossorigin: 'anonymous', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/icon-trans.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
        ],
      }),
    ],
    output: {
      publicPath: '',
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          include: path.resolve(__dirname, 'src'),
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          include: path.resolve(__dirname, 'src'),
          type: 'asset/resource',
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
  }
}
