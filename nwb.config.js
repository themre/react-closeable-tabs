module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactCloseableTabs',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    extra: {
      entry: {
        index: './src/index.tsx',
        demo: './demo/src/index.tsx',
      },
      output: {
        filename: '[name].js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [{test: /\.tsx$/, loader: 'ts-loader'}],
      },
    },
  },
}