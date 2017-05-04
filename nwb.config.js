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
  }
}
