module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        data: '@import "@/styles/global.scss";',
      },
    },
    extract: false,
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/nextTickTwo/' : '/',
}