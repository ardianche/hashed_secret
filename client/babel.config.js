module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  devServer: {
    progress: false,  // always show progress (even in production mode)
    stats: {
      modules: false,
    },
  },
  configureWebpack: {
    devServer: {
      progress: false,
      stats: {
        modules: false,
      },
    }
  }
}
